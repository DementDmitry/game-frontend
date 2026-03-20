import React, { useEffect, useRef } from 'react'

const COLORS = {
  info: 'var(--blue)',
  ok:   'var(--green)',
  warn: 'var(--yellow)',
  err:  'var(--red)',
  raw:  'var(--text3)',
}

export default function Console({ logs, onClear }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [logs])

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        padding: '10px 14px',
        background: 'var(--bg)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
          консоль
        </span>
        <button onClick={onClear} style={{
          background: 'none', border: 'none', color: 'var(--text3)',
          fontSize: '11px', cursor: 'pointer', fontFamily: 'var(--font-mono)',
        }}>
          очистить
        </button>
      </div>
      <div ref={ref} style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        padding: '10px 14px',
        minHeight: '180px',
        maxHeight: '420px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
      }}>
        {logs.length === 0 && (
          <span style={{ color: 'var(--text3)' }}>— жду запроса —</span>
        )}
        {logs.map((log, i) => (
          <span key={i} style={{ color: COLORS[log.type] || 'var(--text2)' }}>
            <span style={{ color: 'var(--text3)', marginRight: '8px' }}>{log.time}</span>
            {log.msg}
          </span>
        ))}
      </div>
    </div>
  )
}
