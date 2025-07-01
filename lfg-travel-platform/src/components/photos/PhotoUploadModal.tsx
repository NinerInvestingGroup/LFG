'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import { Progress } from '@/components/ui/Progress'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  X, 
  AlertCircle,
  CheckCircle2,
  MapPin,
  Calendar
} from 'lucide-react'
import { usePhotoValidation } from '@/hooks/usePhotos'
import { UploadPhotoData, UploadResult } from '@/services/photoService'

interface PhotoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (data: UploadPhotoData) => Promise<UploadResult>
  loading?: boolean
  progress?: number
  error?: string | null
}

/**
 * PHOTO UPLOAD MODAL COMPONENT
 * 
 * This modal allows users to upload photos with:
 * - Drag and drop interface
 * - Photo preview
 * - Caption and location metadata
 * - Upload progress tracking
 * - File validation
 * 
 * Simple explanation: Like having an Instagram-style photo upload form
 */
export function PhotoUploadModal({ 
  isOpen, 
  onClose, 
  onUpload, 
  loading = false,
  progress = 0,
  error = null
}: PhotoUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [takenAt, setTakenAt] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { validateFile } = usePhotoValidation()

  const handleFileSelect = useCallback((file: File) => {
    // Validate file
    const validation = validateFile(file)
    if (!validation.isValid) {
      setValidationErrors({ file: validation.error || 'Invalid file' })
      return
    }

    setValidationErrors({})
    setSelectedFile(file)
    
    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }, [validateFile])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setValidationErrors({ file: 'Please select a photo to upload' })
      return
    }

    // Clear previous errors
    setValidationErrors({})

    try {
      const result = await onUpload({
        tripId: '', // Will be set by parent
        file: selectedFile,
        caption: caption.trim() || undefined,
        location: location.trim() || undefined,
        takenAt: takenAt || undefined
      })

      if (result.success) {
        handleClose()
      }
    } catch (err) {
      console.error('Upload error:', err)
    }
  }, [selectedFile, caption, location, takenAt, onUpload])

  const handleClose = useCallback(() => {
    if (loading) return // Don't close while uploading
    
    // Clean up
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    
    setSelectedFile(null)
    setPreviewUrl(null)
    setCaption('')
    setLocation('')
    setTakenAt('')
    setValidationErrors({})
    setIsDragOver(false)
    
    onClose()
  }, [loading, previewUrl, onClose])

  const removeSelectedFile = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    setValidationErrors({})
  }, [previewUrl])

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const formatFileSize = useCallback((bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-blue-600" />
            Upload Photo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Global Error */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* File Upload Area */}
          <div className="space-y-3">
            <Label>Photo *</Label>
            
            {!selectedFile ? (
              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                  ${isDragOver 
                    ? 'border-blue-500 bg-blue-50' 
                    : validationErrors.file 
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileDialog}
              >
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop your photo here
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  or click to browse your files
                </p>
                <div className="text-xs text-gray-500">
                  Supports JPEG, PNG, WebP up to 5MB
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={previewUrl!}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={removeSelectedFile}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <strong>{selectedFile.name}</strong> ({formatFileSize(selectedFile.size)})
                </div>
              </div>
            )}

            {validationErrors.file && (
              <p className="text-sm text-red-600">{validationErrors.file}</p>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          {/* Upload Progress */}
          {loading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Uploading...</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-gray-500 space-y-1">
                {progress < 20 && <p>📸 Preparing your photo...</p>}
                {progress >= 20 && progress < 60 && <p>🔄 Compressing and optimizing...</p>}
                {progress >= 60 && progress < 80 && <p>☁️ Uploading to storage...</p>}
                {progress >= 80 && progress < 100 && <p>💾 Saving to gallery...</p>}
                {progress >= 100 && <p className="text-green-600">✅ Upload complete!</p>}
              </div>
            </div>
          )}

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="What's happening in this photo?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className={validationErrors.caption ? 'border-red-500' : ''}
              maxLength={500}
              rows={3}
              disabled={loading}
            />
            {validationErrors.caption && (
              <p className="text-sm text-red-600">{validationErrors.caption}</p>
            )}
            <p className="text-xs text-gray-500">
              {caption.length}/500 characters
            </p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                type="text"
                placeholder="Where was this taken?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`pl-10 ${validationErrors.location ? 'border-red-500' : ''}`}
                maxLength={100}
                disabled={loading}
              />
            </div>
            {validationErrors.location && (
              <p className="text-sm text-red-600">{validationErrors.location}</p>
            )}
          </div>

          {/* Date Taken */}
          <div className="space-y-2">
            <Label htmlFor="takenAt">Date Taken</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="takenAt"
                type="date"
                value={takenAt}
                onChange={(e) => setTakenAt(e.target.value)}
                className={`pl-10 ${validationErrors.takenAt ? 'border-red-500' : ''}`}
                disabled={loading}
              />
            </div>
            {validationErrors.takenAt && (
              <p className="text-sm text-red-600">{validationErrors.takenAt}</p>
            )}
          </div>

          {/* Info Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 space-y-1">
                <p className="font-medium">Photo will be automatically optimized</p>
                <ul className="text-xs space-y-0.5">
                  <li>• Compressed for faster loading</li>
                  <li>• Thumbnail generated for gallery view</li>
                  <li>• Visible to all trip participants</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading || !selectedFile}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </div>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/**
 * SIMPLE EXPLANATION OF WHAT THIS COMPONENT DOES:
 * 
 * PhotoUploadModal is like having a professional photo upload form:
 * 
 * 1. FILE SELECTION - Easy ways to choose photos:
 *    - Drag and drop interface
 *    - Click to browse files
 *    - File validation and preview
 *    - File size and type checking
 * 
 * 2. PHOTO PREVIEW - See what you're uploading:
 *    - Image preview with ability to remove
 *    - File name and size display
 *    - Thumbnail generation preview
 * 
 * 3. METADATA INPUT - Add photo information:
 *    - Caption for describing the photo
 *    - Location where photo was taken
 *    - Date when photo was taken
 *    - Character limits and validation
 * 
 * 4. UPLOAD PROGRESS - Real-time feedback:
 *    - Progress bar showing upload status
 *    - Step-by-step progress messages
 *    - Visual feedback during processing
 *    - Success confirmation
 * 
 * 5. FORM VALIDATION - Catch mistakes:
 *    - File type and size validation
 *    - Required field checking
 *    - Real-time error display
 *    - Prevents invalid uploads
 * 
 * Key Features:
 * - Professional drag-and-drop interface
 * - Real-time upload progress tracking
 * - Image preview before upload
 * - Automatic file validation
 * - Loading states and error handling
 * - Mobile-responsive design
 * 
 * User Experience:
 * - Intuitive photo selection
 * - Clear visual feedback
 * - Helpful progress messages
 * - Professional upload flow
 * - Error prevention and guidance
 * 
 * It's like having Instagram's photo upload experience integrated
 * into your travel platform!
 */