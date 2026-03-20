import React, { useEffect, useState } from 'react'
import { loadGames, deleteGame } from '../services/supabase'

export default function Gallery({ onLoad }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchGames()
  }, [])

  async function fetchGames() {
    setLoading(true)
    try {
      const data = await loadGames()
      setGames(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  async function handleDelete(id, e) {
    e.stopPropagation()
    if (!confirm('Удалить игру?')) return
    await deleteGame(id)
    setGames(prev => prev.filter(g => g.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const ENGINE_COLORS = { vanilla: 'var(--blue)', p5: 'var(--green)', phaser: 'var(--yellow)' }

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)' }}>Сохранённые игры</h2>
        <button onClick={fetchGames} style={{
          background: 'none', border: '1px solid var(--border2)',
          color: 'var(--text3)', borderRadius: '6px', padding: '4px 12px',
          fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-mono)',
        }}>обновить</button>
      </div>

      {loading && <p style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>загружаю...</p>}

      {!loading && games.length === 0 && (
        <p style={{ color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>нет сохранённых игр</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {games.map(game => (
          <div key={game.id} onClick={() => { setSelected(game); onLoad(game.html) }}
            style={{
              background: 'var(--bg2)', border: `1px solid ${selected?.id === game.id ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '10px', padding: '12px', cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text)', flex: 1 }}>
                {game.title}
              </span>
              <button onClick={(e) => handleDelete(game.id, e)} style={{
                background: 'none', border: 'none', color: 'var(--text3)',
                cursor: 'pointer', fontSize: '14px', padding: '0 0 0 8px',
              }}>✕</button>
            </div>
            <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', color: ENGINE_COLORS[game.engine] || 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
                {game.engine}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
                {game.theme}
              </span>
            </div>
            <div style={{ marginTop: '4px', fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
              {new Date(game.created_at).toLocaleDateString('ru')}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: '1rem', fontSize: '12px', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
          ✓ загружена: {selected.title}
        </div>
      )}
    </div>
  )
}
