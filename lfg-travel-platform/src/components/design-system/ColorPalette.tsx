import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

const colorGroups = [
  {
    name: "Primary - Electric Blue",
    colors: [
      { name: "primary-50", value: "#E6F2FF", hex: "#E6F2FF" },
      { name: "primary-100", value: "#CCE5FF", hex: "#CCE5FF" },
      { name: "primary-200", value: "#99CCFF", hex: "#99CCFF" },
      { name: "primary-300", value: "#66B2FF", hex: "#66B2FF" },
      { name: "primary-400", value: "#3399FF", hex: "#3399FF" },
      { name: "primary-500", value: "#0066FF", hex: "#0066FF" },
      { name: "primary-600", value: "#0052CC", hex: "#0052CC" },
      { name: "primary-700", value: "#003D99", hex: "#003D99" },
      { name: "primary-800", value: "#002966", hex: "#002966" },
      { name: "primary-900", value: "#001433", hex: "#001433" },
    ],
  },
  {
    name: "Secondary - Adventure Orange",
    colors: [
      { name: "secondary-50", value: "#FFF4F0", hex: "#FFF4F0" },
      { name: "secondary-100", value: "#FFE8E0", hex: "#FFE8E0" },
      { name: "secondary-200", value: "#FFD1C2", hex: "#FFD1C2" },
      { name: "secondary-300", value: "#FFBA9D", hex: "#FFBA9D" },
      { name: "secondary-400", value: "#FF9066", hex: "#FF9066" },
      { name: "secondary-500", value: "#FF6B35", hex: "#FF6B35" },
      { name: "secondary-600", value: "#E5522A", hex: "#E5522A" },
      { name: "secondary-700", value: "#CC3D1F", hex: "#CC3D1F" },
      { name: "secondary-800", value: "#B32914", hex: "#B32914" },
      { name: "secondary-900", value: "#99190A", hex: "#99190A" },
    ],
  },
  {
    name: "Accent - Success Green",
    colors: [
      { name: "accent-50", value: "#ECFDF5", hex: "#ECFDF5" },
      { name: "accent-100", value: "#D1FAE5", hex: "#D1FAE5" },
      { name: "accent-200", value: "#A7F3D0", hex: "#A7F3D0" },
      { name: "accent-300", value: "#6EE7B7", hex: "#6EE7B7" },
      { name: "accent-400", value: "#34D399", hex: "#34D399" },
      { name: "accent-500", value: "#10B981", hex: "#10B981" },
      { name: "accent-600", value: "#059669", hex: "#059669" },
      { name: "accent-700", value: "#047857", hex: "#047857" },
      { name: "accent-800", value: "#065F46", hex: "#065F46" },
      { name: "accent-900", value: "#064E3B", hex: "#064E3B" },
    ],
  },
  {
    name: "Warning - Amber",
    colors: [{ name: "warning-500", value: "#F59E0B", hex: "#F59E0B" }],
  },
  {
    name: "Danger - Red",
    colors: [{ name: "danger-500", value: "#EF4444", hex: "#EF4444" }],
  },
  {
    name: "Neutral - Enterprise Gray",
    colors: [
      { name: "neutral-50", value: "#F9FAFB", hex: "#F9FAFB" },
      { name: "neutral-100", value: "#F3F4F6", hex: "#F3F4F6" },
      { name: "neutral-200", value: "#E5E7EB", hex: "#E5E7EB" },
      { name: "neutral-300", value: "#D1D5DB", hex: "#D1D5DB" },
      { name: "neutral-400", value: "#9CA3AF", hex: "#9CA3AF" },
      { name: "neutral-500", value: "#6B7280", hex: "#6B7280" },
      { name: "neutral-600", value: "#4B5563", hex: "#4B5563" },
      { name: "neutral-700", value: "#374151", hex: "#374151" },
      { name: "neutral-800", value: "#1F2937", hex: "#1F2937" },
      { name: "neutral-900", value: "#111827", hex: "#111827" },
    ],
  },
]

export function ColorPalette() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Palette</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {colorGroups.map((group) => (
          <div key={group.name} className="space-y-4">
            <h3 className="text-lg font-semibold">{group.name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
              {group.colors.map((color) => (
                <div key={color.name} className="space-y-2">
                  <div 
                    className="w-full h-16 rounded-lg border shadow-sm cursor-pointer hover:scale-105 transition-transform" 
                    style={{ backgroundColor: color.value }}
                    onClick={() => navigator.clipboard.writeText(color.hex)}
                    title={`Click to copy ${color.hex}`}
                  />
                  <div className="text-xs space-y-1">
                    <div className="font-medium">{color.name}</div>
                    <div className="text-neutral-600">{color.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}