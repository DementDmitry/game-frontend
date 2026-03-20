export function vanillaPrompt(gameType, theme) {
  return `Create a complete fully playable HTML5 Canvas game: "${gameType}" with "${theme}" theme.

TECHNICAL REQUIREMENTS:
- Return ONLY raw HTML. Start immediately with <!DOCTYPE html>. Zero text before or after. No markdown, no backticks.
- Use HTML5 Canvas element (width=640, height=480) for ALL game rendering
- Vanilla JavaScript only. Zero external libraries or CDN links.
- 60fps game loop with requestAnimationFrame
- Full collision detection
- Keyboard AND mouse/touch controls

GAMEPLAY REQUIREMENTS:
- The game must be FULLY PLAYABLE from start to finish
- Moving player character controlled by player
- Obstacles or enemies that challenge the player
- Clear win/lose condition with Game Over screen
- Score counter that increases during play
- Restart button on game over screen
- Difficulty increases over time

VISUAL REQUIREMENTS (theme: ${theme}):
- Colorful themed graphics: ${theme}
- Draw everything with canvas 2D API (fillRect, arc, beginPath etc)
- Animated background that matches the theme
- Smooth character and obstacle animations
- Large readable score text on screen

START WITH <!DOCTYPE html> IMMEDIATELY. DO NOT write any explanation:`
}
