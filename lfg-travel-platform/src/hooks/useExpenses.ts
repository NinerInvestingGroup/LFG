import { useState, useEffect, useCallback } from 'react'
import { 
  expenseService, 
  ExpenseWithDetails, 
  CreateExpenseData, 
  ParticipantBalance, 
  Settlement 
} from '@/services/expenseService'

/**
 * EXPENSE MANAGEMENT HOOKS
 * 
 * These hooks provide easy-to-use React state management for expense features.
 * Each hook handles loading, error states, and optimistic updates automatically.
 */

/**
 * HOOK: useTripExpenses
 * 
 * Loads and manages expense list for a trip
 * Simple explanation: Like having a shared expense report that updates automatically
 */
export function useTripExpenses(tripId: string) {
  const [expenses, setExpenses] = useState<ExpenseWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadExpenses = useCallback(async () => {
    if (!tripId) return

    setLoading(true)
    setError(null)

    const { data, error: expenseError } = await expenseService.getTripExpenses(tripId)
    
    if (expenseError) {
      setError(expenseError)
      setExpenses([])
    } else {
      setExpenses(data || [])
    }
    
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    loadExpenses()
  }, [loadExpenses])

  return {
    expenses,
    loading,
    error,
    refetch: loadExpenses,
    isEmpty: !loading && expenses.length === 0
  }
}

/**
 * HOOK: useAddExpense
 * 
 * Provides function to add new expenses with loading states
 * Simple explanation: Like having a "Add to Bill" button that handles everything
 */
export function useAddExpense() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addExpense = useCallback(async (expenseData: CreateExpenseData) => {
    setLoading(true)
    setError(null)

    const result = await expenseService.createExpense(expenseData)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return { success: false, error: result.error }
    }

    setLoading(false)
    return { success: true, data: result.data }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    addExpense,
    loading,
    error,
    clearError
  }
}

/**
 * HOOK: useTripBalances
 * 
 * Calculates and tracks balances for trip participants
 * Simple explanation: Like a scoreboard showing who's ahead or behind in payments
 */
export function useTripBalances(tripId: string) {
  const [balances, setBalances] = useState<ParticipantBalance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBalances = useCallback(async () => {
    if (!tripId) return

    setLoading(true)
    setError(null)

    const { data, error: balanceError } = await expenseService.calculateBalances(tripId)
    
    if (balanceError) {
      setError(balanceError)
      setBalances([])
    } else {
      setBalances(data || [])
    }
    
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    loadBalances()
  }, [loadBalances])

  // Calculate totals
  const totalSpent = balances.reduce((sum, balance) => sum + balance.totalPaid, 0)
  const averageSpent = balances.length > 0 ? totalSpent / balances.length : 0

  return {
    balances,
    loading,
    error,
    refetch: loadBalances,
    totalSpent: Math.round(totalSpent * 100) / 100,
    averageSpent: Math.round(averageSpent * 100) / 100,
    isEmpty: !loading && balances.length === 0
  }
}

/**
 * HOOK: useSettlements
 * 
 * Generates settlement suggestions for evening out balances
 * Simple explanation: Like having a smart calculator suggest who should pay whom
 */
export function useSettlements(tripId: string) {
  const [settlements, setSettlements] = useState<Settlement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadSettlements = useCallback(async () => {
    if (!tripId) return

    setLoading(true)
    setError(null)

    const { data, error: settlementError } = await expenseService.generateSettlements(tripId)
    
    if (settlementError) {
      setError(settlementError)
      setSettlements([])
    } else {
      setSettlements(data || [])
    }
    
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    loadSettlements()
  }, [loadSettlements])

  const totalSettlementAmount = settlements.reduce((sum, settlement) => sum + settlement.amount, 0)

  return {
    settlements,
    loading,
    error,
    refetch: loadSettlements,
    totalSettlementAmount: Math.round(totalSettlementAmount * 100) / 100,
    isSettled: !loading && settlements.length === 0,
    isEmpty: !loading && settlements.length === 0
  }
}

/**
 * HOOK: useExpenseActions
 * 
 * Provides actions for managing expenses (delete, etc.)
 * Simple explanation: Like having expense management tools
 */
export function useExpenseActions() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteExpense = useCallback(async (expenseId: string) => {
    setLoading(true)
    setError(null)

    const result = await expenseService.deleteExpense(expenseId)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return { success: false, error: result.error }
    }

    setLoading(false)
    return { success: true }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    deleteExpense,
    loading,
    error,
    clearError
  }
}

/**
 * HOOK: useExpenseCategories
 * 
 * Provides expense categories for forms and displays
 * Simple explanation: Like having preset spending categories for organization
 */
export function useExpenseCategories() {
  const categories = expenseService.getExpenseCategories()
  
  const getCategoryById = useCallback((categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)
  }, [categories])

  const getCategoryColor = useCallback((categoryId: string) => {
    return getCategoryById(categoryId)?.color || 'bg-gray-100 text-gray-800'
  }, [getCategoryById])

  const getCategoryIcon = useCallback((categoryId: string) => {
    return getCategoryById(categoryId)?.icon || '💰'
  }, [getCategoryById])

  const getCategoryLabel = useCallback((categoryId: string) => {
    return getCategoryById(categoryId)?.label || 'Other'
  }, [getCategoryById])

  return {
    categories,
    getCategoryById,
    getCategoryColor,
    getCategoryIcon,
    getCategoryLabel
  }
}

/**
 * HOOK: useExpenseValidation
 * 
 * Provides validation functions for expense forms
 * Simple explanation: Like having form validation that catches mistakes
 */
export function useExpenseValidation() {
  const validateExpenseData = useCallback((data: Partial<CreateExpenseData>) => {
    const errors: Record<string, string> = {}

    if (!data.description || data.description.trim().length === 0) {
      errors.description = 'Description is required'
    } else if (data.description.trim().length > 100) {
      errors.description = 'Description must be less than 100 characters'
    }

    if (!data.amount || data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0'
    } else if (data.amount > 10000) {
      errors.amount = 'Amount must be less than $10,000'
    }

    if (!data.category) {
      errors.category = 'Category is required'
    }

    if (!data.tripId) {
      errors.tripId = 'Trip ID is required'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }, [])

  return {
    validateExpenseData
  }
}

/**
 * COMBINED HOOK: useExpenseManager
 * 
 * Combines all expense functionality for a trip
 * Simple explanation: Like having a complete expense management dashboard
 */
export function useExpenseManager(tripId: string) {
  const expenses = useTripExpenses(tripId)
  const balances = useTripBalances(tripId)
  const settlements = useSettlements(tripId)
  const addExpense = useAddExpense()
  const actions = useExpenseActions()
  const categories = useExpenseCategories()
  const validation = useExpenseValidation()

  // Refresh all data after changes
  const refreshAll = useCallback(async () => {
    await Promise.all([
      expenses.refetch(),
      balances.refetch(),
      settlements.refetch()
    ])
  }, [expenses.refetch, balances.refetch, settlements.refetch])

  // Add expense with auto-refresh
  const addExpenseWithRefresh = useCallback(async (expenseData: CreateExpenseData) => {
    const result = await addExpense.addExpense(expenseData)
    if (result.success) {
      await refreshAll()
    }
    return result
  }, [addExpense.addExpense, refreshAll])

  // Delete expense with auto-refresh
  const deleteExpenseWithRefresh = useCallback(async (expenseId: string) => {
    const result = await actions.deleteExpense(expenseId)
    if (result.success) {
      await refreshAll()
    }
    return result
  }, [actions.deleteExpense, refreshAll])

  const loading = expenses.loading || balances.loading || settlements.loading
  const hasData = expenses.expenses.length > 0

  return {
    // Data
    expenses: expenses.expenses,
    balances: balances.balances,
    settlements: settlements.settlements,
    
    // States
    loading,
    hasData,
    
    // Totals
    totalSpent: balances.totalSpent,
    averageSpent: balances.averageSpent,
    totalSettlementAmount: settlements.totalSettlementAmount,
    isSettled: settlements.isSettled,
    
    // Actions
    addExpense: addExpenseWithRefresh,
    deleteExpense: deleteExpenseWithRefresh,
    refreshAll,
    
    // Utilities
    categories: categories.categories,
    getCategoryColor: categories.getCategoryColor,
    getCategoryIcon: categories.getCategoryIcon,
    getCategoryLabel: categories.getCategoryLabel,
    validateExpenseData: validation.validateExpenseData,
    
    // Individual hook states
    addExpenseLoading: addExpense.loading,
    addExpenseError: addExpense.error,
    clearAddExpenseError: addExpense.clearError,
    
    actionLoading: actions.loading,
    actionError: actions.error,
    clearActionError: actions.clearError,
  }
}

/**
 * SIMPLE EXPLANATION OF WHAT THESE HOOKS DO:
 * 
 * useTripExpenses() - "Show me all expenses for this trip"
 * - Loads expense list with automatic loading and error states
 * - Shows who paid what and when
 * - Automatically refreshes when needed
 * 
 * useAddExpense() - "Let me add a new expense"
 * - Provides function to create expenses with validation
 * - Handles loading states during creation
 * - Shows success/error feedback
 * 
 * useTripBalances() - "Show me who owes what"
 * - Calculates each person's balance (paid vs owed)
 * - Shows totals and averages for the group
 * - Updates automatically when expenses change
 * 
 * useSettlements() - "Tell me how to settle up"
 * - Suggests minimum payments to balance everything
 * - Shows if group is already settled
 * - Smart algorithm for efficient settlements
 * 
 * useExpenseManager() - "Give me everything for expense management"
 * - Combines all hooks into one complete system
 * - Handles auto-refresh after changes
 * - Provides all tools needed for expense tracking
 * 
 * These hooks make it super easy to use expenses in React components:
 * - No need to manage loading states manually
 * - Automatic error handling
 * - Data stays in sync across components
 * - Clean, predictable API for all expense operations
 */