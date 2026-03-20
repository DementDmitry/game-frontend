export function phaserPrompt(gameType, theme) {
  return `Create a complete fully playable Phaser 3 game: "${gameType}" with "${theme}" theme.

TECHNICAL REQUIREMENTS:
- Return ONLY raw HTML. Start immediately with <!DOCTYPE html>. Zero text before or after. No markdown, no backticks.
- Load Phaser ONLY from: https://cdnjs.cloudflare.com/ajax/libs/phaser/3.60.0/phaser.min.js
- Use new Phaser.Game({ width:640, height:480, scene:{ preload, create, update } })
- Draw ALL graphics with scene.add.graphics() and GeometryMask — NO external image files
- Use Phaser physics: this.physics.add.sprite() with arcade physics

GAMEPLAY REQUIREMENTS:
- The game must be FULLY PLAYABLE from start to finish
- Player controlled with cursor keys (this.cursors = this.input.keyboard.createCursorKeys())
- Enemies or obstacles using Phaser groups and physics
- Collision detection via this.physics.add.collider/overlap
- Score text using this.add.text(), updated during play
- Game over screen with restart key
- Increasing difficulty over time

VISUAL REQUIREMENTS (theme: ${theme}):
- All graphics drawn programmatically with graphics.fillStyle/fillRect/fillCircle
- Vivid themed colors and shapes: ${theme}
- Smooth Phaser tween animations
- Particle emitter for effects (Phaser.GameObjects.Particles)
- Themed background drawn in create()

START WITH <!DOCTYPE html> IMMEDIATELY. DO NOT write any explanation:`
}
