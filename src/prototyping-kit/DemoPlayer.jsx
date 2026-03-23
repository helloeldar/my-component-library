import { useState, useEffect, useCallback, useRef } from 'react'

export default function DemoPlayer({ phases, renderTerminal, height = 280 }) {
  const [phase, setPhase] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [mode, setMode] = useState('watch') // 'watch' | 'tryit'
  const timerRef = useRef(null)

  const advance = useCallback(() => {
    setPhase(prev => {
      const next = prev + 1
      if (next >= phases.length) {
        setPlaying(false)
        return 0
      }
      return next
    })
  }, [phases.length])

  useEffect(() => {
    if (playing && mode === 'watch') {
      timerRef.current = setTimeout(advance, phases[phase].duration)
      return () => clearTimeout(timerRef.current)
    }
  }, [playing, phase, advance, phases, mode])

  const play = () => { setPhase(0); setPlaying(true) }
  const stop = () => { setPlaying(false); setPhase(0); clearTimeout(timerRef.current) }
  const prev = () => { setPlaying(false); setPhase(p => Math.max(0, p - 1)) }
  const next = () => { setPlaying(false); setPhase(p => Math.min(phases.length - 1, p + 1)) }

  const switchMode = (newMode) => {
    setMode(newMode)
    setPlaying(false)
    setPhase(0)
    clearTimeout(timerRef.current)
  }

  const handleDone = () => {
    if (phase < phases.length - 1) {
      setPhase(phase + 1)
    } else {
      setPhase(0)
    }
  }

  const hasTryItMode = phases.some(p => p.instruction)
  const isFirst = phase === 0
  const isLast = phase === phases.length - 1

  return (
    <div className="demo-container">
      <div className="demo-terminal">
        {renderTerminal(phases[phase], phase)}
      </div>
      <div className="demo-controls">
        {hasTryItMode && (
          <div className="demo-mode-switcher">
            <button
              className={`demo-mode-btn ${mode === 'watch' ? 'active' : ''}`}
              onClick={() => switchMode('watch')}
            >Watch</button>
            <button
              className={`demo-mode-btn ${mode === 'tryit' ? 'active' : ''}`}
              onClick={() => switchMode('tryit')}
            >Try it yourself</button>
          </div>
        )}
        <div className="demo-phase-indicator">
          <span className="demo-phase-label">{phases[phase].label}</span>
          <span className="demo-phase-step">Step {phase + 1} / {phases.length}</span>
        </div>
        <div className="demo-timeline">
          {phases.map((p, i) => (
            <div
              key={i}
              className={`demo-dot ${i === phase ? 'active' : ''} ${i < phase ? 'passed' : ''}`}
              title={p.label}
              onClick={() => { setPlaying(false); setPhase(i) }}
            />
          ))}
        </div>
        {mode === 'watch' ? (
          <div className="demo-buttons">
            {!playing ? (
              <button className="demo-btn demo-btn-play" onClick={play}>▶ Play</button>
            ) : (
              <button className="demo-btn demo-btn-stop" onClick={stop}>■ Stop</button>
            )}
            <button className="demo-btn demo-btn-arrow" onClick={prev} disabled={isFirst}>←</button>
            <button className="demo-btn demo-btn-arrow" onClick={next} disabled={isLast}>→</button>
          </div>
        ) : (
          <div className="demo-tryit">
            {phases[phase].instruction && (
              <div className="demo-instruction">
                {phases[phase].instruction}
              </div>
            )}
            <div className="demo-buttons">
              <button className="demo-btn demo-btn-arrow" onClick={prev} disabled={isFirst}>←</button>
              <button className="demo-btn demo-btn-done" onClick={handleDone}>
                {isLast ? '↺ Restart' : '✓ Done'}
              </button>
              <button className="demo-btn demo-btn-arrow" onClick={next} disabled={isLast}>→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
