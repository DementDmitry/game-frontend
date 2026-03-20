import React, { useState, useCallback } from 'react'
import Selector from './components/Selector'
import Console from './components/Console'
import GameFrame from './components/GameFrame'
import { ENGINES } from './config/engines'
import { THEMES } from './config/themes'
import { GAME_TYPES } from './config/gameTypes'
import { LLMS } from './config/llms'
import { vanillaPrompt } from './config/prompts/vanilla'
import { p5Prompt } from './config/prompts/p5'
import { phaserPrompt } from './config/prompts/phaser'
import { generateGame } from './services/api'

const PROMPT_MAP = {
  vanilla: vanillaPrompt,
  p5: p5Prompt,
  phaser: phaserPrompt,
}

function now() {
  return new Date().toTimeString().slice(0, 8)
}

export default function App() {
  const [engine, setEngine] = useState('vanilla')
  const [theme, setTheme] = useState('space')
  const [gameType, setGameType] = useState('catch')
  const [llm, setLlm] = useState('claude')
  const [logs, setLogs] = useState([])
  const [html, setHtml] = useState(null)
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState(null)

  const log = useCallback((msg, type = 'info') => {
    setLogs(prev => [...prev, { msg, type, time: now() }])
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    setHtml(null)
    setMeta(null)

    const gameTypeCfg = GAME_TYPES.find(g => g.id === gameType)
    const themeCfg = THEMES.find(t => t.id === theme)

    log('— новый запрос —', 'info')
    log('игра: ' + gameTypeCfg.label, 'info')
    log('тема: ' + themeCfg.label + '  движок: ' + engine, 'info')
    log('LLM: ' + (llm || 'авто'), 'info')

    const promptFn = PROMPT_MAP[engine]
    const prompt = promptFn(gameTypeCfg.prompt, themeCfg.colors)

    try {
      log('отправляю запрос...', 'info')
      const data = await generateGame({ prompt, llm })

      log('провайдер: ' + data.provider_used, 'ok')
      log('длина ответа: ' + (data.answer || '').length + ' символов', 'info')

      if (data.errors && Object.keys(data.errors).length > 0) {
        log('ошибки провайдеров: ' + JSON.stringify(data.errors), 'warn')
      }

      let result = data.answer || ''
      log('начало: ' + result.slice(0, 80), 'raw')

      result = result.replace(/```html\n?/gi, '').replace(/```\n?/gi, '').trim()

      if (!result.toLowerCase().includes('<!doctype') && !result.toLowerCase().includes('<html')) {
        log('не HTML, пробую извлечь...', 'warn')
        const match = result.match(/<!DOCTYPE[\s\S]*<\/html>/i)
        if (match) { result = match[0]; log('HTML извлечён', 'ok') }
        else throw new Error('AI не вернул HTML. Попробуй снова.')
      }

      setHtml(result)
      setMeta({ provider: data.provider_used, engine, game: gameTypeCfg.label, theme: themeCfg.label })
      log('игра загружена!', 'ok')

    } catch (e) {
      log('ОШИБКА: ' + e.message, 'err')
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text)' }}>
          AI Game Generator
        </h1>
        <p style={{ color: 'var(--text3)', fontSize: '14px', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
          выбери параметры → нажми создать → играй
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Selector label="Движок" options={ENGINES} value={engine} onChange={setEngine} />
          <Selector label="Тип игры" options={GAME_TYPES} value={gameType} onChange={setGameType} />
          <Selector label="Тема" options={THEMES} value={theme} onChange={setTheme} />
          <Selector label="AI модель" options={LLMS} value={llm} onChange={setLlm} />

          <button onClick={handleGenerate} disabled={loading} style={{
            height: '48px',
            background: loading ? 'var(--bg3)' : 'var(--accent)',
            color: loading ? 'var(--text3)' : '#0e0e0e',
            border: 'none', borderRadius: '8px', fontSize: '15px',
            fontWeight: '600', fontFamily: 'var(--font-display)',
            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
          }}>
            {loading ? 'Генерирую...' : '→ Создать игру'}
          </button>

          {meta && (
            <div style={{
              padding: '10px 12px', background: 'var(--bg2)',
              border: '1px solid var(--border)', borderRadius: '8px',
              fontSize: '11px', fontFamily: 'var(--font-mono)',
              color: 'var(--text3)', lineHeight: '1.8',
            }}>
              <div>provider: <span style={{ color: 'var(--green)' }}>{meta.provider}</span></div>
              <div>engine: <span style={{ color: 'var(--blue)' }}>{meta.engine}</span></div>
              <div>game: <span style={{ color: 'var(--yellow)' }}>{meta.game}</span></div>
              <div>theme: <span style={{ color: 'var(--accent)' }}>{meta.theme}</span></div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <GameFrame html={html} loading={loading} />
          <Console logs={logs} onClear={() => setLogs([])} />
        </div>
      </div>
    </div>
  )
}
