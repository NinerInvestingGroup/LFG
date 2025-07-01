import { 
  ColorPalette, 
  TypographyScale, 
  LFGButtons, 
  LFGAvatars, 
  LFGBadges, 
  LFGCards, 
  LFGInputs, 
  LFGLoading, 
  LFGNavigation 
} from '@/components/design-system'

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-neutral-900">LFG Design System</h1>
            <p className="text-lg text-neutral-600">
              Complete UI component library and style guide for the LFG travel platform
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {/* Introduction */}
          <div className="text-center space-y-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-base text-neutral-700 leading-relaxed">
                This design system provides a comprehensive set of components, styles, and guidelines 
                for building consistent and accessible user interfaces across the LFG platform. 
                All components follow our brand guidelines and accessibility standards.
              </p>
            </div>
          </div>

          {/* Color Palette */}
          <section className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-neutral-900">Foundation</h2>
              <p className="text-neutral-600 mt-2">Core design tokens and fundamentals</p>
            </div>
            <div className="grid gap-8">
              <ColorPalette />
              <TypographyScale />
            </div>
          </section>

          {/* Components */}
          <section className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-neutral-900">Components</h2>
              <p className="text-neutral-600 mt-2">Reusable UI components for the LFG platform</p>
            </div>
            <div className="grid gap-8">
              <LFGButtons />
              <LFGInputs />
              <LFGAvatars />
              <LFGBadges />
              <LFGCards />
              <LFGNavigation />
              <LFGLoading />
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="bg-white rounded-lg p-8 border border-neutral-200">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Usage Guidelines</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-800">Implementation</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li>• Import components from <code className="bg-neutral-100 px-2 py-1 rounded text-sm">@/components/ui</code></li>
                    <li>• Use Tailwind CSS classes for styling</li>
                    <li>• Follow the established color palette</li>
                    <li>• Maintain consistent spacing and typography</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-800">Accessibility</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li>• Ensure sufficient color contrast</li>
                    <li>• Use semantic HTML elements</li>
                    <li>• Provide keyboard navigation</li>
                    <li>• Include ARIA labels where needed</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Development Notes</h3>
                <p className="text-primary-800">
                  This design system is built with TypeScript, Tailwind CSS, and follows Next.js 14 best practices. 
                  Components are designed to be fully responsive and accessible out of the box.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
