import React from 'react'

const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--text3)',
    fontFamily: 'var(--font-mono)',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  item: (selected) => ({
    padding: '7px 14px',
    borderRadius: '6px',
    border: `1px solid ${selected ? 'var(--accent)' : 'var(--border2)'}`,
    background: selected ? 'var(--accent)' : 'var(--bg2)',
    color: selected ? '#0e0e0e' : 'var(--text2)',
    fontSize: '13px',
    fontFamily: 'var(--font-display)',
    fontWeight: selected ? '600' : '400',
    cursor: 'pointer',
    transition: 'all 0.15s',
    userSelect: 'none',
  }),
}

export default function Selector({ label, options, value, onChange }) {
  return (
    <div style={styles.wrap}>
      <span style={styles.label}>{label}</span>
      <div style={styles.grid}>
        {options.map(opt => (
          <button
            key={opt.id}
            style={styles.item(value === opt.id)}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
