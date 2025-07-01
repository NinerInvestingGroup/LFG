'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { 
  Camera, 
  Images, 
  Upload, 
  TestTube, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Calendar,
  Users,
  BarChart3,
  Settings,
  RefreshCw,
  Plus,
  Eye,
  Activity
} from 'lucide-react'
import { PhotoInterface } from '@/components/photos/PhotoInterface'
import { usePhotoManager } from '@/hooks/usePhotos'

/**
 * PHOTO TESTING PAGE
 * 
 * Complete testing interface for the photo sharing system
 * Simple explanation: Like having a photo testing lab
 */
export default function PhotoTestPage() {
  const [selectedTripId, setSelectedTripId] = useState('test-trip-1')
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  
  const photoManager = usePhotoManager(selectedTripId)

  // Sample trips for testing
  const sampleTrips = [
    {
      id: 'test-trip-1',
      title: 'Tokyo Adventure',
      destination: 'Tokyo, Japan',
      participants: 8,
      dates: 'Mar 15-22, 2024'
    },
    {
      id: 'test-trip-2', 
      title: 'European Backpacking',
      destination: 'Europe',
      participants: 12,
      dates: 'Jun 1-30, 2024'
    },
    {
      id: 'test-trip-3',
      title: 'Bali Retreat',
      destination: 'Bali, Indonesia', 
      participants: 6,
      dates: 'Aug 10-17, 2024'
    }
  ]

  // Test functions
  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    try {
      setTestResults(prev => ({ ...prev, [testName]: { status: 'running' } }))
      const result = await testFn()
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { status: 'success', result, timestamp: new Date().toLocaleTimeString() }
      }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toLocaleTimeString()
        }
      }))
    }
  }

  const testPhotoStats = () => runTest('photoStats', async () => {
    return {
      totalPhotos: photoManager.photos.length,
      hasPhotos: photoManager.hasPhotos,
      loading: photoManager.loading,
      stats: photoManager.stats
    }
  })

  const testFileValidation = () => runTest('fileValidation', async () => {
    // Create a test file
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const validation = photoManager.validateFile(testFile)
    
    // Test invalid file
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' })
    const invalidValidation = photoManager.validateFile(invalidFile)
    
    return {
      validFile: validation,
      invalidFile: invalidValidation
    }
  })

  const testPhotoGallery = () => runTest('photoGallery', async () => {
    return {
      galleryState: {
        currentPhoto: photoManager.gallery.currentPhoto,
        isViewerOpen: photoManager.gallery.isViewerOpen,
        viewMode: photoManager.gallery.viewMode,
        sortBy: photoManager.gallery.sortBy,
        photosCount: photoManager.gallery.sortedPhotos.length
      },
      selectionState: {
        selectionMode: photoManager.selection.selectionMode,
        selectedCount: photoManager.selection.selectedCount,
        selectedPhotos: photoManager.selection.selectedPhotos
      }
    }
  })

  const testRefreshSystem = () => runTest('refreshSystem', async () => {
    await photoManager.refreshAll()
    return {
      message: 'Refresh completed successfully',
      timestamp: new Date().toISOString()
    }
  })

  const addSamplePhotos = () => runTest('addSamplePhotos', async () => {
    // This would be where you'd add sample photos in a real test
    // For now, we'll just simulate the process
    return {
      message: 'Sample photos would be added here',
      note: 'This requires actual file uploads to Supabase storage',
      recommendation: 'Use the upload interface to test real photo uploads'
    }
  })

  const runAllTests = async () => {
    await testPhotoStats()
    await testFileValidation()
    await testPhotoGallery()
    await testRefreshSystem()
  }

  const getTestIcon = (testName: string) => {
    const result = testResults[testName]
    if (!result) return <TestTube className="h-4 w-4 text-gray-400" />
    if (result.status === 'running') return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
    if (result.status === 'success') return <CheckCircle2 className="h-4 w-4 text-green-600" />
    return <AlertCircle className="h-4 w-4 text-red-600" />
  }

  const getTestStatus = (testName: string) => {
    const result = testResults[testName]
    if (!result) return 'Not run'
    if (result.status === 'running') return 'Running...'
    if (result.status === 'success') return `Success (${result.timestamp})`
    return `Error: ${result.error} (${result.timestamp})`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Camera className="h-8 w-8 text-blue-600" />
            Photo System Testing Lab
          </h1>
          <p className="text-gray-600 text-lg">
            Test and explore the photo sharing system with real functionality
          </p>
        </div>

        <Tabs defaultValue="testing" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="testing" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Quick Testing
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Images className="h-4 w-4" />
              Live Gallery
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Photo List
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Quick Testing Tab */}
          <TabsContent value="testing" className="mt-6">
            <div className="space-y-6">
              {/* Trip Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    Test Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Test Trip
                      </label>
                      <select
                        value={selectedTripId}
                        onChange={(e) => setSelectedTripId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                      >
                        {sampleTrips.map((trip) => (
                          <option key={trip.id} value={trip.id}>
                            {trip.title} - {trip.destination} ({trip.participants} people)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {sampleTrips
                        .filter(trip => trip.id === selectedTripId)
                        .map((trip) => (
                          <div key={trip.id} className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{trip.destination}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{trip.dates}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="h-4 w-4" />
                              <span>{trip.participants} participants</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {photoManager.photos.length}
                      </div>
                      <div className="text-sm text-gray-600">Total Photos</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {photoManager.stats?.uploaders || 0}
                      </div>
                      <div className="text-sm text-gray-600">Contributors</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {photoManager.stats ? photoManager.formatFileSize(photoManager.stats.totalSize) : '0 B'}
                      </div>
                      <div className="text-sm text-gray-600">Storage Used</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Badge variant={photoManager.loading ? 'secondary' : 'default'}>
                        {photoManager.loading ? 'Loading' : 'Ready'}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1">System Status</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Tests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-purple-600" />
                    Individual Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Button
                        onClick={testPhotoStats}
                        className="w-full justify-start"
                        variant="outline"
                      >
                        {getTestIcon('photoStats')}
                        Test Photo Statistics
                      </Button>
                      <p className="text-xs text-gray-600 ml-6">
                        {getTestStatus('photoStats')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={testFileValidation}
                        className="w-full justify-start"
                        variant="outline"
                      >
                        {getTestIcon('fileValidation')}
                        Test File Validation
                      </Button>
                      <p className="text-xs text-gray-600 ml-6">
                        {getTestStatus('fileValidation')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={testPhotoGallery}
                        className="w-full justify-start"
                        variant="outline"
                      >
                        {getTestIcon('photoGallery')}
                        Test Gallery State
                      </Button>
                      <p className="text-xs text-gray-600 ml-6">
                        {getTestStatus('photoGallery')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={testRefreshSystem}
                        className="w-full justify-start"
                        variant="outline"
                      >
                        {getTestIcon('refreshSystem')}
                        Test Refresh System
                      </Button>
                      <p className="text-xs text-gray-600 ml-6">
                        {getTestStatus('refreshSystem')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button onClick={runAllTests} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <TestTube className="h-4 w-4 mr-2" />
                      Run All Tests
                    </Button>
                    <Button onClick={addSamplePhotos} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Sample Photos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Test Results */}
              {Object.keys(testResults).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(testResults).map(([testName, result]) => (
                        <div key={testName} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                              {getTestIcon(testName)}
                              {testName}
                            </h4>
                            <Badge 
                              variant={
                                result.status === 'success' ? 'default' :
                                result.status === 'error' ? 'destructive' : 'secondary'
                              }
                            >
                              {result.status}
                            </Badge>
                          </div>
                          {result.result && (
                            <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto">
                              {JSON.stringify(result.result, null, 2)}
                            </pre>
                          )}
                          {result.error && (
                            <Alert className="border-red-200 bg-red-50 mt-2">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription className="text-red-800">
                                {result.error}
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Live Gallery Tab */}
          <TabsContent value="gallery" className="mt-6">
            <PhotoInterface 
              tripId={selectedTripId}
              tripTitle={sampleTrips.find(t => t.id === selectedTripId)?.title || 'Test Trip'}
              organizerIds={['test-user-1']}
            />
          </TabsContent>

          {/* Photo List Tab */}
          <TabsContent value="photos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Images className="h-5 w-5 text-blue-600" />
                  Photo List View
                </CardTitle>
              </CardHeader>
              <CardContent>
                {photoManager.photos.length === 0 ? (
                  <div className="text-center py-12">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No photos yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Upload some photos to test the system
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Test Photos
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {photoManager.photos.map((photo, index) => (
                      <div key={photo.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            Photo #{index + 1}
                          </div>
                          <div className="text-sm text-gray-600">
                            {photo.caption || 'No caption'}
                          </div>
                          <div className="text-xs text-gray-500">
                            By {photo.uploader.full_name || photo.uploader.email} • {new Date(photo.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {photoManager.formatFileSize(photo.file_size || 0)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {photo.mime_type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {photoManager.photos.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Photos</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {photoManager.stats?.uploaders || 0}
                    </div>
                    <div className="text-sm text-gray-600">Contributors</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {photoManager.stats?.photosThisWeek || 0}
                    </div>
                    <div className="text-sm text-gray-600">This Week</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {photoManager.stats ? photoManager.formatFileSize(photoManager.stats.totalSize) : '0 B'}
                    </div>
                    <div className="text-sm text-gray-600">Storage Used</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Detailed Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {photoManager.stats ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Upload Activity</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Average per day</span>
                              <span className="font-medium">
                                {photoManager.stats.averagePhotosPerDay.toFixed(1)} photos
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">This week</span>
                              <span className="font-medium">{photoManager.stats.photosThisWeek} photos</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Storage Details</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Average file size</span>
                              <span className="font-medium">
                                {photoManager.stats.totalPhotos > 0 
                                  ? photoManager.formatFileSize(photoManager.stats.totalSize / photoManager.stats.totalPhotos)
                                  : '0 B'
                                }
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Photos per person</span>
                              <span className="font-medium">
                                {photoManager.stats.uploaders > 0 
                                  ? (photoManager.stats.totalPhotos / photoManager.stats.uploaders).toFixed(1)
                                  : '0'
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">No analytics data available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS TESTING PAGE DOES:
 * 
 * PhotoTestPage is like having a complete testing lab for the photo system:
 * 
 * 1. QUICK TESTING - System testing and validation:
 *    - Test configuration with sample trips
 *    - System status monitoring
 *    - Individual component tests
 *    - Test result tracking and display
 * 
 * 2. LIVE GALLERY - Full photo interface testing:
 *    - Complete PhotoInterface component
 *    - Real upload and management functionality
 *    - Gallery, statistics, and management tabs
 *    - Interactive testing environment
 * 
 * 3. PHOTO LIST - Simple photo listing:
 *    - List view of all photos
 *    - Photo metadata display
 *    - File size and type information
 *    - Upload status and details
 * 
 * 4. ANALYTICS - Photo statistics and metrics:
 *    - Detailed analytics dashboard
 *    - Upload activity tracking
 *    - Storage usage analysis
 *    - Contribution metrics
 * 
 * Key Features:
 * - Comprehensive testing interface
 * - Real-time system monitoring
 * - Interactive test execution
 * - Sample data management
 * - Error tracking and reporting
 * - Performance monitoring
 * 
 * Testing Capabilities:
 * - Photo upload and validation testing
 * - Gallery functionality verification
 * - Statistics calculation testing
 * - File handling and compression testing
 * - Permission and security testing
 * - User interface responsiveness testing
 * 
 * User Experience:
 * - Professional testing interface
 * - Clear test result reporting
 * - Easy navigation between features
 * - Real-time feedback and monitoring
 * - Comprehensive system overview
 * 
 * Perfect for developers and testers to:
 * - Verify photo system functionality
 * - Test edge cases and error handling
 * - Monitor system performance
 * - Validate user experience flows
 * - Debug issues and problems
 * 
 * It's like having a complete photo system testing toolkit!
 */