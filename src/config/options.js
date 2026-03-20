export const ENGINES = [
  { id: 'vanilla', label: 'Vanilla JS', desc: 'Чистый HTML/JS' },
  { id: 'p5',      label: 'p5.js',      desc: 'Красивая графика' },
  { id: 'phaser',  label: 'Phaser 3',   desc: 'Игровой движок' },
]

export const THEMES = [
  { id: 'space',   label: '🚀 Космос' },
  { id: 'ocean',   label: '🌊 Океан' },
  { id: 'forest',  label: '🌲 Лес' },
  { id: 'candy',   label: '🍬 Конфеты' },
  { id: 'farm',    label: '🐄 Ферма' },
  { id: 'jungle',  label: '🦁 Джунгли' },
]

export const GAME_TYPES = [
  { id: 'catch',    label: 'Поймай предметы' },
  { id: 'maze',     label: 'Лабиринт' },
  { id: 'whack',    label: 'Вышибала' },
  { id: 'memory',   label: 'Память (карточки)' },
  { id: 'guess',    label: 'Угадай число' },
  { id: 'tictac',   label: 'Крестики-нолики' },
  { id: 'balloon',  label: 'Лопни шарики' },
  { id: 'snake',    label: 'Змейка' },
  { id: 'breakout', label: 'Арканоид' },
  { id: 'runner',   label: 'Бегун (прыжки)' },
]

export const LLMS = [
  { id: '',          label: 'Авто' },
  { id: 'groq',      label: 'Groq' },
  { id: 'gemini',    label: 'Gemini' },
  { id: 'mistral',   label: 'Mistral' },
  { id: 'deepseek',  label: 'DeepSeek' },
]

export const GAME_TYPE_PROMPTS = {
  catch:    'catch falling objects game',
  maze:     'maze game navigated with arrow keys',
  whack:    'whack-a-mole game',
  memory:   'memory card matching game',
  guess:    'number guessing game',
  tictac:   'tic-tac-toe game vs computer AI',
  balloon:  'balloon popping game',
  snake:    'snake game',
  breakout: 'brick breaker / breakout game',
  runner:   'endless runner with jump mechanic',
}

export const ENGINE_PROMPTS = {
  vanilla: (gameType, theme) => `Create a complete self-contained HTML5 children's game: "${gameType}" with "${theme}" theme.
STRICT RULES:
- Return ONLY raw HTML. Start immediately with <!DOCTYPE html>. No markdown, no backticks, no explanation before or after.
- Vanilla JS and inline CSS only. Zero external libraries or CDN links.
- Fun for children aged 5-10. Bright colorful visuals matching the theme.
- Show score. Add restart button.
- Under 200 lines total.
BEGIN WITH <!DOCTYPE html> NOW:`,

  p5: (gameType, theme) => `Create a complete self-contained HTML5 children's game: "${gameType}" with "${theme}" theme using p5.js.
STRICT RULES:
- Return ONLY raw HTML. Start immediately with <!DOCTYPE html>. No markdown, no backticks, no explanation.
- Load p5.js ONLY from: https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js
- Use p5.js setup() draw() pattern inside a <script> tag.
- Use p5 drawing functions for beautiful colorful visuals themed around "${theme}".
- Fun for children aged 5-10. Show score. Add restart button (createButton or keyPress).
- Under 220 lines total.
BEGIN WITH <!DOCTYPE html> NOW:`,

  phaser: (gameType, theme) => `Create a complete self-contained HTML5 children's game: "${gameType}" with "${theme}" theme using Phaser 3.
STRICT RULES:
- Return ONLY raw HTML. Start immediately with <!DOCTYPE html>. No markdown, no backticks, no explanation.
- Load Phaser ONLY from: https://cdnjs.cloudflare.com/ajax/libs/phaser/3.60.0/phaser.min.js
- Use new Phaser.Game({ ... scene: { preload, create, update } })
- Draw ALL graphics with scene.add.graphics() and scene.add.text() — NO external images.
- Fun for children aged 5-10. Show score with scene.add.text(). Add restart on game over.
- Under 250 lines total.
BEGIN WITH <!DOCTYPE html> NOW:`,
}
