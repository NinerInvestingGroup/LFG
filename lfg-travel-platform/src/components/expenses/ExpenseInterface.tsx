'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { 
  Plus, 
  Trash2, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar,
  ArrowRight,
  Info
} from 'lucide-react'
import { useExpenseManager } from '@/hooks/useExpenses'
import { AddExpenseModal } from './AddExpenseModal'
import { format } from 'date-fns'

interface ExpenseInterfaceProps {
  tripId: string
  className?: string
}

/**
 * EXPENSE INTERFACE COMPONENT
 * 
 * This is the main expense tracking interface that shows:
 * - Expense list with details
 * - Balance tracking for participants
 * - Settlement suggestions
 * - Add expense functionality
 * 
 * Simple explanation: Like having a complete expense management app for your trip
 */
export function ExpenseInterface({ tripId, className = '' }: ExpenseInterfaceProps) {
  const [showAddExpense, setShowAddExpense] = useState(false)
  const {
    expenses,
    balances,
    settlements,
    loading,
    hasData,
    totalSpent,
    averageSpent,
    isSettled,
    addExpense,
    deleteExpense,
    getCategoryColor,
    getCategoryIcon,
    getCategoryLabel,
    addExpenseLoading,
    addExpenseError,
    clearAddExpenseError
  } = useExpenseManager(tripId)

  const handleAddExpense = async (expenseData: any) => {
    const result = await addExpense({
      tripId,
      ...expenseData
    })
    
    if (result.success) {
      setShowAddExpense(false)
      clearAddExpenseError()
    }
    
    return result
  }

  const handleDeleteExpense = async (expenseId: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(expenseId)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Trip Expenses</h2>
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
        
        <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Trip Expenses</h2>
        <Button 
          onClick={() => setShowAddExpense(true)}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average per Person</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageSpent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              {isSettled ? (
                <TrendingUp className="h-8 w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-orange-600" />
              )}
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-lg font-bold text-gray-900">
                  {isSettled ? 'All Settled' : 'Needs Settlement'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="expenses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
        </TabsList>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          {!hasData ? (
            <Card>
              <CardContent className="p-8 text-center">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
                <p className="text-gray-600 mb-4">
                  Start tracking group expenses by adding your first expense.
                </p>
                <Button 
                  onClick={() => setShowAddExpense(true)}
                  className="bg-primary hover:bg-primary-dark text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Expense
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <Card key={expense.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={expense.payer.avatar_url || undefined} />
                          <AvatarFallback>
                            {getInitials(expense.payer.full_name || expense.payer.email)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              {expense.description}
                            </h3>
                            <Badge 
                              variant="secondary" 
                              className={getCategoryColor(expense.category)}
                            >
                              {getCategoryIcon(expense.category)} {getCategoryLabel(expense.category)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Paid by {expense.payer.full_name || expense.payer.email}</span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {format(new Date(expense.expense_date), 'MMM d, yyyy')}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              Split between {expense.splits.length} people
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(expense.amount)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(expense.amount / expense.splits.length)} per person
                          </p>
                        </div>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Balances Tab */}
        <TabsContent value="balances" className="space-y-4">
          {balances.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No balances to show</h3>
                <p className="text-gray-600">
                  Balances will appear here once expenses are added.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {balances.map((balance) => (
                <Card key={balance.participantId}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={balance.participantAvatar || undefined} />
                          <AvatarFallback>
                            {getInitials(balance.participantName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-gray-900">{balance.participantName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Paid: {formatCurrency(balance.totalPaid)}</span>
                            <span>Owes: {formatCurrency(balance.totalOwed)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          balance.netBalance > 0 
                            ? 'text-green-600' 
                            : balance.netBalance < 0 
                            ? 'text-red-600' 
                            : 'text-gray-600'
                        }`}>
                          {balance.netBalance > 0 && '+'}
                          {formatCurrency(balance.netBalance)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {balance.netBalance > 0 
                            ? 'Owed money' 
                            : balance.netBalance < 0 
                            ? 'Owes money' 
                            : 'Even'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Settlements Tab */}
        <TabsContent value="settlements" className="space-y-4">
          {settlements.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isSettled ? 'All settled up!' : 'No settlements needed'}
                </h3>
                <p className="text-gray-600">
                  {isSettled 
                    ? 'Everyone is even on expenses.' 
                    : 'Settlement suggestions will appear here when there are balances to resolve.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Info className="h-5 w-5" />
                    <p className="text-sm font-medium">
                      To settle all balances, complete these {settlements.length} payment(s):
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {settlements.map((settlement, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            {getInitials(settlement.fromParticipantName)}
                          </AvatarFallback>
                        </Avatar>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                        <Avatar>
                          <AvatarFallback>
                            {getInitials(settlement.toParticipantName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {settlement.fromParticipantName} pays {settlement.toParticipantName}
                          </p>
                          <p className="text-sm text-gray-600">Settlement payment</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">
                          {formatCurrency(settlement.amount)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onSubmit={handleAddExpense}
        loading={addExpenseLoading}
        error={addExpenseError}
      />
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS COMPONENT DOES:
 * 
 * ExpenseInterface is like having a complete expense tracking app for your trip:
 * 
 * 1. EXPENSE LIST - Shows all group expenses with:
 *    - Who paid and how much
 *    - What category (food, transport, etc.)
 *    - When it happened
 *    - How much each person owes
 * 
 * 2. BALANCE TRACKING - Shows each person's financial status:
 *    - How much they've paid for the group
 *    - How much they owe to others
 *    - Their net balance (ahead or behind)
 * 
 * 3. SETTLEMENT SUGGESTIONS - Smart calculator that shows:
 *    - Minimum payments needed to settle all balances
 *    - Who should pay whom
 *    - Total amount that needs to be settled
 * 
 * 4. ADD EXPENSE - Easy form to add new expenses with:
 *    - Amount and description
 *    - Category selection
 *    - Automatic bill splitting
 * 
 * Key Features:
 * - Real-time balance calculations
 * - Smart settlement algorithms
 * - Beautiful, mobile-friendly interface
 * - Automatic expense splitting
 * - Easy expense management
 * 
 * It's like having Splitwise built into your travel platform!
 */
