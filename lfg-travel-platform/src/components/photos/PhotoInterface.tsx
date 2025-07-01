'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Progress } from '@/components/ui/Progress'
import { 
  Camera, 
  Images, 
  BarChart3, 
  Upload, 
  Users, 
  HardDrive,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Share2,
  Download,
  Settings
} from 'lucide-react'
import { PhotoGallery } from './PhotoGallery'
import { PhotoUploadModal } from './PhotoUploadModal'
import { usePhotoManager } from '@/hooks/usePhotos'
import { createClient } from '@/lib/supabase'

interface PhotoInterfaceProps {
  tripId: string
  tripTitle?: string
  organizerIds?: string[]
  className?: string
}

/**
 * PHOTO STATISTICS COMPONENT
 * 
 * Shows photo statistics and metrics
 * Simple explanation: Like having analytics for your photo gallery
 */
function PhotoStats({ 
  stats, 
  loading, 
  error, 
  formatFileSize 
}: {
  stats: any
  loading: boolean
  error: string | null
  formatFileSize: (bytes: number) => string
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-red-800">
          {error || 'Failed to load statistics'}
        </AlertDescription>
      </Alert>
    )
  }

  const statCards = [
    {
      title: 'Total Photos',
      value: stats.totalPhotos.toLocaleString(),
      icon: Images,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Storage Used',
      value: formatFileSize(stats.totalSize),
      icon: HardDrive,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Contributors',
      value: stats.uploaders.toString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'This Week',
      value: stats.photosThisWeek.toString(),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Upload Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average per day</span>
                <span className="font-medium">
                  {stats.averagePhotosPerDay.toFixed(1)} photos
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This week</span>
                <span className="font-medium">{stats.photosThisWeek} photos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total size</span>
                <span className="font-medium">{formatFileSize(stats.totalSize)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-green-600" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average file size</span>
                <span className="font-medium">
                  {stats.totalPhotos > 0 
                    ? formatFileSize(stats.totalSize / stats.totalPhotos)
                    : '0 B'
                  }
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Contributors</span>
                <span className="font-medium">{stats.uploaders} people</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Photos per person</span>
                <span className="font-medium">
                  {stats.uploaders > 0 
                    ? (stats.totalPhotos / stats.uploaders).toFixed(1)
                    : '0'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * MAIN PHOTO INTERFACE COMPONENT
 * 
 * Complete photo sharing interface for trips
 * Simple explanation: Like having your own Instagram for the trip
 */
export function PhotoInterface({ 
  tripId, 
  tripTitle = 'Trip Photos',
  organizerIds = [],
  className = '' 
}: PhotoInterfaceProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('gallery')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  
  const photoManager = usePhotoManager(tripId)

  // Get current user ID
  React.useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setCurrentUserId(user?.id || null)
      } catch (error) {
        console.error('Error getting current user:', error)
        setCurrentUserId(null)
      }
    }
    getCurrentUser()
  }, [])

  const handleUploadPhoto = async (uploadData: any) => {
    const result = await photoManager.uploadPhoto({
      ...uploadData,
      tripId
    })
    
    if (result.success) {
      setIsUploadModalOpen(false)
    }
    
    return result
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Camera className="h-6 w-6 text-blue-600" />
            {tripTitle}
          </h2>
          <p className="text-gray-600">
            Share and view photos from your trip
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Images className="h-3 w-3" />
            {photoManager.photos.length} photos
          </Badge>
          <Button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            Add Photos
          </Button>
        </div>
      </div>

      {/* Global Error */}
      {(photoManager.photosError || photoManager.actionsError || photoManager.statsError) && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-800">
            {photoManager.photosError || photoManager.actionsError || photoManager.statsError}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                photoManager.clearActionsError()
                photoManager.refreshAll()
              }}
              className="ml-2 text-red-800 hover:text-red-900"
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Progress */}
      {photoManager.uploadLoading && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">Uploading photo...</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={photoManager.uploadProgress} className="flex-1 h-2" />
                  <span className="text-sm text-blue-700 font-medium">
                    {Math.round(photoManager.uploadProgress)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Images className="h-4 w-4" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Manage
          </TabsTrigger>
        </TabsList>

        {/* Gallery Tab */}
        <TabsContent value="gallery" className="mt-6">
                     <PhotoGallery
             photos={photoManager.photos}
             loading={photoManager.loading}
             onUploadClick={() => setIsUploadModalOpen(true)}
             onPhotoDelete={async (photoId) => { await photoManager.deletePhoto(photoId) }}
             onPhotoEdit={async (photoId, caption, location) => { await photoManager.updatePhoto(photoId, caption, location) }}
             currentUserId={currentUserId || undefined}
             tripOrganizerIds={organizerIds}
           />
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="mt-6">
          <PhotoStats
            stats={photoManager.stats}
            loading={photoManager.loading}
            error={photoManager.statsError}
            formatFileSize={photoManager.formatFileSize}
          />
        </TabsContent>

        {/* Management Tab */}
        <TabsContent value="manage" className="mt-6">
          <div className="space-y-6">
            {/* Selection Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-600" />
                  Photo Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Bulk Actions</h4>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={photoManager.selection.toggleSelectionMode}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {photoManager.selection.selectionMode ? 'Exit Selection' : 'Select Photos'}
                      </Button>
                      
                      {photoManager.selection.selectionMode && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => photoManager.selection.selectAll(
                              photoManager.photos.map(p => p.id)
                            )}
                            disabled={photoManager.selection.selectedCount === photoManager.photos.length}
                          >
                            Select All
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={photoManager.selection.clearSelection}
                            disabled={photoManager.selection.selectedCount === 0}
                          >
                            Clear Selection
                          </Button>
                        </>
                      )}
                    </div>
                    
                    {photoManager.selection.selectedCount > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {photoManager.selection.selectedCount} selected
                        </span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={photoManager.deleteSelectedPhotos}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Delete Selected
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Gallery Actions</h4>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={photoManager.refreshAll}
                        disabled={photoManager.loading}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Refresh Gallery
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        disabled={!photoManager.hasPhotos}
                      >
                        <Download className="h-4 w-4" />
                        Export All
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photo Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Photo Sharing Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-green-700">✅ Best Practices</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Add descriptive captions to your photos</li>
                      <li>• Include location information when relevant</li>
                      <li>• Upload high-quality images for best results</li>
                      <li>• Share photos promptly while memories are fresh</li>
                      <li>• Consider other travelers in your photos</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-red-700">🚫 Please Avoid</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Uploading inappropriate or offensive content</li>
                      <li>• Sharing photos without permission from others</li>
                      <li>• Uploading very large files unnecessarily</li>
                      <li>• Posting duplicates of the same photo</li>
                      <li>• Forgetting to add captions or context</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-blue-600" />
                  Technical Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Supported Formats</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• JPEG (.jpg, .jpeg)</li>
                      <li>• PNG (.png)</li>
                      <li>• WebP (.webp)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">File Limits</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Maximum size: 5MB</li>
                      <li>• Maximum dimension: 2048px</li>
                      <li>• Automatic compression applied</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Privacy</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Visible to trip participants only</li>
                      <li>• Secure cloud storage</li>
                      <li>• Uploader can edit/delete</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Photo Upload Modal */}
      <PhotoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadPhoto}
        loading={photoManager.uploadLoading}
        progress={photoManager.uploadProgress}
        error={photoManager.uploadError}
      />
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS INTERFACE DOES:
 * 
 * PhotoInterface is like having a complete photo sharing app for your trip:
 * 
 * 1. GALLERY TAB - Photo browsing and viewing:
 *    - Beautiful grid and list views
 *    - Search and filter photos
 *    - Full-screen photo viewer
 *    - Upload new photos easily
 * 
 * 2. STATISTICS TAB - Photo analytics:
 *    - Total photos and storage used
 *    - Number of contributors
 *    - Upload activity metrics
 *    - Storage breakdown analysis
 * 
 * 3. MANAGE TAB - Photo management tools:
 *    - Bulk photo operations
 *    - Selection and deletion tools
 *    - Photo sharing guidelines
 *    - Technical information
 * 
 * Key Features:
 * - Tabbed interface for organization
 * - Real-time upload progress
 * - Error handling and recovery
 * - Photo statistics and analytics
 * - Management and bulk operations
 * - User guidelines and best practices
 * 
 * User Experience:
 * - Instagram-like photo sharing
 * - Professional interface design
 * - Easy navigation between features
 * - Clear feedback and guidance
 * - Mobile-responsive layout
 * 
 * Think of it as your trip's private Instagram where everyone can:
 * - Share their favorite moments
 * - Browse all trip photos together
 * - See who contributed what
 * - Manage and organize photos
 * - Get helpful tips and guidelines
 * 
 * Perfect for keeping all trip memories in one beautiful, organized place!
 */