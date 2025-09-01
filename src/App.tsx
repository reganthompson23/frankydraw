import { useEffect, useRef, useState } from 'react'

const COLORS = [
  '#FF0000', // Red
  '#0000FF', // Blue
  '#00FF00', // Green
  '#FFFF00', // Yellow
  '#FFC0CB', // Pink
  '#800080', // Purple
  '#FFA500', // Orange
]

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)
  const lastDrawTime = useRef(Date.now())
  const pixelCount = useRef(0)

  useEffect(() => {
    if (!canvasRef.current) return

    // Prevent default touch actions
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    
    // Set up canvas
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * window.devicePixelRatio
    canvas.height = window.innerHeight * window.devicePixelRatio
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const context = canvas.getContext('2d')
    if (context) {
      context.scale(window.devicePixelRatio, window.devicePixelRatio)
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.lineWidth = 5
      context.strokeStyle = COLORS[colorIndex]
      contextRef.current = context
    }

    // Fill canvas with white
    if (context) {
      context.fillStyle = '#FFFFFF'
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas || !contextRef.current) return

    const rect = canvas.getBoundingClientRect()
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top
    contextRef.current.beginPath()
    contextRef.current.moveTo(x, y)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    if (!isDrawing || !contextRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top
    
    contextRef.current.lineTo(x, y)
    contextRef.current.stroke()
    pixelCount.current += 1

    // Change color every 30 seconds or every 1000 pixels drawn
    const now = Date.now()
    if (now - lastDrawTime.current > 30000 || pixelCount.current > 1000) {
      setColorIndex((prev) => (prev + 1) % COLORS.length)
      lastDrawTime.current = now
      pixelCount.current = 0
      if (contextRef.current) {
        contextRef.current.strokeStyle = COLORS[(colorIndex + 1) % COLORS.length]
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    if (contextRef.current) {
      contextRef.current.closePath()
    }
  }

  return (
    <canvas
      ref={canvasRef}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'white'
      }}
    />
  )
}

export default App