import { createClient } from '@/lib/supabase'
import { Tables, TablesInsert } from '@/shared/types/database'

// Type aliases for easier use
export type Expense = Tables<'expenses'>
export type ExpenseInsert = TablesInsert<'expenses'>
export type ExpenseSplit = Tables<'expense_splits'>
export type ExpenseSplitInsert = TablesInsert<'expense_splits'>

// Enhanced expense type with participant and split information
export interface ExpenseWithDetails extends Expense {
  payer: {
    id: string
    full_name: string | null
    avatar_url: string | null
    email: string
  }
  splits: (ExpenseSplit & {
    participant: {
      id: string
      full_name: string | null
      avatar_url: string | null
      email: string
    }
  })[]
}

// Expense creation data
export interface CreateExpenseData {
  tripId: string
  amount: number
  description: string
  category: 'food' | 'transport' | 'accommodation' | 'activities' | 'shopping' | 'other'
  expenseDate?: string
  splitBetween?: string[] // Participant IDs to split between (empty = all participants)
}

// Balance information for each participant
export interface ParticipantBalance {
  participantId: string
  participantName: string
  participantAvatar: string | null
  totalPaid: number      // How much they've paid for the group
  totalOwed: number      // How much they owe to others
  netBalance: number     // Positive = owed money, Negative = owes money
}

// Settlement suggestion
export interface Settlement {
  fromParticipantId: string
  fromParticipantName: string
  toParticipantId: string
  toParticipantName: string
  amount: number
}

/**
 * EXPENSE TRACKING & BILL SPLITTING SERVICE
 * 
 * This service handles all expense-related operations:
 * - Creating and managing trip expenses
 * - Automatically splitting bills between participants
 * - Calculating balances and settlements
 * - Tracking who paid what and who owes what
 */

export const expenseService = {
  /**
   * CREATE EXPENSE WITH AUTOMATIC BILL SPLITTING
   * 
   * This function creates an expense and automatically splits it between participants.
   * 
   * Simple explanation: Like when someone pays for dinner and the bill
   * gets divided equally among everyone who ate.
   */
  async createExpense(expenseData: CreateExpenseData): Promise<{ error: string | null; data?: Expense }> {
    try {
      const supabase = createClient()

      // Make sure user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to add expenses' }
      }

      // Check if user is a trip participant
      const { data: participant } = await supabase
        .from('trip_participants')
        .select('id, status')
        .eq('trip_id', expenseData.tripId)
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .single()

      if (!participant) {
        return { error: 'Only trip participants can add expenses' }
      }

      // Get all trip participants for splitting
      const { data: allParticipants, error: participantsError } = await supabase
        .from('trip_participants')
        .select('user_id, id')
        .eq('trip_id', expenseData.tripId)
        .eq('status', 'approved')

      if (participantsError || !allParticipants) {
        return { error: 'Error loading trip participants' }
      }

      // Determine who to split between
      let splitParticipants = allParticipants
      if (expenseData.splitBetween && expenseData.splitBetween.length > 0) {
        splitParticipants = allParticipants.filter(p => 
          expenseData.splitBetween!.includes(p.user_id)
        )
      }

      if (splitParticipants.length === 0) {
        return { error: 'No participants found for splitting' }
      }

      // Calculate amount per person (equal split)
      const amountPerPerson = Math.round((expenseData.amount / splitParticipants.length) * 100) / 100

      // Create the expense
      const { data: expense, error: expenseError } = await supabase
        .from('expenses')
        .insert({
          trip_id: expenseData.tripId,
          payer_id: user.id,
          amount: expenseData.amount,
          description: expenseData.description,
          category: expenseData.category,
          expense_date: expenseData.expenseDate || new Date().toISOString(),
          split_type: 'equal',
          split_details: {
            participants: splitParticipants.map(p => p.user_id),
            amountPerPerson
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (expenseError) {
        console.error('Error creating expense:', expenseError)
        return { error: expenseError.message }
      }

      // Create expense splits for each participant
      const splits = splitParticipants.map(participant => ({
        expense_id: expense.id,
        participant_id: participant.user_id,
        amount_owed: amountPerPerson,
        paid: participant.user_id === user.id, // Payer already paid their share
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

      const { error: splitsError } = await supabase
        .from('expense_splits')
        .insert(splits)

      if (splitsError) {
        console.error('Error creating expense splits:', splitsError)
        // Try to clean up the expense if splits failed
        await supabase.from('expenses').delete().eq('id', expense.id)
        return { error: 'Error creating expense splits' }
      }

      return { error: null, data: expense }
    } catch (error) {
      console.error('Unexpected error creating expense:', error)
      return { error: 'Failed to create expense. Please try again.' }
    }
  },

  /**
   * GET TRIP EXPENSES WITH DETAILS
   * 
   * This function loads all expenses for a trip with participant and split information.
   */
  async getTripExpenses(tripId: string): Promise<{ 
    data: ExpenseWithDetails[] | null
    error: string | null 
  }> {
    try {
      const supabase = createClient()

      // Make sure user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: 'You must be logged in to view expenses' }
      }

      // Check if user is a trip participant
      const { data: participant } = await supabase
        .from('trip_participants')
        .select('id, status')
        .eq('trip_id', tripId)
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .single()

      if (!participant) {
        return { data: null, error: 'Only trip participants can view expenses' }
      }

      // Get all expenses for this trip with payer information
      const { data: expenses, error } = await supabase
        .from('expenses')
        .select(`
          *,
          payer:profiles!expenses_payer_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('trip_id', tripId)
        .order('expense_date', { ascending: false })

      if (error) {
        console.error('Error fetching expenses:', error)
        return { data: null, error: error.message }
      }

      // Get splits for all expenses
      const expenseIds = expenses?.map(e => e.id) || []
      if (expenseIds.length === 0) {
        return { data: [], error: null }
      }

      const { data: splits, error: splitsError } = await supabase
        .from('expense_splits')
        .select(`
          *,
          participant:profiles!expense_splits_participant_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .in('expense_id', expenseIds)

      if (splitsError) {
        console.error('Error fetching expense splits:', splitsError)
        return { data: null, error: splitsError.message }
      }

      // Combine expenses with their splits
      const expensesWithDetails: ExpenseWithDetails[] = expenses?.map(expense => ({
        ...expense,
        splits: splits?.filter(split => split.expense_id === expense.id) || []
      })) || []

      return { data: expensesWithDetails, error: null }
    } catch (error) {
      console.error('Unexpected error fetching expenses:', error)
      return { data: null, error: 'Failed to load expenses. Please try again.' }
    }
  },

  /**
   * CALCULATE PARTICIPANT BALANCES
   * 
   * This function calculates how much each participant has paid vs owes.
   * 
   * Simple explanation: Like keeping track of who's ahead or behind
   * in paying for group expenses.
   */
  async calculateBalances(tripId: string): Promise<{ 
    data: ParticipantBalance[] | null
    error: string | null 
  }> {
    try {
      const supabase = createClient()

      // Get all trip participants
      const { data: participants, error: participantsError } = await supabase
        .from('trip_participants')
        .select(`
          user_id,
          profiles!trip_participants_user_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('trip_id', tripId)
        .eq('status', 'approved')

      if (participantsError || !participants) {
        return { data: null, error: 'Error loading participants' }
      }

      // Get all expenses for this trip
      const { data: expenses, error: expensesError } = await supabase
        .from('expenses')
        .select('id, payer_id, amount')
        .eq('trip_id', tripId)

      if (expensesError) {
        return { data: null, error: expensesError.message }
      }

      // Get all expense splits for this trip
      const expenseIds = expenses?.map(e => e.id) || []
      const { data: splits, error: splitsError } = await supabase
        .from('expense_splits')
        .select('participant_id, amount_owed')
        .in('expense_id', expenseIds)

      if (splitsError) {
        return { data: null, error: splitsError.message }
      }

      // Calculate balances for each participant
      const balances: ParticipantBalance[] = participants.map(participant => {
        const userId = participant.user_id
        const profile = participant.profiles

        // Calculate total paid (sum of expenses they paid for)
        const totalPaid = expenses
          ?.filter(expense => expense.payer_id === userId)
          .reduce((sum, expense) => sum + expense.amount, 0) || 0

        // Calculate total owed (sum of their shares in all expenses)
        const totalOwed = splits
          ?.filter(split => split.participant_id === userId)
          .reduce((sum, split) => sum + split.amount_owed, 0) || 0

        // Net balance: positive means they're owed money, negative means they owe money
        const netBalance = totalPaid - totalOwed

        return {
          participantId: userId,
          participantName: profile?.full_name || 'Unknown User',
          participantAvatar: profile?.avatar_url || null,
          totalPaid: Math.round(totalPaid * 100) / 100,
          totalOwed: Math.round(totalOwed * 100) / 100,
          netBalance: Math.round(netBalance * 100) / 100,
        }
      })

      return { data: balances, error: null }
    } catch (error) {
      console.error('Unexpected error calculating balances:', error)
      return { data: null, error: 'Failed to calculate balances. Please try again.' }
    }
  },

  /**
   * GENERATE SETTLEMENT SUGGESTIONS
   * 
   * This function suggests who should pay whom to settle all balances.
   * 
   * Simple explanation: Like figuring out the minimum number of payments
   * needed so everyone is even.
   */
  async generateSettlements(tripId: string): Promise<{ 
    data: Settlement[] | null
    error: string | null 
  }> {
    try {
      const { data: balances, error } = await this.calculateBalances(tripId)
      
      if (error || !balances) {
        return { data: null, error: error || 'Error loading balances' }
      }

      // Separate creditors (people owed money) and debtors (people who owe money)
      const creditors = balances.filter(b => b.netBalance > 0).sort((a, b) => b.netBalance - a.netBalance)
      const debtors = balances.filter(b => b.netBalance < 0).sort((a, b) => a.netBalance - b.netBalance)

      const settlements: Settlement[] = []

      // Create copies to modify
      const creditorsRemaining = creditors.map(c => ({ ...c }))
      const debtorsRemaining = debtors.map(d => ({ ...d }))

      // Match debtors with creditors
      while (creditorsRemaining.length > 0 && debtorsRemaining.length > 0) {
        const creditor = creditorsRemaining[0]
        const debtor = debtorsRemaining[0]

        // Calculate settlement amount (minimum of what creditor is owed and debtor owes)
        const settlementAmount = Math.min(creditor.netBalance, Math.abs(debtor.netBalance))

        if (settlementAmount > 0.01) { // Only create settlement if meaningful amount
          settlements.push({
            fromParticipantId: debtor.participantId,
            fromParticipantName: debtor.participantName,
            toParticipantId: creditor.participantId,
            toParticipantName: creditor.participantName,
            amount: Math.round(settlementAmount * 100) / 100,
          })

          // Update remaining balances
          creditor.netBalance -= settlementAmount
          debtor.netBalance += settlementAmount
        }

        // Remove settled participants
        if (Math.abs(creditor.netBalance) < 0.01) {
          creditorsRemaining.shift()
        }
        if (Math.abs(debtor.netBalance) < 0.01) {
          debtorsRemaining.shift()
        }
      }

      return { data: settlements, error: null }
    } catch (error) {
      console.error('Unexpected error generating settlements:', error)
      return { data: null, error: 'Failed to generate settlements. Please try again.' }
    }
  },

  /**
   * DELETE EXPENSE
   * 
   * This function deletes an expense and its splits (only payer can delete).
   */
  async deleteExpense(expenseId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to delete expenses' }
      }

      // Check if user is the payer
      const { data: expense } = await supabase
        .from('expenses')
        .select('payer_id')
        .eq('id', expenseId)
        .single()

      if (!expense || expense.payer_id !== user.id) {
        return { error: 'You can only delete expenses you created' }
      }

      // Delete expense splits first (due to foreign key constraints)
      const { error: splitsError } = await supabase
        .from('expense_splits')
        .delete()
        .eq('expense_id', expenseId)

      if (splitsError) {
        console.error('Error deleting expense splits:', splitsError)
        return { error: splitsError.message }
      }

      // Delete the expense
      const { error: expenseError } = await supabase
        .from('expenses')
        .delete()
        .eq('id', expenseId)

      if (expenseError) {
        console.error('Error deleting expense:', expenseError)
        return { error: expenseError.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error deleting expense:', error)
      return { error: 'Failed to delete expense. Please try again.' }
    }
  },

  /**
   * GET EXPENSE CATEGORIES
   * 
   * This function returns available expense categories.
   */
  getExpenseCategories(): Array<{
    id: string
    label: string
    icon: string
    color: string
  }> {
    return [
      { id: 'food', label: 'Food & Dining', icon: '🍽️', color: 'bg-orange-100 text-orange-800' },
      { id: 'transport', label: 'Transportation', icon: '🚗', color: 'bg-blue-100 text-blue-800' },
      { id: 'accommodation', label: 'Accommodation', icon: '🏨', color: 'bg-purple-100 text-purple-800' },
      { id: 'activities', label: 'Activities', icon: '🎯', color: 'bg-green-100 text-green-800' },
      { id: 'shopping', label: 'Shopping', icon: '🛍️', color: 'bg-pink-100 text-pink-800' },
      { id: 'other', label: 'Other', icon: '💰', color: 'bg-gray-100 text-gray-800' },
    ]
  }
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS SERVICE DOES:
 * 
 * expenseService.createExpense() - "Add an expense and split the bill"
 * - Creates expense record in database
 * - Automatically calculates each person's share (equal split)
 * - Creates split records for each participant
 * - Marks payer as already paid their share
 * 
 * expenseService.getTripExpenses() - "Get all expenses for a trip"
 * - Loads expenses with payer and participant information
 * - Shows who paid and how much each person owes
 * - Only participants can view expenses
 * 
 * expenseService.calculateBalances() - "Figure out who owes what"
 * - Calculates total paid by each person
 * - Calculates total owed by each person
 * - Shows net balance (positive = owed money, negative = owes money)
 * 
 * expenseService.generateSettlements() - "Suggest payments to settle up"
 * - Matches people who owe money with people owed money
 * - Suggests minimum payments needed to settle all balances
 * - Like an automated "split the bill" calculator
 * 
 * Bill Splitting Logic:
 * 1. Someone pays for group expense (dinner, taxi, etc.)
 * 2. Total cost gets divided equally among participants
 * 3. System tracks each person's share of the expense
 * 4. Payer gets credited for paying, others get debited for owing
 * 5. Balances show who's ahead/behind in payments
 * 6. Settlements suggest how to even everything out
 */
