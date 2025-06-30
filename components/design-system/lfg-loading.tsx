import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

export function LFGLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading States</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Skeleton Loading */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Skeleton Loading</h3>

          {/* Trip Card Skeleton */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-neutral-600">Trip Card Skeleton</h4>
            <Card className="max-w-sm">
              <CardContent className="p-4 space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Profile Skeleton */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-neutral-600">Profile Skeleton</h4>
            <Card className="max-w-sm">
              <CardContent className="p-6 text-center space-y-4">
                <Skeleton className="h-20 w-20 rounded-full mx-auto" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
                <div className="flex justify-center gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-8 mx-auto" />
                    <Skeleton className="h-3 w-12 mx-auto" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-8 mx-auto" />
                    <Skeleton className="h-3 w-12 mx-auto" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-8 mx-auto" />
                    <Skeleton className="h-3 w-12 mx-auto" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Spinner Loading */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Spinner Loading</h3>
          <div className="flex flex-wrap gap-8">
            <div className="text-center space-y-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
              <p className="text-sm text-neutral-600">Small</p>
            </div>

            <div className="text-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
              <p className="text-sm text-neutral-600">Medium</p>
            </div>

            <div className="text-center space-y-2">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="text-sm text-neutral-600">Large</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Progress Bar</h3>
          <div className="space-y-6 max-w-md">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Trip Planning Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Photo Upload</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Completion</span>
                <span>90%</span>
              </div>
              <Progress value={90} className="h-4" />
            </div>
          </div>
        </div>

        {/* Loading States in Context */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Loading States in Context</h3>

          {/* Loading Button */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-600">Loading Button</h4>
            <button
              disabled
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md opacity-75 cursor-not-allowed"
            >
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Trip...
            </button>
          </div>

          {/* Loading Card */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-600">Loading Overlay</h4>
            <Card className="max-w-sm relative">
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg z-10">
                <div className="text-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                  <p className="text-sm text-neutral-600">Loading trips...</p>
                </div>
              </div>
              <CardContent className="p-4 space-y-4 opacity-50">
                <div className="h-32 bg-neutral-200 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
