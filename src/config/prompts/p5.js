export function p5Prompt(gameType, theme) {
  return `Create a complete fully playable p5.js game: "${gameType}" with "${theme}" theme.

TECHNICAL REQUIREMENTS:
- Return ONLY raw HTML. Start immediately with <!DOCTYPE html>. Zero text before or after. No markdown, no backticks.
- Load p5.js ONLY from: https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js
- Use p5.js global mode: setup() and draw() functions
- All rendering via p5.js drawing functions (rect, ellipse, line, text etc)
- Keyboard AND mouse input via p5.js (keyIsDown, mousePressed etc)

GAMEPLAY REQUIREMENTS:
- The game must be FULLY PLAYABLE from start to finish
- Moving player controlled by arrow keys or WASD
- Enemies or obstacles with proper collision detection
- Clear game over and win conditions
- Score display using p5 text()
- Restart on key press after game over
- Speed/difficulty increases over time

VISUAL REQUIREMENTS (theme: ${theme}):
- Beautiful smooth graphics using p5.js drawing API
- Rich themed colors and shapes matching: ${theme}
- Smooth animations using p5 translate/rotate
- Particle effects or decorative background elements
- Large clear score display

START WITH <!DOCTYPE html> IMMEDIATELY. DO NOT write any explanation:`
}
