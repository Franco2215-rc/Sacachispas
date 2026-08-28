'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PAIRS, type Pair, COPYRIGHT } from '@/lib/game-data'
import { StartScreen } from './start-screen'
import { EndScreen } from './end-screen'
import { LearningCard } from './learning-card'
import { BrandLogo } from './brand-logo'

type Phase = 'start' | 'play' | 'end'
type Point = { x: number; y: number }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Sonido simple offline con WebAudio (sin archivos)
function beep(ok: boolean, muted: boolean) {
  if (muted || typeof window === 'undefined') return
  try {
    const AudioCtx =
      window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.value = ok ? 660 : 180
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25)
    osc.start()
    osc.stop(ctx.currentTime + 0.26)
    if (ok) {
      const osc2 = ctx.createOscillator()
      osc2.connect(gain)
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.12)
      osc2.start(ctx.currentTime + 0.12)
      osc2.stop(ctx.currentTime + 0.26)
    }
  } catch {
    /* ignore */
  }
}

export function EcoConnectGame() {
  const [phase, setPhase] = useState<Phase>('start')
  const [leftOrder, setLeftOrder] = useState<Pair[]>(PAIRS)
  const [rightOrder, setRightOrder] = useState<Pair[]>(PAIRS)
  const [matched, setMatched] = useState<string[]>([])
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [pointer, setPointer] = useState<Point | null>(null)
  const [learn, setLearn] = useState<Pair | null>(null)
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [muted, setMuted] = useState(false)
  const [, setTick] = useState(0)

  const boardRef = useRef<HTMLDivElement | null>(null)
  const leftRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const rightRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const startRef = useRef<number>(0)

  // Timer (cuenta hacia arriba)
  useEffect(() => {
    if (phase !== 'play') return
    const id = window.setInterval(() => {
      setSeconds(Math.floor((Date.now() - startRef.current) / 1000))
    }, 500)
    return () => window.clearInterval(id)
  }, [phase])

  // Recalcular líneas al redimensionar
  useEffect(() => {
    const onResize = () => setTick((t) => t + 1)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const startGame = useCallback(() => {
    setLeftOrder(shuffle(PAIRS))
    setRightOrder(shuffle(PAIRS))
    setMatched([])
    setSelectedLeft(null)
    setDragging(false)
    setPointer(null)
    setLearn(null)
    setWrongId(null)
    setSeconds(0)
    startRef.current = Date.now()
    setPhase('play')
  }, [])

  const anchor = useCallback(
    (id: string, side: 'left' | 'right'): Point | null => {
      const board = boardRef.current
      const el =
        side === 'left' ? leftRefs.current[id] : rightRefs.current[id]
      if (!board || !el) return null
      const b = board.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      return {
        x: (side === 'left' ? r.right : r.left) - b.left,
        y: r.top + r.height / 2 - b.top,
      }
    },
    [],
  )

  const relPoint = (clientX: number, clientY: number): Point | null => {
    const board = boardRef.current
    if (!board) return null
    const b = board.getBoundingClientRect()
    return { x: clientX - b.left, y: clientY - b.top }
  }

  const tryConnect = useCallback(
    (benefitId: string) => {
      if (!selectedLeft || matched.includes(benefitId)) return
      const leftId = selectedLeft
      if (leftId === benefitId) {
        setMatched((m) => [...m, leftId])
        setSelectedLeft(null)
        setDragging(false)
        setPointer(null)
        beep(true, muted)
        const pair = PAIRS.find((p) => p.id === leftId)!
        setLearn(pair)
      } else {
        beep(false, muted)
        setWrongId(benefitId)
        setSelectedLeft(null)
        setDragging(false)
        setPointer(null)
        window.setTimeout(() => setWrongId(null), 450)
      }
    },
    [selectedLeft, matched, muted],
  )

  const onLeftDown = (id: string) => {
    if (matched.includes(id) || learn) return
    setSelectedLeft(id)
    setDragging(false)
    setPointer(anchor(id, 'left'))
  }

  const onBoardMove = (e: React.PointerEvent) => {
    if (!selectedLeft || learn) return
    const p = relPoint(e.clientX, e.clientY)
    if (!p) return
    setDragging(true)
    setPointer(p)
  }

  const onBoardUp = (e: React.PointerEvent) => {
    if (!selectedLeft || !dragging) return
    const el = document.elementFromPoint(e.clientX, e.clientY)
    const node = el?.closest('[data-benefit]') as HTMLElement | null
    if (node?.dataset.benefit) {
      tryConnect(node.dataset.benefit)
    } else {
      setDragging(false)
      setPointer(anchor(selectedLeft, 'left'))
    }
  }

  const handleContinue = () => {
    const done = matched.length >= PAIRS.length
    setLearn(null)
    if (done) setPhase('end')
  }

  if (phase === 'start') return <StartScreen onStart={startGame} />
  if (phase === 'end')
    return <EndScreen seconds={seconds} onRestart={startGame} />

  const mm = Math.floor(seconds / 60)
  const ss = (seconds % 60).toString().padStart(2, '0')

  return (
    <div className="safe-area mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-4 py-3 sm:px-6">
      {/* Barra superior */}
      <header className="flex items-center justify-between gap-3">
        <BrandLogo size="sm" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold tabular-nums text-foreground">
            {mm}:{ss}
          </span>
          <span className="rounded-full bg-eco-green/10 px-3 py-1 text-sm font-bold text-eco-green-dark">
            {matched.length}/{PAIRS.length}
          </span>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? 'Activar sonido' : 'Silenciar'}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground"
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      </header>

      <h1 className="mt-2 text-balance text-center text-lg font-bold text-foreground sm:text-xl">
        Une cada acción con el beneficio que le da al mundo
      </h1>

      {/* Tablero */}
      <div
        ref={boardRef}
        onPointerMove={onBoardMove}
        onPointerUp={onBoardUp}
        onPointerLeave={onBoardUp}
        className="relative mt-3 flex items-center justify-between gap-3 sm:gap-10"
        style={{ touchAction: 'none' }}
      >
        {/* Columna acciones */}
        <div className="flex w-[46%] flex-col justify-center gap-3 sm:gap-4">
          {leftOrder.map((p) => {
            const isMatched = matched.includes(p.id)
            const isSelected = selectedLeft === p.id
            return (
              <button
                key={p.id}
                ref={(el) => {
                  leftRefs.current[p.id] = el
                }}
                type="button"
                disabled={isMatched}
                onPointerDown={() => onLeftDown(p.id)}
                className={`flex items-center gap-2 rounded-2xl border-2 bg-card p-2 text-left shadow-sm transition-all sm:gap-3 sm:p-3 ${
                  isMatched
                    ? 'border-eco-green opacity-70'
                    : isSelected
                      ? 'border-primary ring-4 ring-primary/20'
                      : 'border-border'
                }`}
              >
                <img
                  src={p.icon || '/placeholder.svg'}
                  alt=""
                  aria-hidden
                  className="h-11 w-11 shrink-0 rounded-full bg-secondary object-cover sm:h-14 sm:w-14"
                />
                <span className="text-sm font-bold leading-tight text-foreground sm:text-base">
                  {p.action}
                </span>
                <span
                  aria-hidden
                  className={`ml-auto h-3 w-3 shrink-0 rounded-full ${
                    isMatched ? 'bg-eco-green' : 'bg-primary'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* SVG de líneas */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          {matched.map((id) => {
            const a = anchor(id, 'left')
            const b = anchor(id, 'right')
            if (!a || !b) return null
            return (
              <line
                key={id}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--eco-green)"
                strokeWidth={5}
                strokeLinecap="round"
              />
            )
          })}
          {dragging && selectedLeft && pointer
            ? (() => {
                const a = anchor(selectedLeft, 'left')
                if (!a) return null
                return (
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={pointer.x}
                    y2={pointer.y}
                    stroke="var(--coke-red)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeDasharray="2 10"
                  />
                )
              })()
            : null}
        </svg>

        {/* Columna beneficios */}
        <div className="flex w-[46%] flex-col justify-center gap-3 sm:gap-4">
          {rightOrder.map((p) => {
            const isMatched = matched.includes(p.id)
            const isWrong = wrongId === p.id
            return (
              <button
                key={p.id}
                ref={(el) => {
                  rightRefs.current[p.id] = el
                }}
                type="button"
                data-benefit={p.id}
                disabled={isMatched}
                onPointerDown={() => {
                  if (selectedLeft && !dragging) tryConnect(p.id)
                }}
                className={`flex items-center gap-2 rounded-2xl border-2 bg-card p-2 text-left shadow-sm transition-all sm:p-3 ${
                  isMatched
                    ? 'border-eco-green opacity-70'
                    : isWrong
                      ? 'animate-eco-shake border-primary'
                      : 'border-border'
                }`}
              >
                <span
                  aria-hidden
                  className={`h-3 w-3 shrink-0 rounded-full ${
                    isMatched ? 'bg-eco-green' : 'bg-primary'
                  }`}
                />
                <span className="text-sm font-semibold leading-tight text-foreground sm:text-base">
                  {p.benefit}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <footer className="flex items-center justify-center gap-1.5 pt-2 text-center text-[10px] text-muted-foreground/70">
        <img
          src="/images/pakova-logo.jpeg"
          alt="Logo de Pakova"
          className="h-4 w-4 rounded-full object-cover"
        />
        <span>{COPYRIGHT} · Fines educativos</span>
      </footer>

      {learn ? (
        <LearningCard
          pair={learn}
          isLast={matched.length >= PAIRS.length}
          onContinue={handleContinue}
        />
      ) : null}
    </div>
  )
}
