const colors = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
]

export default function ColorPalette() {
  return (
    <div className="my-8 grid grid-cols-6 gap-4 rounded bg-black p-4">
      {colors.map((color) => (
        <div key={color} className={`h-5 rounded-lg text-xs font-bold bg-${color}`}>
          {color}
        </div>
      ))}
    </div>
  )
}
