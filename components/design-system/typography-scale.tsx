import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { JSX } from "react"

const typographyElements = [
  {
    name: "Heading 1",
    element: "h1",
    className: "text-4xl font-bold tracking-tight lg:text-5xl",
    sample: "Plan Your Next Adventure",
  },
  {
    name: "Heading 2",
    element: "h2",
    className: "text-3xl font-semibold tracking-tight",
    sample: "Discover Amazing Places",
  },
  { name: "Heading 3", element: "h3", className: "text-2xl font-semibold", sample: "Travel with Friends" },
  { name: "Heading 4", element: "h4", className: "text-xl font-semibold", sample: "Create Memories" },
  { name: "Heading 5", element: "h5", className: "text-lg font-semibold", sample: "Share Experiences" },
  { name: "Heading 6", element: "h6", className: "text-base font-semibold", sample: "Connect & Explore" },
  {
    name: "Body Large",
    element: "p",
    className: "text-lg leading-7",
    sample:
      "Join thousands of travelers who use LFG to coordinate amazing trips with friends and discover new destinations together.",
  },
  {
    name: "Body",
    element: "p",
    className: "text-base leading-6",
    sample: "Plan, coordinate, and share your travel experiences with the LFG community.",
  },
  {
    name: "Body Small",
    element: "p",
    className: "text-sm leading-5",
    sample: "Connect with fellow travelers and create unforgettable memories.",
  },
  { name: "Caption", element: "span", className: "text-xs text-neutral-600", sample: "Last updated 2 hours ago" },
]

export function TypographyScale() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Typography Scale</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {typographyElements.map((item) => {
          const Element = item.element as keyof JSX.IntrinsicElements
          return (
            <div key={item.name} className="space-y-2">
              <div className="text-sm font-medium text-neutral-600 flex items-center gap-2">
                {item.name}
                <code className="text-xs bg-neutral-100 px-2 py-1 rounded">{item.className}</code>
              </div>
              <Element className={item.className}>{item.sample}</Element>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
