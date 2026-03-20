import React from 'react'

export default function GameFrame({ html, loading }) {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: '10px',
      overflow: 'hidden',
      minHeight: '480px',
      background: 'var(--bg2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {loading && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '12px',
          background: 'var(--bg2)', zIndex: 2,
        }}>
          <div style={{
            width: '32px', height: '32px',
            border: '2px solid var(--border2)',
            borderTop: '2px solid var(--accent)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <span style={{ color: 'var(--text3)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
            генерирую...
          </span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!html && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎮</div>
          <p style={{ color: 'var(--text2)', fontSize: '15px', marginBottom: '6px' }}>
            Выбери параметры и нажми «Создать»
          </p>
          <p style={{ color: 'var(--text3)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
            AI сгенерирует уникальную игру
          </p>
        </div>
      )}

      {html && !loading && (
        <iframe
          srcDoc={html}
          sandbox="allow-scripts allow-same-origin"
          style={{ width: '100%', height: '500px', border: 'none', display: 'block' }}
        />
      )}
    </div>
  )
}
