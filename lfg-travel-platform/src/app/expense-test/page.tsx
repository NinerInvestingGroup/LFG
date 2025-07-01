'use client'

import React, { useState } from 'react'
import { useTrips } from '@/hooks/useTrips'
import { useExpenseManager } from '@/hooks/useExpenses'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calculator,
  TestTube,
  CheckCircle,
  XCircle,
  Info,
  Loader
} from 'lucide-react'

/**
 * EXPENSE TESTING PAGE
 * 
 * This page provides comprehensive testing for the expense tracking system.
 * It allows testing all expense features with real data.
 * 
 * Simple explanation: Like having a testing playground for expense features
 */
export default function ExpenseTestPage() {
  const [selectedTripId, setSelectedTripId] = useState<string>('')
  const { trips, loading: tripsLoading } = useTrips()
  
  const expenseManager = useExpenseManager(selectedTripId)

  const selectedTrip = trips?.find(trip => trip.id === selectedTripId)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const testAddExpense = async (type: 'small' | 'medium' | 'large') => {
    if (!selectedTripId) return

    const testExpenses = {
      small: {
        amount: 25.50,
        description: 'Coffee for the group',
        category: 'food' as const
      },
      medium: {
        amount: 120.00,
        description: 'Taxi to airport',
        category: 'transport' as const
      },
      large: {
        amount: 300.00,
        description: 'Group dinner at restaurant',
        category: 'food' as const
      }
    }

    const expenseData = testExpenses[type]
    await expenseManager.addExpense({
      tripId: selectedTripId,
      ...expenseData
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TestTube className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Expense System Testing</h1>
          </div>
          <p className="text-lg text-gray-600">
            Test the expense tracking and bill splitting functionality with real trip data.
          </p>
        </div>

        {/* Trip Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Select Trip for Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tripsLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Loading trips...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <Select value={selectedTripId} onValueChange={setSelectedTripId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a trip to test expenses" />
                  </SelectTrigger>
                  <SelectContent>
                    {trips?.map((trip) => (
                      <SelectItem key={trip.id} value={trip.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{trip.title}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {trip.current_participants} participants
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedTrip && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Selected Trip</h4>
                    <div className="text-sm text-blue-800">
                      <p><strong>Destination:</strong> {selectedTrip.destination}</p>
                      <p><strong>Participants:</strong> {selectedTrip.current_participants}</p>
                      <p><strong>Status:</strong> {selectedTrip.status}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {selectedTripId ? (
          <Tabs defaultValue="testing" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="testing">Quick Testing</TabsTrigger>
              <TabsTrigger value="expenses">Expense List</TabsTrigger>
              <TabsTrigger value="balances">Balances</TabsTrigger>
              <TabsTrigger value="settlements">Settlements</TabsTrigger>
            </TabsList>

            {/* Quick Testing Tab */}
            <TabsContent value="testing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Quick Expense Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => testAddExpense('small')}
                      className="h-20 flex-col"
                      disabled={expenseManager.addExpenseLoading}
                    >
                      <DollarSign className="h-6 w-6 mb-2" />
                      Add Small Expense
                      <span className="text-xs">$25.50 - Coffee</span>
                    </Button>

                    <Button
                      onClick={() => testAddExpense('medium')}
                      className="h-20 flex-col"
                      disabled={expenseManager.addExpenseLoading}
                    >
                      <DollarSign className="h-6 w-6 mb-2" />
                      Add Medium Expense
                      <span className="text-xs">$120.00 - Taxi</span>
                    </Button>

                    <Button
                      onClick={() => testAddExpense('large')}
                      className="h-20 flex-col"
                      disabled={expenseManager.addExpenseLoading}
                    >
                      <DollarSign className="h-6 w-6 mb-2" />
                      Add Large Expense
                      <span className="text-xs">$300.00 - Dinner</span>
                    </Button>
                  </div>

                  {expenseManager.addExpenseLoading && (
                    <div className="mt-4 flex items-center gap-2 text-blue-600">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Adding expense...</span>
                    </div>
                  )}

                  {expenseManager.addExpenseError && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-red-800">
                        <XCircle className="h-4 w-4" />
                        <span className="font-medium">Error:</span>
                      </div>
                      <p className="text-red-700 mt-1">{expenseManager.addExpenseError}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* System Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {expenseManager.expenses?.length || 0}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(expenseManager.totalSpent)}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Settlement Status</p>
                        <p className="text-lg font-bold text-gray-900">
                          {expenseManager.isSettled ? 'All Settled' : 'Needs Settlement'}
                        </p>
                      </div>
                      {expenseManager.isSettled ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : (
                        <TrendingDown className="h-8 w-8 text-orange-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Expense List Tab */}
            <TabsContent value="expenses" className="space-y-4">
              {expenseManager.loading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Loader className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Loading expenses...</p>
                  </CardContent>
                </Card>
              ) : expenseManager.expenses?.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
                    <p className="text-gray-600">Use the Quick Testing tab to add test expenses.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {expenseManager.expenses?.map((expense) => (
                    <Card key={expense.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-medium">{expense.description}</h3>
                              <Badge className={expenseManager.getCategoryColor(expense.category)}>
                                {expenseManager.getCategoryIcon(expense.category)} {expenseManager.getCategoryLabel(expense.category)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              Paid by {expense.payer.full_name || expense.payer.email} • 
                              Split between {expense.splits.length} people
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">{formatCurrency(expense.amount)}</p>
                            <p className="text-sm text-gray-600">
                              {formatCurrency(expense.amount / expense.splits.length)} per person
                            </p>
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
              {expenseManager.balances?.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No balances to show</h3>
                    <p className="text-gray-600">Add some expenses to see balance calculations.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expenseManager.balances?.map((balance) => (
                    <Card key={balance.participantId}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{balance.participantName}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p>Paid: {formatCurrency(balance.totalPaid)}</p>
                              <p>Owes: {formatCurrency(balance.totalOwed)}</p>
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
              {expenseManager.settlements?.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {expenseManager.isSettled ? 'All settled up!' : 'No settlements needed'}
                    </h3>
                    <p className="text-gray-600">
                      {expenseManager.isSettled 
                        ? 'Everyone is even on expenses.' 
                        : 'Add some expenses to see settlement suggestions.'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Info className="h-5 w-5" />
                        <p className="font-medium">
                          To settle all balances, complete these {expenseManager.settlements?.length} payment(s):
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {expenseManager.settlements?.map((settlement, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {settlement.fromParticipantName} → {settlement.toParticipantName}
                            </p>
                            <p className="text-sm text-gray-600">Settlement payment</p>
                          </div>
                          <p className="text-xl font-bold text-green-600">
                            {formatCurrency(settlement.amount)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Trip</h3>
              <p className="text-gray-600">
                Choose a trip from the dropdown above to start testing expense features.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Testing Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Testing Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">What This Tests</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Expense creation and validation</li>
                  <li>• Automatic bill splitting calculations</li>
                  <li>• Balance tracking for participants</li>
                  <li>• Settlement algorithm accuracy</li>
                  <li>• Real-time data synchronization</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Testing Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Quick test expense buttons</li>
                  <li>• Real-time balance calculations</li>
                  <li>• Settlement algorithm verification</li>
                  <li>• Error handling and validation</li>
                  <li>• Loading state management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS PAGE DOES:
 * 
 * ExpenseTestPage is like having a complete testing environment for expense features:
 * 
 * 1. TRIP SELECTION - Choose any trip to test expenses with real data
 * 2. QUICK TESTING - One-click buttons to add test expenses
 * 3. EXPENSE MONITORING - See all expenses with details and categories
 * 4. BALANCE TRACKING - Watch how balances calculate automatically
 * 5. SETTLEMENT TESTING - See how the algorithm suggests payments
 * 
 * Testing Features:
 * - Add small, medium, and large test expenses instantly
 * - Real-time balance calculations
 * - Settlement algorithm verification
 * - Error handling and loading states
 * - Complete expense system validation
 * 
 * Bill Splitting Testing:
 * - Verify equal splitting works correctly
 * - Check balance calculations are accurate
 * - Ensure settlements are optimal
 * - Test with different participant counts
 * - Validate all edge cases
 * 
 * It's like having a complete quality assurance system for expense features!
 */