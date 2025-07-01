# LFG Travel Platform Design System

## Overview

The LFG Design System is a comprehensive collection of reusable UI components, design tokens, and guidelines that ensure consistency and accessibility across the LFG travel platform.

## 🎨 Design Tokens

### Color Palette

#### Primary Colors (Electric Blue)
- `primary-50` to `primary-900`: Electric blue scale for primary actions and branding
- Main brand color: `primary-500` (#0ea5e9)

#### Secondary Colors (Adventure Orange)  
- `secondary-50` to `secondary-900`: Warm orange/yellow scale for secondary actions
- Main secondary color: `secondary-500` (#eab308)

#### Accent Colors (Success Green)
- `accent-50` to `accent-900`: Fresh green scale for success states and nature themes
- Main accent color: `accent-500` (#22c55e)

#### Semantic Colors
- `danger-500`: #ef4444 (Error states)
- `warning-500`: #f59e0b (Warning states)
- `neutral-50` to `neutral-900`: Comprehensive gray scale

### Typography

#### Font Families
- **Display**: Poppins (headings)
- **Body**: Inter (body text, UI)

#### Scale
- **H1**: 4xl (36px) - Hero headings
- **H2**: 3xl (30px) - Section headings
- **H3**: 2xl (24px) - Subsection headings
- **H4**: xl (20px) - Card titles
- **H5**: lg (18px) - Small headings
- **H6**: base (16px) - Labels
- **Body Large**: lg (18px) - Important text
- **Body**: base (16px) - Default text
- **Body Small**: sm (14px) - Secondary text
- **Caption**: xs (12px) - Metadata

## 🧱 Components

### Foundation Components

#### Buttons (`LFGButtons`)
- **Primary**: Main call-to-action buttons with electric blue background
- **Secondary**: Secondary actions with orange outline
- **Tertiary**: Ghost buttons for subtle actions
- **Danger**: Destructive actions with red styling
- **Accent**: Success actions with green styling

#### Inputs (`LFGInputs`)
- **Text Inputs**: Standard form inputs with icon support
- **Email**: Email-specific inputs with validation styling
- **Password**: Password inputs with show/hide toggle
- **Search**: Search inputs with search icon
- **States**: Normal, focused, error, success, disabled

#### Cards (`LFGCards`)
- **Trip Cards**: Full-featured cards for displaying trips
- **Profile Cards**: User profile cards with stats
- **Notification Cards**: Alert-style cards for notifications
- **Compact Cards**: Minimal cards for lists

### Specialized Components

#### Avatars (`LFGAvatars`)
- **Sizes**: 24px, 32px, 48px, 64px
- **Status Indicators**: Online (green), away (orange), offline (gray)
- **Avatar Groups**: Overlapping avatar stacks
- **Badge Support**: Role badges and verification indicators

#### Badges (`LFGBadges`)
- **Status**: Active, planning, completed, cancelled, featured
- **Verification**: Verified, top-rated, trusted host, premium
- **Count**: Notification counters
- **Category**: Adventure, weekend trip, group travel, etc.
- **Interactive**: Clickable and dismissible badges

#### Navigation (`LFGNavigation`)
- **Tab Navigation**: Horizontal tab switching
- **Mobile Bottom Navigation**: Mobile-first bottom nav
- **Breadcrumbs**: Hierarchical navigation
- **Pill Navigation**: Filter-style navigation
- **Sidebar Navigation**: Vertical sidebar menu

#### Loading (`LFGLoading`)
- **Skeletons**: Trip card, profile card, and generic skeletons
- **Spinners**: Small, medium, and large loading spinners
- **Progress Bars**: Horizontal progress indicators
- **Loading Overlays**: Full-component loading states

## 🚀 Usage

### Accessing the Design System

Visit `/design-system` in your development environment to see all components in action.

### Importing Components

\`\`\`typescript
// Individual components
import { ColorPalette, TypographyScale, LFGButtons } from '@/components/design-system'

// UI primitives
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
\`\`\`

### Color Usage

\`\`\`typescript
// Tailwind classes
className="bg-primary text-white"          // Primary button
className="text-secondary"                 // Secondary text
className="border-accent"                  // Success border
className="bg-danger hover:bg-danger-600" // Danger state
\`\`\`

### Typography Usage

\`\`\`typescript
// Heading styles
className="text-4xl font-bold tracking-tight lg:text-5xl" // H1
className="text-2xl font-semibold"                        // H3

// Body styles  
className="text-lg leading-7"     // Body large
className="text-base leading-6"   // Body
className="text-sm leading-5"     // Body small
\`\`\`

## 🎯 Design Principles

### 1. Consistency
- All components follow the same design patterns
- Consistent spacing, typography, and color usage
- Standardized interaction patterns

### 2. Accessibility
- WCAG 2.1 AA compliant color contrast
- Keyboard navigation support
- Screen reader friendly markup
- Focus management

### 3. Mobile-First
- Responsive design by default
- Touch-friendly interaction targets (min 44px)
- Progressive enhancement for larger screens

### 4. Travel-Focused
- Adventure-inspired color palette
- Travel-relevant iconography
- Social interaction patterns
- Location and time-aware components

## 📱 Responsive Breakpoints

\`\`\`css
sm: 640px   // Small tablets and large phones
md: 768px   // Tablets
lg: 1024px  // Small laptops
xl: 1280px  // Large laptops
2xl: 1536px // Large screens
\`\`\`

## 🔧 Development Guidelines

### Component Structure
- Use TypeScript for all components
- Include proper prop types and interfaces
- Export components from index files
- Follow naming conventions (PascalCase for components)

### Styling
- Use Tailwind CSS classes for styling
- Leverage design tokens (colors, spacing, typography)
- Maintain consistent hover and focus states
- Use semantic color names (primary, secondary, accent)

### Testing
- Include accessibility testing
- Test responsive behavior
- Verify keyboard navigation
- Test with assistive technologies

## 📋 Component Checklist

When creating new components:

- [ ] Follows design token system
- [ ] Responsive design implemented
- [ ] Accessibility requirements met
- [ ] TypeScript types defined
- [ ] Consistent with existing patterns
- [ ] Loading states included
- [ ] Error states handled
- [ ] Documentation updated

## 🚧 Future Enhancements

### Planned Components
- Form validation components
- Data visualization components
- Map integration components
- Media gallery components
- Chat/messaging components

### Planned Features
- Dark mode support
- Enhanced animation library
- Advanced accessibility features
- Internationalization support

## 🤝 Contributing

When contributing to the design system:

1. Follow existing patterns and conventions
2. Update documentation for any changes
3. Include accessibility considerations
4. Test across different screen sizes
5. Verify component isolation (no external dependencies)

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Component Patterns](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)

---

**Built with ❤️ for the LFG Travel Community**
