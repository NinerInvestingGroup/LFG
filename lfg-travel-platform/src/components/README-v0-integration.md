# v0.dev Component Integration Guide for LFG Travel Platform

## Overview
This guide explains how to properly integrate v0.dev generated components into your LFG Travel Platform project.

## Project Structure for v0.dev Components

### Where to Place Components

1. **UI Components (Base Components)**
   - Location: `src/components/ui/`
   - Examples: Button, Input, Dialog, Select, Badge, Avatar
   - Purpose: Reusable base components that other components depend on

2. **Feature Components (Complex Components)**
   - Location: `src/components/[category]/`
   - Categories:
     - `cards/` - Complex display components (CommunityFeed, TripCard)
     - `forms/` - Form-related components (TripForm, ProfileForm)
     - `navigation/` - Navigation components (Header, Sidebar)
     - `modals/` - Modal and overlay components

3. **Page-Specific Components**
   - Location: `src/app/[page]/components/`
   - Purpose: Components that are only used on specific pages

## Integration Steps

### 1. Install Required Dependencies
Your project already has these common v0.dev dependencies:
- `@radix-ui/react-slot`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-select`
- `@radix-ui/react-tabs`
- `@radix-ui/react-scroll-area`

### 2. Update Imports for Your Project Structure

When integrating a v0.dev component, update these imports:

\`\`\`typescript
// Change v0.dev imports from:
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// To your project structure:
import { cn } from "@/shared/utils/cn"
import { Button } from "@/components/ui/Button"
\`\`\`

### 3. TypeScript Integration

Add proper TypeScript types:

\`\`\`typescript
// Add to your component props
interface YourComponentProps {
  // Add specific props for your use case
  className?: string;
  // Integration with your Supabase types
  user?: Profile;
  trip?: Trip;
}
\`\`\`

### 4. Supabase Integration

Integrate with your existing services:

\`\`\`typescript
import { useProfile } from '@/shared/hooks/useProfile'
import { useTrips } from '@/shared/hooks/useTrips'
import { tripService } from '@/shared/services/tripService'
\`\`\`

## Component Placement Examples

### Example 1: Design System Component (UI Library)
If the component is a reusable UI element:
- Place in: `src/components/ui/DesignSystemComponent.tsx`
- Export from: `src/components/ui/index.ts`

### Example 2: Travel-Specific Feature Component
If the component is travel-related functionality:
- Place in: `src/components/cards/TravelFeatureComponent.tsx` or appropriate category
- Import your types: `import { Trip, Profile } from '@/shared/types'`

### Example 3: Dashboard Widget
If the component is a dashboard widget:
- Place in: `src/app/dashboard/components/DashboardWidget.tsx`

## CSS and Styling

Your project is already configured with:
- ✅ Tailwind CSS with proper CSS variables
- ✅ LFG brand colors (primary blue, secondary yellow, accent green)
- ✅ Dark mode support
- ✅ All necessary CSS variables for shadcn/ui components

## Testing Integration

Create a test page to verify the component works:

\`\`\`typescript
// src/app/test-v0-component/page.tsx
import YourV0Component from '@/components/[category]/YourV0Component'

export default function TestV0Component() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Testing v0.dev Component</h1>
      <YourV0Component />
    </div>
  )
}
\`\`\`

## Common Issues and Solutions

### 1. Import Path Issues
- Update all imports to match your project structure
- Use `@/` prefix for absolute imports
- Check `tsconfig.json` paths configuration

### 2. Missing Dependencies
- Check if component uses any Radix UI primitives not yet installed
- Install missing dependencies: `npm install @radix-ui/react-[component-name]`

### 3. TypeScript Errors
- Add proper TypeScript interfaces
- Ensure all props are properly typed
- Use your existing type definitions from `src/shared/types/`

### 4. Styling Issues
- Verify CSS variables are defined in `globals.css`
- Check that Tailwind classes are properly applied
- Ensure component uses LFG brand colors

## Best Practices

1. **Maintain Consistency**: Use existing component patterns from your project
2. **TypeScript First**: Always add proper types and interfaces
3. **Reusability**: Place components in appropriate folders for reuse
4. **Testing**: Always test components in isolation first
5. **Documentation**: Add JSDoc comments for complex components
6. **Accessibility**: Ensure components maintain accessibility standards

## Integration Checklist

- [ ] Component placed in correct folder
- [ ] All imports updated to project structure
- [ ] TypeScript types added
- [ ] Supabase integration (if needed)
- [ ] CSS variables and styling verified
- [ ] Component tested in isolation
- [ ] Added to appropriate index.ts file for exports
- [ ] Documentation added (if complex component)

## Next Steps

1. Provide the v0.dev component code
2. Determine the appropriate placement based on component functionality
3. Update imports and add TypeScript types
4. Test the component integration
5. Add any missing dependencies if needed
