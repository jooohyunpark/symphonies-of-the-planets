<template>
  <div>
    <transition name="fade" appear>
      <div class="app" @click="start = true">
        <div v-if="piano" class="panel-group">
          <div v-for="i in row" :key="i" class="row">
            <div v-for="j in column" :id="id(i, j)" :key="j" class="column">
              <Panel
                :data="data[i - 1][j - 1]"
                :info="info"
                :size="size"
                :start="start"
                :piano="piano"
                :time="time"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="poster">Symphonies of the Planets</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Sampler } from 'tone'
import source_keys from '@/data/source_keys'
import __data from '@/data/planets.json'

const route = useRoute()

// Reactive data
const row = ref(Number(route.query.row) || 3)
const column = ref(Number(route.query.column) || 5)
const size = ref(Math.max(Number(route.query.size) || 180, 120))
const time = ref(Number(route.query.time) || 60)
const data = ref([])
const info = ref({})
const start = ref(false)
const piano = ref(null)
const earth_radius = ref(0.0892)
const iteration = ref(0)

// Computed properties
const count = computed(() => {
  const total = row.value * column.value
  return {
    total,
    upper_pitch: Math.ceil(total / 2),
    lower_pitch: Math.floor(total / 2)
  }
})

// Methods
const id = (i, j) => {
  return `${i - 1}${j - 1}`
}

const min = (data, key) => {
  return data.reduce((min, p) => (p[key] < min ? p[key] : min), data[0][key])
}

const max = (data, key) => {
  return data.reduce((max, p) => (p[key] > max ? p[key] : max), data[0][key])
}

const shuffle = (array) => {
  const spread = [].concat(...array)
  const new_array = []

  for (let i = 0; i < row.value; i++) {
    const row_data = []
    for (let j = 0; j < column.value; j++) {
      const index = Math.floor(Math.random() * spread.length)
      row_data.push(spread[index])
      spread.splice(index, 1)
    }
    new_array.push(row_data)
  }

  return new_array
}

const init_info = (data) => {
  info.value = {
    pl_orbper_min: min(data, 'pl_orbper'),
    pl_orbper_max: max(data, 'pl_orbper'),
    pl_radj_max: max(data, 'pl_radj'),
    pl_radj_min: min(data, 'pl_radj'),
    st_dist_max: max(data, 'st_dist'),
    st_dist_min: min(data, 'st_dist')
  }

  console.log('orbit period min: ', info.value.pl_orbper_min)
  console.log('orbit period max: ', info.value.pl_orbper_max)
  console.log('radius min: ', info.value.pl_radj_min)
  console.log('radius max: ', info.value.pl_radj_max)
  console.log('distance min: ', info.value.st_dist_min)
  console.log('distance max: ', info.value.st_dist_max)
}

const init_piano = () => {
  const path = {}

  const computed_key = (val) => {
    return val.replace('#', 's')
  }

  // Use public URLs for audio files
  for (const key of source_keys) {
    const computedKey = computed_key(key)
    path[key] = `/assets/sounds/${computedKey}.ogg`
  }

  piano.value = new Sampler(path, {
    attack: 0,
    release: 1,
    curve: 'exponential'
  }).toDestination()
}

// Initialize data
console.log('original data size: ', __data.length)

const _data = __data
  .filter((d) => {
    return (d.pl_name && d.pl_radj && d.pl_orbper && d.st_dist) !== null
  })
  .sort((a, b) => a.pl_radj - b.pl_radj)

console.log('cleaned data size: ', _data.length)

init_info(_data)

const upper_pitch_data = _data.filter((d) => d.pl_radj <= earth_radius.value)
const lower_pitch_data = _data.filter((d) => d.pl_radj > earth_radius.value)

for (let i = 0; i < row.value; i++) {
  const row_data = []
  for (let j = 0; j < column.value; j++) {
    let temp_data

    if (count.value.total === 1) {
      temp_data = _data[Math.floor(Math.random() * _data.length)]
    } else {
      temp_data =
        iteration.value < count.value.upper_pitch
          ? upper_pitch_data[
              Math.floor(Math.random() * upper_pitch_data.length)
            ]
          : lower_pitch_data[
              Math.floor(Math.random() * lower_pitch_data.length)
            ]
    }

    row_data.push(temp_data)
    iteration.value++
  }
  data.value.push(row_data)
}

data.value = shuffle(data.value)

// Lifecycle
onMounted(() => {
  console.log('data: ', data.value)
  init_piano()
})
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;

  .row {
    display: flex;
  }
}

.poster {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  background: #000;
  color: #fff;
  font-size: 18px;
  letter-spacing: 2px;
  z-index: 100;
}

// Vue transition classes
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 1056px) {
  .app {
    display: none;
  }

  .poster {
    display: flex;
  }
}
</style>
