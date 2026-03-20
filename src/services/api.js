const API_URL = 'https://llm-router-6ekv.onrender.com/api/query'

export async function generateGame({ prompt, llm }) {
  const body = { query: prompt, use_graph: false }
  if (llm) body.preferred_llm = llm

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 100)}`)
  }

  const data = await res.json()
  return data
}

export async function getProviders() {
  const res = await fetch('https://llm-router-6ekv.onrender.com/api/providers')
  return res.json()
}
