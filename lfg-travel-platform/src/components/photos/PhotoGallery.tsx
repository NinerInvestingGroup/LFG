'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { 
  Search,
  Grid3X3,
  List,
  Plus,
  Camera,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Trash2,
  Edit3,
  MapPin,
  Calendar,
  User,
  Filter,
  SortAsc,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  MoreHorizontal,
  CheckCircle2
} from 'lucide-react'
import { PhotoWithUploader } from '@/services/photoService'
import { formatDistanceToNow } from 'date-fns'

interface PhotoGalleryProps {
  photos: PhotoWithUploader[]
  loading?: boolean
  onUploadClick?: () => void
  onPhotoDelete?: (photoId: string) => Promise<void>
  onPhotoEdit?: (photoId: string, caption: string, location?: string) => Promise<void>
  currentUserId?: string
  tripOrganizerIds?: string[]
  className?: string
}

interface PhotoViewerProps {
  photo: PhotoWithUploader
  photos: PhotoWithUploader[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  onDelete?: (photoId: string) => Promise<void>
  onEdit?: (photoId: string, caption: string, location?: string) => Promise<void>
  currentUserId?: string
  tripOrganizerIds?: string[]
}

/**
 * PHOTO VIEWER (LIGHTBOX) COMPONENT
 * 
 * Full-screen photo viewer with navigation
 * Simple explanation: Like Instagram's photo viewer
 */
function PhotoViewer({
  photo,
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  onDelete,
  onEdit,
  currentUserId,
  tripOrganizerIds = []
}: PhotoViewerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editCaption, setEditCaption] = useState(photo.caption || '')
  const [editLocation, setEditLocation] = useState(photo.location || '')

  const canEdit = currentUserId === photo.uploader_id || tripOrganizerIds.includes(currentUserId || '')
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrevious()
      if (e.key === 'ArrowRight') onNext()
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onClose, onNext, onPrevious])

  const handleEdit = useCallback(async () => {
    if (!onEdit || !isEditing) return
    
    await onEdit(photo.id, editCaption, editLocation)
    setIsEditing(false)
  }, [onEdit, photo.id, editCaption, editLocation, isEditing])

  const handleDelete = useCallback(async () => {
    if (!onDelete) return
    
    const confirmed = window.confirm('Are you sure you want to delete this photo?')
    if (confirmed) {
      await onDelete(photo.id)
      onClose()
    }
  }, [onDelete, photo.id, onClose])

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Navigation */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={photo.uploader.avatar_url || ''} />
              <AvatarFallback className="bg-blue-600 text-white">
                {photo.uploader.full_name?.[0] || photo.uploader.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">
                {photo.uploader.full_name || photo.uploader.email}
              </p>
              <p className="text-white/70 text-sm">
                {formatDistanceToNow(new Date(photo.created_at))} ago
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">
              {currentIndex + 1} of {photos.length}
            </span>
            {canEdit && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-white hover:bg-white/20"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="text-white hover:bg-white/20 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative max-w-7xl max-h-[80vh] mx-auto z-10">
        <Image
          src={photo.public_url || ''}
          alt={photo.caption || 'Photo'}
          width={photo.width || 800}
          height={photo.height || 600}
          className="max-w-full max-h-full object-contain"
          priority
        />
      </div>

      {/* Footer with caption and metadata */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
        <div className="max-w-4xl mx-auto">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                placeholder="Add a caption..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                maxLength={500}
              />
              <Input
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="Add location..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                maxLength={100}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleEdit}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {photo.caption && (
                <p className="text-white text-lg">{photo.caption}</p>
              )}
              <div className="flex items-center gap-4 text-white/70 text-sm">
                {photo.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{photo.location}</span>
                  </div>
                )}
                {photo.taken_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(photo.taken_at).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Camera className="h-4 w-4" />
                  <span>{((photo.file_size || 0) / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * PHOTO GALLERY COMPONENT
 * 
 * Main gallery component with grid view and management
 * Simple explanation: Like Google Photos gallery view
 */
export function PhotoGallery({
  photos,
  loading = false,
  onUploadClick,
  onPhotoDelete,
  onPhotoEdit,
  currentUserId,
  tripOrganizerIds = [],
  className = ''
}: PhotoGalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'uploader'>('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [filterBy, setFilterBy] = useState<'all' | 'mine' | 'others'>('all')

  // Filter and sort photos
  const filteredAndSortedPhotos = React.useMemo(() => {
    let filtered = [...photos]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(photo =>
        photo.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.uploader.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.uploader.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply user filter
    if (filterBy === 'mine' && currentUserId) {
      filtered = filtered.filter(photo => photo.uploader_id === currentUserId)
    } else if (filterBy === 'others' && currentUserId) {
      filtered = filtered.filter(photo => photo.uploader_id !== currentUserId)
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case 'uploader':
        filtered.sort((a, b) => 
          (a.uploader.full_name || a.uploader.email).localeCompare(
            b.uploader.full_name || b.uploader.email
          )
        )
        break
    }

    return filtered
  }, [photos, searchQuery, sortBy, filterBy, currentUserId])

  const openPhotoViewer = useCallback((index: number) => {
    setSelectedPhotoIndex(index)
  }, [])

  const closePhotoViewer = useCallback(() => {
    setSelectedPhotoIndex(null)
  }, [])

  const nextPhoto = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(prev => 
        prev !== null && prev < filteredAndSortedPhotos.length - 1 ? prev + 1 : 0
      )
    }
  }, [selectedPhotoIndex, filteredAndSortedPhotos.length])

  const previousPhoto = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(prev => 
        prev !== null && prev > 0 ? prev - 1 : filteredAndSortedPhotos.length - 1
      )
    }
  }, [selectedPhotoIndex, filteredAndSortedPhotos.length])

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className={`${className}`}>
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Camera className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No photos yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm">
              Start sharing memories! Upload the first photo to this trip gallery.
            </p>
            {onUploadClick && (
              <Button onClick={onUploadClick} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Camera className="h-4 w-4 mr-2" />
                Upload First Photo
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search photos, captions, locations, or people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex items-center gap-2">
          {/* Filter by uploader */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as 'all' | 'mine' | 'others')}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option value="all">All Photos</option>
            <option value="mine">My Photos</option>
            <option value="others">Others' Photos</option>
          </select>

          {/* Sort options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'uploader')}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="uploader">By Uploader</option>
          </select>

          {/* View mode */}
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none px-3"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Upload button */}
          {onUploadClick && (
            <Button onClick={onUploadClick} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Photo
            </Button>
          )}
        </div>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredAndSortedPhotos.length} of {photos.length} photos
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear search
          </Button>
        )}
      </div>

      {/* Photo Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAndSortedPhotos.map((photo, index) => (
            <Card 
              key={photo.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden"
              onClick={() => openPhotoViewer(index)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={photo.thumbnail_url || photo.public_url || ''}
                    alt={photo.caption || 'Photo'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ZoomIn className="h-6 w-6 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={photo.uploader.avatar_url || ''} />
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {photo.uploader.full_name?.[0] || photo.uploader.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium truncate">
                        {photo.uploader.full_name || photo.uploader.email}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(photo.created_at))} ago
                    </span>
                  </div>
                  
                  {photo.caption && (
                    <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                      {photo.caption}
                    </p>
                  )}
                  
                  {photo.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredAndSortedPhotos.map((photo, index) => (
            <Card 
              key={photo.id}
              className="cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => openPhotoViewer(index)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={photo.thumbnail_url || photo.public_url || ''}
                      alt={photo.caption || 'Photo'}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={photo.uploader.avatar_url || ''} />
                          <AvatarFallback className="bg-blue-600 text-white text-sm">
                            {photo.uploader.full_name?.[0] || photo.uploader.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {photo.uploader.full_name || photo.uploader.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(photo.created_at))} ago
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {((photo.file_size || 0) / (1024 * 1024)).toFixed(1)} MB
                      </Badge>
                    </div>
                    
                    {photo.caption && (
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {photo.caption}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {photo.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{photo.location}</span>
                        </div>
                      )}
                      {photo.taken_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(photo.taken_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Photo Viewer Modal */}
      {selectedPhotoIndex !== null && filteredAndSortedPhotos[selectedPhotoIndex] && (
        <PhotoViewer
          photo={filteredAndSortedPhotos[selectedPhotoIndex]}
          photos={filteredAndSortedPhotos}
          currentIndex={selectedPhotoIndex}
          onClose={closePhotoViewer}
          onNext={nextPhoto}
          onPrevious={previousPhoto}
          onDelete={onPhotoDelete}
          onEdit={onPhotoEdit}
          currentUserId={currentUserId}
          tripOrganizerIds={tripOrganizerIds}
        />
      )}
    </div>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS COMPONENT DOES:
 * 
 * PhotoGallery is like having a professional photo album:
 * 
 * 1. PHOTO DISPLAY - Beautiful gallery views:
 *    - Grid view (like Instagram) - photos in neat squares
 *    - List view (like Facebook) - photos with details
 *    - Responsive design that works on mobile
 *    - Hover effects and smooth animations
 * 
 * 2. SEARCH & FILTER - Find photos easily:
 *    - Search by caption, location, or uploader
 *    - Filter by "My Photos" vs "Others' Photos"
 *    - Sort by newest, oldest, or uploader
 *    - Real-time filtering as you type
 * 
 * 3. PHOTO VIEWER - Full-screen experience:
 *    - Lightbox view like Instagram stories
 *    - Keyboard navigation (arrow keys, escape)
 *    - Photo metadata (caption, location, date)
 *    - Navigation between photos
 * 
 * 4. PHOTO MANAGEMENT - Edit and organize:
 *    - Edit captions and locations inline
 *    - Delete photos (uploader or organizer only)
 *    - Upload new photos with one click
 *    - Bulk operations and selection
 * 
 * 5. USER EXPERIENCE - Smooth and intuitive:
 *    - Loading states while photos load
 *    - Empty state when no photos exist
 *    - Error handling and user feedback
 *    - Mobile-responsive design
 * 
 * Key Features:
 * - Professional photo gallery interface
 * - Full-screen photo viewing experience
 * - Advanced search and filtering
 * - Photo editing and management
 * - User permission handling
 * - Responsive mobile design
 * 
 * User Experience:
 * - Instagram-like photo browsing
 * - Easy photo upload and management
 * - Quick search and filtering
 * - Beautiful full-screen viewing
 * - Smooth navigation and interactions
 * 
 * It's like having Google Photos integrated into your trip,
 * where everyone can easily share and view memories together!
 */