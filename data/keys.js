const loops = []

for (let i = 1; i < 8; i++) {
  const list = [
    `C${i}`,
    `C#${i}`,
    `D${i}`,
    `D#${i}`,
    `E${i}`,
    `F${i}`,
    `F#${i}`,
    `G${i}`,
    `G#${i}`,
    `A${i}`,
    `A#${i}`,
    `B${i}`
  ]
  loops.push(...list)
}

const keys = ['A0', 'A#0', 'B0', ...loops, 'C8']

export default keys
