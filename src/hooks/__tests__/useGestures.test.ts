import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSwipe } from '../useSwipe'
import { usePinchZoom } from '../usePinchZoom'
import { useLongPress } from '../useLongPress'
import { useGestures } from '../useGestures'

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeTouch(x: number, y: number): Touch {
  return { clientX: x, clientY: y, identifier: 0 } as Touch
}

function fireTouchEvent(el: HTMLElement, type: string, touches: Touch[], changedTouches = touches) {
  const event = new TouchEvent(type, {
    bubbles: true,
    cancelable: true,
    touches: touches as unknown as TouchList,
    changedTouches: changedTouches as unknown as TouchList,
  })
  el.dispatchEvent(event)
}

// ── useSwipe ──────────────────────────────────────────────────────────────────

describe('useSwipe', () => {
  it('calls onSwipeLeft on a left swipe', () => {
    const onSwipeLeft = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeLeft }))
    const el = document.createElement('div')
    act(() => result.current(el))

    fireTouchEvent(el, 'touchstart', [makeTouch(200, 100)])
    fireTouchEvent(el, 'touchend', [makeTouch(100, 100)])

    expect(onSwipeLeft).toHaveBeenCalledTimes(1)
  })

  it('calls onSwipeRight on a right swipe', () => {
    const onSwipeRight = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeRight }))
    const el = document.createElement('div')
    act(() => result.current(el))

    fireTouchEvent(el, 'touchstart', [makeTouch(100, 100)])
    fireTouchEvent(el, 'touchend', [makeTouch(200, 100)])

    expect(onSwipeRight).toHaveBeenCalledTimes(1)
  })

  it('calls onSwipeUp on an upward swipe', () => {
    const onSwipeUp = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeUp }))
    const el = document.createElement('div')
    act(() => result.current(el))

    fireTouchEvent(el, 'touchstart', [makeTouch(100, 200)])
    fireTouchEvent(el, 'touchend', [makeTouch(100, 100)])

    expect(onSwipeUp).toHaveBeenCalledTimes(1)
  })

  it('calls onSwipeDown on a downward swipe', () => {
    const onSwipeDown = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeDown }))
    const el = document.createElement('div')
    act(() => result.current(el))

    fireTouchEvent(el, 'touchstart', [makeTouch(100, 100)])
    fireTouchEvent(el, 'touchend', [makeTouch(100, 200)])

    expect(onSwipeDown).toHaveBeenCalledTimes(1)
  })

  it('does not fire when distance is below threshold', () => {
    const onSwipeLeft = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeLeft, threshold: 50 }))
    const el = document.createElement('div')
    act(() => result.current(el))

    fireTouchEvent(el, 'touchstart', [makeTouch(100, 100)])
    fireTouchEvent(el, 'touchend', [makeTouch(80, 100)]) // only 20px

    expect(onSwipeLeft).not.toHaveBeenCalled()
  })

  it('ignores multi-touch', () => {
    const onSwipeLeft = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeLeft }))
    const el = document.createElement('div')
    act(() => result.current(el))

    const two = [makeTouch(200, 100), makeTouch(150, 100)]
    fireTouchEvent(el, 'touchstart', two)
    fireTouchEvent(el, 'touchend', two, [makeTouch(100, 100)])

    expect(onSwipeLeft).not.toHaveBeenCalled()
  })

  it('removes listeners when ref is set to null', () => {
    const onSwipeLeft = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipeLeft }))
    const el = document.createElement('div')
    act(() => result.current(el))
    act(() => result.current(null)) // detach

    fireTouchEvent(el, 'touchstart', [makeTouch(200, 100)])
    fireTouchEvent(el, 'touchend', [makeTouch(100, 100)])

    expect(onSwipeLeft).not.toHaveBeenCalled()
  })
})

// ── usePinchZoom ──────────────────────────────────────────────────────────────

describe('usePinchZoom', () => {
  it('calls onPinchStart when two fingers touch', () => {
    const onPinchStart = vi.fn()
    const { result } = renderHook(() => usePinchZoom({ onPinchStart }))
    const el = document.createElement('div')
    act(() => result.current.ref(el))

    fireTouchEvent(el, 'touchstart', [makeTouch(100, 100), makeTouch(200, 100)])

    expect(onPinchStart).toHaveBeenCalledTimes(1)
  })

  it('calls onPinchChange during move', () => {
    const onPinchChange = vi.fn()
    const { result } = renderHook(() => usePinchZoom({ onPinchChange }))
    const el = document.createElement('div')
    act(() => result.current.ref(el))

    // Initial distance: 100px
    fireTouchEvent(el, 'touchstart', [makeTouch(50, 100), makeTouch(150, 100)])
    // Spread to 200px → scale should increase
    fireTouchEvent(el, 'touchmove', [makeTouch(0, 100), makeTouch(200, 100)])

    expect(onPinchChange).toHaveBeenCalledTimes(1)
    const [scale] = onPinchChange.mock.calls[0]
    expect(scale).toBeGreaterThan(1)
  })

  it('calls onPinchEnd when a finger lifts', () => {
    const onPinchEnd = vi.fn()
    const { result } = renderHook(() => usePinchZoom({ onPinchEnd }))
    const el = document.createElement('div')
    act(() => result.current.ref(el))

    fireTouchEvent(el, 'touchstart', [makeTouch(50, 100), makeTouch(150, 100)])
    fireTouchEvent(el, 'touchend', [makeTouch(50, 100)], [makeTouch(150, 100)])

    expect(onPinchEnd).toHaveBeenCalledTimes(1)
  })

  it('clamps scale to maxScale', () => {
    const onPinchChange = vi.fn()
    const { result } = renderHook(() => usePinchZoom({ onPinchChange, maxScale: 2 }))
    const el = document.createElement('div')
    act(() => result.current.ref(el))

    // Initial 10px, spread to 1000px → raw scale 100× but clamped to 2
    fireTouchEvent(el, 'touchstart', [makeTouch(0, 100), makeTouch(10, 100)])
    fireTouchEvent(el, 'touchmove', [makeTouch(0, 100), makeTouch(1000, 100)])

    const [scale] = onPinchChange.mock.calls[0]
    expect(scale).toBe(2)
  })

  it('exposes commitScale', () => {
    const { result } = renderHook(() => usePinchZoom({}))
    expect(typeof result.current.commitScale).toBe('function')
  })
})

// ── useLongPress ──────────────────────────────────────────────────────────────

describe('useLongPress', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('fires onLongPress after the duration', () => {
    const onLongPress = vi.fn()
    const { result } = renderHook(() => useLongPress({ onLongPress, duration: 500 }))
    const el = document.createElement('div')

    const event = new MouseEvent('mousedown', { bubbles: true, clientX: 0, clientY: 0 })
    act(() => result.current.onMouseDown(event as unknown as React.MouseEvent))
    act(() => vi.advanceTimersByTime(500))

    expect(onLongPress).toHaveBeenCalledTimes(1)
  })

  it('does not fire if released before duration', () => {
    const onLongPress = vi.fn()
    const onPress = vi.fn()
    const { result } = renderHook(() => useLongPress({ onLongPress, onPress, duration: 500 }))

    const down = new MouseEvent('mousedown', { bubbles: true, clientX: 0, clientY: 0 })
    const up = new MouseEvent('mouseup', { bubbles: true, clientX: 0, clientY: 0 })
    act(() => result.current.onMouseDown(down as unknown as React.MouseEvent))
    act(() => vi.advanceTimersByTime(200))
    act(() => result.current.onMouseUp(up as unknown as React.MouseEvent))

    expect(onLongPress).not.toHaveBeenCalled()
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('cancels if pointer moves beyond threshold', () => {
    const onLongPress = vi.fn()
    const { result } = renderHook(() => useLongPress({ onLongPress, duration: 500, moveThreshold: 10 }))

    const down = new MouseEvent('mousedown', { bubbles: true, clientX: 0, clientY: 0 })
    const move = new MouseEvent('mousemove', { bubbles: true, clientX: 20, clientY: 0 })
    act(() => result.current.onMouseDown(down as unknown as React.MouseEvent))
    act(() => result.current.onMouseMove(move as unknown as React.MouseEvent))
    act(() => vi.advanceTimersByTime(500))

    expect(onLongPress).not.toHaveBeenCalled()
  })
})

// ── useGestures ───────────────────────────────────────────────────────────────

describe('useGestures', () => {
  it('returns ref, handlers, and commitScale', () => {
    const { result } = renderHook(() => useGestures({}))
    expect(typeof result.current.ref).toBe('function')
    expect(typeof result.current.handlers).toBe('object')
    expect(typeof result.current.commitScale).toBe('function')
  })

  it('swipe and long-press both work on the same element', () => {
    const onSwipeLeft = vi.fn()
    const onLongPress = vi.fn()
    vi.useFakeTimers()

    const { result } = renderHook(() =>
      useGestures({
        swipe: { onSwipeLeft },
        longPress: { onLongPress, duration: 500 },
      })
    )
    const el = document.createElement('div')
    act(() => result.current.ref(el))

    // swipe
    fireTouchEvent(el, 'touchstart', [makeTouch(200, 100)])
    fireTouchEvent(el, 'touchend', [makeTouch(100, 100)])
    expect(onSwipeLeft).toHaveBeenCalledTimes(1)

    // long-press via mouse
    const down = new MouseEvent('mousedown', { bubbles: true, clientX: 0, clientY: 0 })
    act(() => result.current.handlers.onMouseDown?.(down as unknown as React.MouseEvent))
    act(() => vi.advanceTimersByTime(500))
    expect(onLongPress).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })
})
