import { useState, useEffect, useCallback } from 'react'
import { 
  photoService, 
  PhotoWithUploader, 
  UploadPhotoData, 
  UploadResult 
} from '@/services/photoService'

/**
 * PHOTO MANAGEMENT HOOKS
 * 
 * These hooks provide easy-to-use React state management for photo features.
 * Each hook handles loading, error states, and automatic updates.
 * 
 * Simple explanation: Like having smart helpers for photo gallery features
 */

/**
 * HOOK: useTripPhotos
 * 
 * Loads and manages photo gallery for a trip
 * Simple explanation: Like having a photo album that updates automatically
 */
export function useTripPhotos(tripId: string) {
  const [photos, setPhotos] = useState<PhotoWithUploader[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadPhotos = useCallback(async () => {
    if (!tripId) return

    setLoading(true)
    setError(null)

    const { data, error: photoError } = await photoService.getTripPhotos(tripId)
    
    if (photoError) {
      setError(photoError)
      setPhotos([])
    } else {
      setPhotos(data || [])
    }
    
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    loadPhotos()
  }, [loadPhotos])

  return {
    photos,
    loading,
    error,
    refetch: loadPhotos,
    isEmpty: !loading && photos.length === 0,
    photoCount: photos.length
  }
}

/**
 * HOOK: useUploadPhoto
 * 
 * Provides function to upload photos with progress tracking
 * Simple explanation: Like having an "Add Photo" button that handles everything
 */
export function useUploadPhoto() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const uploadPhoto = useCallback(async (uploadData: UploadPhotoData): Promise<UploadResult> => {
    setLoading(true)
    setError(null)
    setProgress(0)

    const result = await photoService.uploadPhoto({
      ...uploadData,
      onProgress: (progressValue) => {
        setProgress(progressValue)
      }
    })
    
    if (result.error) {
      setError(result.error)
    }

    setLoading(false)
    
    return result
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setProgress(0)
  }, [])

  return {
    uploadPhoto,
    loading,
    error,
    progress,
    reset
  }
}

/**
 * HOOK: usePhotoActions
 * 
 * Provides actions for managing photos (update, delete)
 * Simple explanation: Like having photo management tools
 */
export function usePhotoActions() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updatePhotoCaption = useCallback(async (photoId: string, caption: string, location?: string) => {
    setLoading(true)
    setError(null)

    const result = await photoService.updatePhotoCaption(photoId, caption, location)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return { success: false, error: result.error }
    }

    setLoading(false)
    return { success: true }
  }, [])

  const deletePhoto = useCallback(async (photoId: string) => {
    setLoading(true)
    setError(null)

    const result = await photoService.deletePhoto(photoId)
    
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
    updatePhotoCaption,
    deletePhoto,
    loading,
    error,
    clearError
  }
}

/**
 * HOOK: usePhotoStats
 * 
 * Calculates and tracks photo statistics
 * Simple explanation: Like having a dashboard showing photo metrics
 */
export function usePhotoStats(tripId: string) {
  const [stats, setStats] = useState<{
    totalPhotos: number
    totalSize: number
    uploaders: number
    photosThisWeek: number
    averagePhotosPerDay: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadStats = useCallback(async () => {
    if (!tripId) return

    setLoading(true)
    setError(null)

    const { data, error: statsError } = await photoService.getPhotoStats(tripId)
    
    if (statsError) {
      setError(statsError)
      setStats(null)
    } else {
      setStats(data)
    }
    
    setLoading(false)
  }, [tripId])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  // Format file size for display
  const formatFileSize = useCallback((bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: loadStats,
    isEmpty: !loading && !stats,
    formatFileSize
  }
}

/**
 * HOOK: usePhotoValidation
 * 
 * Provides validation functions for photo uploads
 * Simple explanation: Like having form validation that catches mistakes
 */
export function usePhotoValidation() {
  const validateFile = useCallback((file: File) => {
    return photoService.validateFile(file)
  }, [])

  const validateUploadData = useCallback((data: Partial<UploadPhotoData>) => {
    const errors: Record<string, string> = {}

    if (!data.tripId) {
      errors.tripId = 'Trip ID is required'
    }

    if (!data.file) {
      errors.file = 'Photo file is required'
    } else {
      const fileValidation = validateFile(data.file)
      if (!fileValidation.isValid) {
        errors.file = fileValidation.error || 'Invalid file'
      }
    }

    if (data.caption && data.caption.length > 500) {
      errors.caption = 'Caption must be less than 500 characters'
    }

    if (data.location && data.location.length > 100) {
      errors.location = 'Location must be less than 100 characters'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }, [validateFile])

  return {
    validateFile,
    validateUploadData
  }
}

/**
 * HOOK: usePhotoSelection
 * 
 * Manages photo selection state for galleries
 * Simple explanation: Like having a photo picker for galleries
 */
export function usePhotoSelection() {
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set())
  const [selectionMode, setSelectionMode] = useState(false)

  const selectPhoto = useCallback((photoId: string) => {
    setSelectedPhotos(prev => {
      const newSet = new Set(prev)
      if (newSet.has(photoId)) {
        newSet.delete(photoId)
      } else {
        newSet.add(photoId)
      }
      return newSet
    })
  }, [])

  const selectAll = useCallback((photoIds: string[]) => {
    setSelectedPhotos(new Set(photoIds))
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedPhotos(new Set())
  }, [])

  const toggleSelectionMode = useCallback(() => {
    setSelectionMode(prev => {
      if (prev) {
        clearSelection()
      }
      return !prev
    })
  }, [clearSelection])

  const isSelected = useCallback((photoId: string) => {
    return selectedPhotos.has(photoId)
  }, [selectedPhotos])

  return {
    selectedPhotos: Array.from(selectedPhotos),
    selectionMode,
    selectPhoto,
    selectAll,
    clearSelection,
    toggleSelectionMode,
    isSelected,
    selectedCount: selectedPhotos.size
  }
}

/**
 * HOOK: usePhotoGallery
 * 
 * Manages photo gallery display and interactions
 * Simple explanation: Like having a complete photo gallery with viewer
 */
export function usePhotoGallery(photos: PhotoWithUploader[]) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'uploader'>('newest')

  const openViewer = useCallback((photoIndex: number) => {
    setCurrentPhotoIndex(photoIndex)
    setIsViewerOpen(true)
  }, [])

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false)
  }, [])

  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex(prev => 
      prev < photos.length - 1 ? prev + 1 : 0
    )
  }, [photos.length])

  const previousPhoto = useCallback(() => {
    setCurrentPhotoIndex(prev => 
      prev > 0 ? prev - 1 : photos.length - 1
    )
  }, [photos.length])

  const goToPhoto = useCallback((index: number) => {
    if (index >= 0 && index < photos.length) {
      setCurrentPhotoIndex(index)
    }
  }, [photos.length])

  // Sort photos based on selected sort option
  const sortedPhotos = useCallback(() => {
    const photosCopy = [...photos]
    
    switch (sortBy) {
      case 'newest':
        return photosCopy.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      case 'oldest':
        return photosCopy.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      case 'uploader':
        return photosCopy.sort((a, b) => 
          (a.uploader.full_name || a.uploader.email).localeCompare(
            b.uploader.full_name || b.uploader.email
          )
        )
      default:
        return photosCopy
    }
  }, [photos, sortBy])

  const currentPhoto = photos[currentPhotoIndex]

  return {
    currentPhoto,
    currentPhotoIndex,
    isViewerOpen,
    viewMode,
    sortBy,
    sortedPhotos: sortedPhotos(),
    openViewer,
    closeViewer,
    nextPhoto,
    previousPhoto,
    goToPhoto,
    setViewMode,
    setSortBy
  }
}

/**
 * COMBINED HOOK: usePhotoManager
 * 
 * Combines all photo functionality for a trip
 * Simple explanation: Like having a complete photo management system
 */
export function usePhotoManager(tripId: string) {
  const photos = useTripPhotos(tripId)
  const upload = useUploadPhoto()
  const actions = usePhotoActions()
  const stats = usePhotoStats(tripId)
  const validation = usePhotoValidation()
  const selection = usePhotoSelection()
  const gallery = usePhotoGallery(photos.photos)

  // Refresh all data after changes
  const refreshAll = useCallback(async () => {
    await Promise.all([
      photos.refetch(),
      stats.refetch()
    ])
  }, [photos.refetch, stats.refetch])

  // Upload photo with auto-refresh
  const uploadPhotoWithRefresh = useCallback(async (uploadData: UploadPhotoData) => {
    const result = await upload.uploadPhoto(uploadData)
    if (result.success) {
      await refreshAll()
      selection.clearSelection()
    }
    return result
  }, [upload.uploadPhoto, refreshAll, selection.clearSelection])

  // Update photo with auto-refresh
  const updatePhotoWithRefresh = useCallback(async (photoId: string, caption: string, location?: string) => {
    const result = await actions.updatePhotoCaption(photoId, caption, location)
    if (result.success) {
      await refreshAll()
    }
    return result
  }, [actions.updatePhotoCaption, refreshAll])

  // Delete photo with auto-refresh
  const deletePhotoWithRefresh = useCallback(async (photoId: string) => {
    const result = await actions.deletePhoto(photoId)
    if (result.success) {
      await refreshAll()
      selection.clearSelection()
      if (gallery.isViewerOpen) {
        gallery.closeViewer()
      }
    }
    return result
  }, [actions.deletePhoto, refreshAll, selection.clearSelection, gallery.isViewerOpen, gallery.closeViewer])

  // Delete selected photos
  const deleteSelectedPhotos = useCallback(async () => {
    const selectedIds = selection.selectedPhotos
    let successCount = 0
    let errorCount = 0

    for (const photoId of selectedIds) {
      const result = await actions.deletePhoto(photoId)
      if (result.success) {
        successCount++
      } else {
        errorCount++
      }
    }

    if (successCount > 0) {
      await refreshAll()
      selection.clearSelection()
    }

    return {
      success: successCount > 0,
      successCount,
      errorCount,
      total: selectedIds.length
    }
  }, [selection.selectedPhotos, actions.deletePhoto, refreshAll, selection.clearSelection])

  const loading = photos.loading || upload.loading || actions.loading || stats.loading
  const hasPhotos = photos.photos.length > 0

  return {
    // Data
    photos: photos.photos,
    stats: stats.stats,
    
    // States
    loading,
    hasPhotos,
    
    // Photo operations
    uploadPhoto: uploadPhotoWithRefresh,
    updatePhoto: updatePhotoWithRefresh,
    deletePhoto: deletePhotoWithRefresh,
    deleteSelectedPhotos,
    refreshAll,
    
    // Upload state
    uploadProgress: upload.progress,
    uploadLoading: upload.loading,
    uploadError: upload.error,
    resetUpload: upload.reset,
    
    // Gallery management
    gallery,
    
    // Selection management
    selection,
    
    // Validation
    validateFile: validation.validateFile,
    validateUploadData: validation.validateUploadData,
    
    // Stats
    formatFileSize: stats.formatFileSize,
    
    // Individual hook states
    photosError: photos.error,
    actionsError: actions.error,
    statsError: stats.error,
    clearActionsError: actions.clearError,
  }
}

/**
 * SIMPLE EXPLANATION OF WHAT THESE HOOKS DO:
 * 
 * useTripPhotos() - "Show me all photos for this trip"
 * - Loads photo gallery with automatic loading and error states
 * - Shows who uploaded each photo and when
 * - Automatically refreshes when needed
 * 
 * useUploadPhoto() - "Let me upload a photo"
 * - Provides function to upload photos with progress tracking
 * - Handles file validation and compression
 * - Shows upload progress bar
 * 
 * usePhotoActions() - "Give me photo management tools"
 * - Update photo captions and locations
 * - Delete photos (uploader or organizer only)
 * - All with proper loading and error handling
 * 
 * usePhotoGallery() - "Give me a photo viewer"
 * - Full-screen photo viewer with navigation
 * - Grid and list view modes
 * - Photo sorting options
 * - Keyboard navigation support
 * 
 * usePhotoSelection() - "Let me select multiple photos"
 * - Multi-select functionality for galleries
 * - Bulk operations (delete multiple photos)
 * - Selection mode toggle
 * 
 * usePhotoManager() - "Give me everything for photo management"
 * - Combines all hooks into one complete system
 * - Handles auto-refresh after changes
 * - Provides all tools needed for photo sharing
 * 
 * These hooks make it super easy to use photos in React components:
 * - No need to manage loading states manually
 * - Automatic error handling
 * - Data stays in sync across components
 * - Clean, predictable API for all photo operations
 * - Built-in photo validation and compression
 * - Complete gallery management
 */