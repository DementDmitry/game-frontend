const SUPABASE_URL = 'https://honpaujlcwjyhwwptknf.supabase.co'
const SUPABASE_KEY = 'sb_publishable_Bn2WXEL0SvkOOG9sSe-mfw_6lfwhZwN'

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
}

export async function saveGame({ title, engine, theme, game_type, provider, html }) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/games`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'return=representation' },
    body: JSON.stringify({ title, engine, theme, game_type, provider, html }),
  })
  if (!res.ok) throw new Error('Ошибка сохранения: ' + await res.text())
  const data = await res.json()
  return data[0]
}

export async function loadGames() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/games?select=*&order=created_at.desc`, {
    headers,
  })
  if (!res.ok) throw new Error('Ошибка загрузки')
  return res.json()
}

export async function deleteGame(id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/games?id=eq.${id}`, {
    method: 'DELETE',
    headers,
  })
  if (!res.ok) throw new Error('Ошибка удаления')
}
