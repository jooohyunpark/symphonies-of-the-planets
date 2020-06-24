import * as Tone from 'tone'
import source_keys from '@/data/source_keys'

let piano
const path = {}

const computed_key = val => {
  return val.replace('#', 's')
}

source_keys.map(key => {
  path[key] = require(`@/assets/sounds/${computed_key(key)}.ogg`)
})

if (process.client) {
  piano = new Tone.Sampler(path, { release: 1 }).toMaster()
}

export default piano

// {
//   A0: require('@/assets/salamander/A0.mp3'),
//   C1: require('@/assets/salamander/C1.mp3'),
//   'D#1': require('@/assets/salamander/Ds1.mp3'),
//   'F#1': require('@/assets/salamander/Fs1.mp3'),
//   A1: require('@/assets/salamander/A1.mp3'),
//   C2: require('@/assets/salamander/C2.mp3'),
//   'D#2': require('@/assets/salamander/Ds2.mp3'),
//   'F#2': require('@/assets/salamander/Fs2.mp3'),
//   A2: require('@/assets/salamander/A2.mp3'),
//   C3: require('@/assets/salamander/C3.mp3'),
//   'D#3': require('@/assets/salamander/Ds3.mp3'),
//   'F#3': require('@/assets/salamander/Fs3.mp3'),
//   A3: require('@/assets/salamander/A3.mp3'),
//   C4: require('@/assets/salamander/C4.mp3'),
//   'D#4': require('@/assets/salamander/Ds4.mp3'),
//   'F#4': require('@/assets/salamander/Fs4.mp3'),
//   A4: require('@/assets/salamander/A4.mp3'),
//   C5: require('@/assets/salamander/C5.mp3'),
//   'D#5': require('@/assets/salamander/Ds5.mp3'),
//   'F#5': require('@/assets/salamander/Fs5.mp3'),
//   A5: require('@/assets/salamander/A5.mp3'),
//   C6: require('@/assets/salamander/C6.mp3'),
//   'D#6': require('@/assets/salamander/Ds6.mp3'),
//   'F#6': require('@/assets/salamander/Fs6.mp3'),
//   A6: require('@/assets/salamander/A6.mp3'),
//   C7: require('@/assets/salamander/C7.mp3'),
//   'D#7': require('@/assets/salamander/Ds7.mp3'),
//   'F#7': require('@/assets/salamander/Fs7.mp3'),
//   A7: require('@/assets/salamander/A7.mp3'),
//   C8: require('@/assets/salamander/C8.mp3')
// },
