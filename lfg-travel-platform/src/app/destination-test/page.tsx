"use client"

/**
 * Destination Search Test Page
 * Demonstrates Google Places API integration
 */

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { 
  MapPin, 
  Globe, 
  Key, 
  AlertCircle, 
  CheckCircle, 
  Settings,
  Code,
  Eye,
  TestTube,
  Wifi,
  WifiOff
} from 'lucide-react'
import DestinationSearch from '@/components/destination/DestinationSearch'
import { Destination } from '@/services/googlePlacesService'

export default function DestinationTestPage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [testResults, setTestResults] = useState<any[]>([])

  // Test the API directly
  const testApi = async (query: string) => {
    try {
      const response = await fetch('/api/destinations/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 5 })
      })
      
      const data = await response.json()
      setTestResults(prev => [
        { query, timestamp: new Date().toISOString(), success: response.ok, data },
        ...prev.slice(0, 9) // Keep last 10 results
      ])
         } catch (error) {
       setTestResults(prev => [
         { query, timestamp: new Date().toISOString(), success: false, error: error instanceof Error ? error.message : 'Unknown error' },
         ...prev.slice(0, 9)
       ])
     }
  }

  const handleDestinationSelect = (destination: Destination | null) => {
    setSelectedDestination(destination)
    console.log('Selected destination:', destination)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Destination Search Test</h1>
              <p className="text-neutral-600">Google Places API Integration Testing</p>
            </div>
          </div>

          {/* Quick Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">API Status</span>
                </div>
                <p className="text-sm text-neutral-600 mt-1">
                  Check if Google Places API key is configured
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Search Quality</span>
                </div>
                <p className="text-sm text-neutral-600 mt-1">
                  Test search accuracy and relevance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">Rate Limiting</span>
                </div>
                <p className="text-sm text-neutral-600 mt-1">
                  Monitor API usage and limits
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="demo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demo" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Live Demo
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              API Testing
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Integration
            </TabsTrigger>
            <TabsTrigger value="setup" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Setup Guide
            </TabsTrigger>
          </TabsList>

          {/* Live Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Destination Search Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="max-w-2xl">
                  <DestinationSearch
                    onDestinationSelect={handleDestinationSelect}
                    placeholder="Search for cities, countries, or landmarks..."
                  />
                </div>

                {/* Selected Destination Display */}
                {selectedDestination && (
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-blue-900 mb-4">Selected Destination Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p><strong>Name:</strong> {selectedDestination.name}</p>
                          <p><strong>Type:</strong> {selectedDestination.type}</p>
                          <p><strong>Description:</strong> {selectedDestination.description}</p>
                          <p><strong>Country:</strong> {selectedDestination.country || 'Unknown'}</p>
                          {selectedDestination.region && (
                            <p><strong>Region:</strong> {selectedDestination.region}</p>
                          )}
                        </div>
                        <div>
                          <p><strong>Coordinates:</strong> {selectedDestination.coordinates.lat.toFixed(4)}, {selectedDestination.coordinates.lng.toFixed(4)}</p>
                          <p><strong>Photos:</strong> {selectedDestination.photos.length} available</p>
                          {selectedDestination.placeId && (
                            <p><strong>Place ID:</strong> {selectedDestination.placeId.substring(0, 20)}...</p>
                          )}
                        </div>
                      </div>

                      {/* JSON Preview */}
                      <details className="mt-4">
                        <summary className="cursor-pointer font-medium text-blue-800">View JSON Data</summary>
                        <pre className="mt-2 p-4 bg-white border rounded-lg text-xs overflow-auto">
                          {JSON.stringify(selectedDestination, null, 2)}
                        </pre>
                      </details>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Testing Tab */}
          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoint Testing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={() => testApi('Paris')} variant="outline">
                    Test "Paris"
                  </Button>
                  <Button onClick={() => testApi('Tokyo')} variant="outline">
                    Test "Tokyo"
                  </Button>
                  <Button onClick={() => testApi('Bali')} variant="outline">
                    Test "Bali"
                  </Button>
                  <Button onClick={() => testApi('New York')} variant="outline">
                    Test "New York"
                  </Button>
                  <Button onClick={() => testApi('xyz123')} variant="outline" className="text-red-600">
                    Test Invalid
                  </Button>
                </div>

                {/* Test Results */}
                <div className="space-y-3">
                  <h4 className="font-medium">Test Results (Last 10)</h4>
                  {testResults.length === 0 ? (
                    <p className="text-neutral-500">No tests run yet. Click a test button above.</p>
                  ) : (
                    testResults.map((result, index) => (
                      <Card key={index} className={`border-l-4 ${result.success ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {result.success ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-600" />
                              )}
                              <span className="font-medium">Query: "{result.query}"</span>
                            </div>
                            <span className="text-xs text-neutral-500">
                              {new Date(result.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          
                          {result.success ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-4 text-sm">
                                <span>Found: {result.data.destinations?.length || 0} destinations</span>
                                <span className="flex items-center gap-1">
                                  {result.data.source === 'google' ? (
                                    <>
                                      <Wifi className="w-3 h-3 text-green-500" />
                                      Google API
                                    </>
                                  ) : (
                                    <>
                                      <WifiOff className="w-3 h-3 text-orange-500" />
                                      Fallback
                                    </>
                                  )}
                                </span>
                              </div>
                              
                              {result.data.meta && (
                                <div className="text-xs text-neutral-600">
                                  Requests remaining: {result.data.meta.remaining}
                                  {result.data.meta.usageStats && (
                                    <span> | API configured: {result.data.meta.usageStats.apiConfigured ? 'Yes' : 'No'}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-red-600">{result.error}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Tab */}
          <TabsContent value="integration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Basic Usage</h4>
                  <pre className="p-4 bg-neutral-100 rounded-lg text-sm overflow-auto">
{`import DestinationSearch from '@/components/destination/DestinationSearch'

function TripForm() {
  const [destination, setDestination] = useState(null)
  
  return (
    <DestinationSearch
      onDestinationSelect={setDestination}
      placeholder="Where do you want to go?"
      selectedDestination={destination}
    />
  )
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-3">With Form Integration</h4>
                  <pre className="p-4 bg-neutral-100 rounded-lg text-sm overflow-auto">
{`function CreateTripForm() {
  const [formData, setFormData] = useState({
    title: '',
    destination: null,
    startDate: '',
    endDate: ''
  })

  const handleDestinationSelect = (destination) => {
    setFormData(prev => ({
      ...prev,
      destination,
      // Auto-fill title if empty
      title: prev.title || \`Trip to \${destination.name}\`
    }))
  }

  return (
    <form>
      <DestinationSearch
        onDestinationSelect={handleDestinationSelect}
        selectedDestination={formData.destination}
      />
      {/* Other form fields */}
    </form>
  )
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Props Reference</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-neutral-200 rounded-lg">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="text-left p-3 border-b">Prop</th>
                          <th className="text-left p-3 border-b">Type</th>
                          <th className="text-left p-3 border-b">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border-b font-mono text-sm">onDestinationSelect</td>
                          <td className="p-3 border-b text-sm">(destination: Destination | null) =&gt; void</td>
                          <td className="p-3 border-b text-sm">Callback when destination is selected</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-b font-mono text-sm">placeholder</td>
                          <td className="p-3 border-b text-sm">string</td>
                          <td className="p-3 border-b text-sm">Input placeholder text</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-b font-mono text-sm">selectedDestination</td>
                          <td className="p-3 border-b text-sm">Destination | null</td>
                          <td className="p-3 border-b text-sm">Currently selected destination</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono text-sm">className</td>
                          <td className="p-3 text-sm">string</td>
                          <td className="p-3 text-sm">Additional CSS classes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Setup Guide Tab */}
          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Google Places API Setup Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-medium">Get Google Cloud Console Access</h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">console.cloud.google.com</a> and create a project or select an existing one.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-medium">Enable Places API</h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        In the Google Cloud Console, go to APIs & Services &gt; Library and enable "Places API".
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-medium">Create API Key</h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        Go to APIs & Services &gt; Credentials and create a new API key.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-medium">Secure Your API Key</h4>
                      <p className="text-sm text-neutral-600 mt-1 mb-2">
                        Add your API key to the <code className="bg-neutral-100 px-1 rounded">.env.local</code> file:
                      </p>
                      <pre className="p-3 bg-neutral-100 rounded text-sm">
GOOGLE_PLACES_API_KEY=your_actual_api_key_here
                      </pre>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                    <div>
                      <h4 className="font-medium">Test the Integration</h4>
                      <p className="text-sm text-neutral-600 mt-1">
                        Use the "API Testing" tab above to verify your setup is working correctly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Notes */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Security Notes</h4>
                      <ul className="text-sm text-yellow-700 mt-2 space-y-1 list-disc list-inside">
                        <li>Never commit your API key to version control</li>
                        <li>Restrict your API key to specific APIs and domains in production</li>
                        <li>Monitor your API usage in Google Cloud Console</li>
                        <li>Set up billing alerts to avoid unexpected charges</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                <Card className="bg-neutral-50">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Current Configuration Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>API endpoint created: <code>/api/destinations/search</code></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>React component ready: <code>DestinationSearch</code></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Fallback destinations configured</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Waiting for your Google Places API key</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}