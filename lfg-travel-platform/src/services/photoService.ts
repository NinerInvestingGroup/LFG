import { createClient } from '@/lib/supabase'
import { Tables, TablesInsert } from '@/shared/types/database'
import { FILE_UPLOAD } from '@/shared/constants'

// Type aliases for easier use
export type Photo = Tables<'photos'>
export type PhotoInsert = TablesInsert<'photos'>

// Enhanced photo type with uploader information
export interface PhotoWithUploader extends Photo {
  uploader: {
    id: string
    full_name: string | null
    avatar_url: string | null
    email: string
  }
}

// Photo upload data
export interface UploadPhotoData {
  tripId: string
  file: File
  caption?: string
  location?: string
  takenAt?: string
  onProgress?: (progress: number) => void
}

// Photo upload result
export interface UploadResult {
  success: boolean
  photo?: Photo
  error?: string
  progress?: number
}

// Image compression options
interface CompressionOptions {
  maxWidth: number
  maxHeight: number
  quality: number
  format: 'image/jpeg' | 'image/webp'
}

/**
 * PHOTO SHARING & STORAGE SERVICE
 * 
 * This service handles all photo operations with Supabase storage:
 * - Photo upload with compression
 * - Image optimization and thumbnails
 * - Storage bucket management
 * - Photo metadata and organization
 * - Gallery display and sharing
 * 
 * Simple explanation: Like having Instagram for your trip photos
 */

export const photoService = {
  /**
   * UPLOAD PHOTO TO SUPABASE STORAGE
   * 
   * This function handles the complete photo upload process.
   * 
   * Simple explanation: Like posting a photo to a shared album
   */
  async uploadPhoto(uploadData: UploadPhotoData): Promise<UploadResult> {
    try {
      const supabase = createClient()

      // Make sure user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { success: false, error: 'You must be logged in to upload photos' }
      }

      // Check if user is a trip participant
      const { data: participant } = await supabase
        .from('trip_participants')
        .select('id, status')
        .eq('trip_id', uploadData.tripId)
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .single()

      if (!participant) {
        return { success: false, error: 'Only trip participants can upload photos' }
      }

      // Validate file
      const validation = this.validateFile(uploadData.file)
      if (!validation.isValid) {
        return { success: false, error: validation.error }
      }

      // Report initial progress
      uploadData.onProgress?.(0)

      // Compress and optimize image
      const { compressedFile, dimensions } = await this.compressImage(uploadData.file)
      uploadData.onProgress?.(20)

      // Generate unique file path
      const fileExtension = this.getFileExtension(compressedFile.name)
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`
      const filePath = `trips/${uploadData.tripId}/photos/${fileName}`

      // Upload to Supabase storage
      const { data: uploadResult, error: uploadError } = await supabase.storage
        .from('photos') // Make sure this bucket exists in Supabase
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        return { success: false, error: 'Failed to upload photo to storage' }
      }

      uploadData.onProgress?.(60)

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath)

      // Create thumbnail
      const thumbnailFile = await this.createThumbnail(compressedFile)
      const thumbnailPath = `trips/${uploadData.tripId}/thumbnails/${fileName}`
      
      const { data: thumbnailUpload } = await supabase.storage
        .from('photos')
        .upload(thumbnailPath, thumbnailFile, {
          cacheControl: '3600',
          upsert: false
        })

      const { data: thumbnailUrlData } = supabase.storage
        .from('photos')
        .getPublicUrl(thumbnailPath)

      uploadData.onProgress?.(80)

      // Create photo record in database
      const photoData: PhotoInsert = {
        trip_id: uploadData.tripId,
        uploader_id: user.id,
        file_name: compressedFile.name,
        file_path: filePath,
        file_size: compressedFile.size,
        mime_type: compressedFile.type,
        width: dimensions.width,
        height: dimensions.height,
        caption: uploadData.caption,
        location: uploadData.location,
        taken_at: uploadData.takenAt,
        upload_progress: 100,
        status: 'ready',
        storage_bucket: 'photos',
        public_url: publicUrlData.publicUrl,
        thumbnail_url: thumbnailUrlData.publicUrl,
        metadata: {
          originalFileName: uploadData.file.name,
          originalSize: uploadData.file.size,
          compression: 'applied',
          thumbnailGenerated: !!thumbnailUpload
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data: photo, error: dbError } = await supabase
        .from('photos')
        .insert(photoData)
        .select()
        .single()

      if (dbError) {
        console.error('Database error:', dbError)
        // Clean up storage if database insert failed
        await supabase.storage.from('photos').remove([filePath, thumbnailPath])
        return { success: false, error: 'Failed to save photo metadata' }
      }

      uploadData.onProgress?.(100)

      return { success: true, photo: photo as Photo }
    } catch (error) {
      console.error('Unexpected error uploading photo:', error)
      return { success: false, error: 'Failed to upload photo. Please try again.' }
    }
  },

  /**
   * GET TRIP PHOTOS WITH UPLOADER INFO
   * 
   * This function loads all photos for a trip with uploader information.
   */
  async getTripPhotos(tripId: string): Promise<{ 
    data: PhotoWithUploader[] | null
    error: string | null 
  }> {
    try {
      const supabase = createClient()

      // Make sure user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { data: null, error: 'You must be logged in to view photos' }
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
        return { data: null, error: 'Only trip participants can view photos' }
      }

      // Get all photos for this trip with uploader information
      const { data: photos, error } = await supabase
        .from('photos')
        .select(`
          *,
          uploader:profiles!photos_uploader_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('trip_id', tripId)
        .eq('status', 'ready')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching photos:', error)
        return { data: null, error: error.message }
      }

      return { data: photos as PhotoWithUploader[] || [], error: null }
    } catch (error) {
      console.error('Unexpected error fetching photos:', error)
      return { data: null, error: 'Failed to load photos. Please try again.' }
    }
  },

  /**
   * DELETE PHOTO
   * 
   * This function deletes a photo (only uploader or trip organizer can delete).
   */
  async deletePhoto(photoId: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to delete photos' }
      }

      // Get photo details and check permissions
      const { data: photo } = await supabase
        .from('photos')
        .select(`
          *,
          trip:trips!photos_trip_id_fkey (
            organizer_id
          )
        `)
        .eq('id', photoId)
        .single()

      if (!photo) {
        return { error: 'Photo not found' }
      }

      // Check if user can delete (uploader or trip organizer)
      const canDelete = photo.uploader_id === user.id || 
                       (photo.trip as any)?.organizer_id === user.id

      if (!canDelete) {
        return { error: 'Only the photo uploader or trip organizer can delete photos' }
      }

      // Delete from storage
      const filesToDelete = [photo.file_path]
      if (photo.thumbnail_url) {
        // Extract thumbnail path from URL or construct it
        const thumbnailPath = photo.file_path.replace('/photos/', '/thumbnails/')
        filesToDelete.push(thumbnailPath)
      }

      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove(filesToDelete)

      if (storageError) {
        console.error('Storage deletion error:', storageError)
        // Continue with database deletion even if storage fails
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('photos')
        .delete()
        .eq('id', photoId)

      if (dbError) {
        console.error('Database deletion error:', dbError)
        return { error: dbError.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error deleting photo:', error)
      return { error: 'Failed to delete photo. Please try again.' }
    }
  },

  /**
   * UPDATE PHOTO CAPTION
   * 
   * This function updates photo caption and metadata (uploader only).
   */
  async updatePhotoCaption(photoId: string, caption: string, location?: string): Promise<{ error: string | null }> {
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        return { error: 'You must be logged in to update photos' }
      }

      // Check if user is the uploader
      const { data: photo } = await supabase
        .from('photos')
        .select('uploader_id')
        .eq('id', photoId)
        .single()

      if (!photo || photo.uploader_id !== user.id) {
        return { error: 'Only the photo uploader can edit photo details' }
      }

      // Update the photo
      const { error: updateError } = await supabase
        .from('photos')
        .update({
          caption: caption.trim() || null,
          location: location?.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', photoId)

      if (updateError) {
        console.error('Error updating photo:', updateError)
        return { error: updateError.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Unexpected error updating photo:', error)
      return { error: 'Failed to update photo. Please try again.' }
    }
  },

  /**
   * GET PHOTO STATISTICS
   * 
   * This function calculates photo statistics for a trip.
   */
  async getPhotoStats(tripId: string): Promise<{ 
    data: {
      totalPhotos: number
      totalSize: number
      uploaders: number
      photosThisWeek: number
      averagePhotosPerDay: number
    } | null
    error: string | null 
  }> {
    try {
      const supabase = createClient()

      const { data: photos, error } = await supabase
        .from('photos')
        .select('file_size, uploader_id, created_at')
        .eq('trip_id', tripId)
        .eq('status', 'ready')

      if (error) {
        return { data: null, error: error.message }
      }

      if (!photos) {
        return { data: null, error: 'No photos found' }
      }

      const now = new Date()
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

      const stats = {
        totalPhotos: photos.length,
        totalSize: photos.reduce((sum, photo) => sum + photo.file_size, 0),
        uploaders: new Set(photos.map(photo => photo.uploader_id)).size,
        photosThisWeek: photos.filter(photo => 
          new Date(photo.created_at) >= oneWeekAgo
        ).length,
        averagePhotosPerDay: 0
      }

      // Calculate average photos per day
      if (photos.length > 0) {
        const oldestPhoto = new Date(Math.min(...photos.map(p => new Date(p.created_at).getTime())))
        const daysDiff = Math.max(1, Math.ceil((now.getTime() - oldestPhoto.getTime()) / (24 * 60 * 60 * 1000)))
        stats.averagePhotosPerDay = photos.length / daysDiff
      }

      return { data: stats, error: null }
    } catch (error) {
      console.error('Unexpected error calculating photo stats:', error)
      return { data: null, error: 'Failed to calculate statistics. Please try again.' }
    }
  },

  /**
   * VALIDATE FILE
   * 
   * This function validates if a file is suitable for upload.
   */
  validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size
    if (file.size > FILE_UPLOAD.maxFileSize) {
      const maxSizeMB = FILE_UPLOAD.maxFileSize / (1024 * 1024)
      return { 
        isValid: false, 
        error: `File size exceeds ${maxSizeMB}MB limit` 
      }
    }

    // Check file type
    if (!FILE_UPLOAD.allowedImageTypes.includes(file.type)) {
      return { 
        isValid: false, 
        error: 'Invalid file type. Please use JPEG, PNG, or WebP images' 
      }
    }

    return { isValid: true }
  },

  /**
   * COMPRESS IMAGE
   * 
   * This function compresses images to optimize storage and loading.
   */
  async compressImage(file: File): Promise<{ 
    compressedFile: File 
    dimensions: { width: number; height: number }
  }> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        const maxSize = FILE_UPLOAD.maxImageDimension
        let { width, height } = img

        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height * maxSize) / width
            width = maxSize
          } else {
            width = (width * maxSize) / height
            height = maxSize
          }
        }

        // Set canvas size
        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
              resolve({ compressedFile, dimensions: { width, height } })
            } else {
              reject(new Error('Failed to compress image'))
            }
          },
          'image/jpeg',
          0.8 // 80% quality
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(file)
    })
  },

  /**
   * CREATE THUMBNAIL
   * 
   * This function creates a thumbnail version of the image.
   */
  async createThumbnail(file: File, size: number = 300): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate thumbnail dimensions (square crop)
        const minDimension = Math.min(img.width, img.height)
        const sourceX = (img.width - minDimension) / 2
        const sourceY = (img.height - minDimension) / 2

        canvas.width = size
        canvas.height = size

        // Draw cropped and resized image
        ctx?.drawImage(
          img,
          sourceX, sourceY, minDimension, minDimension,
          0, 0, size, size
        )
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const thumbnailFile = new File([blob], `thumb_${file.name}`, {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
              resolve(thumbnailFile)
            } else {
              reject(new Error('Failed to create thumbnail'))
            }
          },
          'image/jpeg',
          0.7 // 70% quality for thumbnails
        )
      }

      img.onerror = () => reject(new Error('Failed to load image for thumbnail'))
      img.src = URL.createObjectURL(file)
    })
  },

  /**
   * GET FILE EXTENSION
   * 
   * This function extracts the file extension from a filename.
   */
  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || 'jpg'
  },

  /**
   * GET SIGNED UPLOAD URL
   * 
   * This function creates a signed URL for direct uploads (alternative method).
   */
  async getSignedUploadUrl(tripId: string, fileName: string): Promise<{
    data: { signedUrl: string; path: string } | null
    error: string | null
  }> {
    try {
      const supabase = createClient()
      
      const filePath = `trips/${tripId}/photos/${fileName}`
      
      const { data, error } = await supabase.storage
        .from('photos')
        .createSignedUploadUrl(filePath)

      if (error) {
        return { data: null, error: error.message }
      }

      return { 
        data: { 
          signedUrl: data.signedUrl, 
          path: filePath 
        }, 
        error: null 
      }
    } catch (error) {
      console.error('Error creating signed upload URL:', error)
      return { data: null, error: 'Failed to create upload URL' }
    }
  }
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS SERVICE DOES:
 * 
 * photoService.uploadPhoto() - "Upload a photo to the trip album"
 * - Compresses image to save space and improve loading
 * - Creates thumbnail for fast gallery display
 * - Uploads both to Supabase storage
 * - Saves metadata to database
 * - Only trip participants can upload
 * 
 * photoService.getTripPhotos() - "Get all photos for a trip"
 * - Loads photos with uploader information
 * - Only trip participants can view
 * - Sorted by newest first
 * - Includes thumbnails for fast loading
 * 
 * photoService.deletePhoto() - "Remove a photo from the album"
 * - Only uploader or trip organizer can delete
 * - Removes from both storage and database
 * - Cleans up thumbnails too
 * 
 * Photo Upload Process (Simple):
 * 1. User selects photo from device
 * 2. System compresses image to save space
 * 3. Creates thumbnail for gallery view
 * 4. Uploads both to Supabase storage
 * 5. Saves photo info to database
 * 6. Photo appears in trip gallery
 * 
 * Storage Organization:
 * - trips/[tripId]/photos/ - Full-size photos
 * - trips/[tripId]/thumbnails/ - Small preview images
 * - Each photo has unique filename to prevent conflicts
 * - Metadata stored in database for easy searching
 * 
 * It's like having a shared photo album where everyone can add photos
 * and see what others have shared, with automatic optimization!
 */
