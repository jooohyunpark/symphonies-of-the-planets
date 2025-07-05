<template>
  <div class="panel-container">
    <div class="panel" :style="{ width: size + 'px', height: size + 'px' }">
      <div ref="orbit" class="orbit" :class="start && 'animation'">
        <Orbit :progress="progress" />
      </div>
      <div class="trigger" :style="{ width: size + 'px', height: size + 'px' }">
        <Trigger />
      </div>
      <div class="title">
        <span>{{ data.pl_name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Orbit from '@/components/Orbit'
import Trigger from '@/components/Trigger'
import keys from '@/data/keys'

// Props
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  size: {
    type: Number,
    default: 180
  },
  info: {
    type: Object,
    default: () => ({})
  },
  start: {
    type: Boolean,
    default: false
  },
  piano: {
    type: Object,
    default: () => ({})
  },
  time: {
    type: Number,
    default: 60
  }
})

// Reactive data
const orbit = ref(null)
const earth_radius = ref(0.0892)
const index = ref({
  start: 0,
  earth: 39,
  end: 87
})

// Computed properties
const cycleDuration = computed(() => {
  return (props.data.pl_orbper / 365) * 60 * props.time
})

const progress = computed(() => {
  return props.data.st_dist / props.info.st_dist_max
})

const key = computed(() => {
  let i

  // upper
  if (props.data.pl_radj <= earth_radius.value) {
    i =
      index.value.earth +
      Math.floor(
        ((earth_radius.value - props.data.pl_radj) /
          (earth_radius.value - props.info.pl_radj_min)) *
          (index.value.end - index.value.earth)
      )
  }
  // lower
  else {
    i =
      index.value.earth -
      Math.floor(
        ((props.data.pl_radj - earth_radius.value) /
          (props.info.pl_radj_max - earth_radius.value)) *
          (index.value.earth - index.value.start)
      )
  }

  return keys[i]
})

const playDuration = computed(() => {
  return cycleDuration.value * progress.value
})

// Methods
const set_cycle_duration = () => {
  if (orbit.value) {
    orbit.value.style.animationDuration = cycleDuration.value + 's'
  }
}

const play = () => {
  if (props.piano && props.piano.triggerAttackRelease) {
    props.piano.triggerAttackRelease(key.value, playDuration.value)
  }

  if (orbit.value) {
    orbit.value.classList.add('play')

    setTimeout(() => {
      if (orbit.value) {
        orbit.value.classList.remove('play')
      }
    }, playDuration.value * 1000)
  }
}

// Lifecycle
onMounted(() => {
  set_cycle_duration()

  console.log(props.data.pl_name, ':', key.value)

  if (orbit.value) {
    orbit.value.addEventListener('animationiteration', play)
  }
})

onBeforeUnmount(() => {
  if (orbit.value) {
    orbit.value.removeEventListener('animationiteration', play)
  }
})
</script>

<style lang="scss" scoped>
$padding: 32px;

.panel-container {
  .panel {
    position: relative;
    padding: $padding;

    .orbit {
      width: 100%;
      height: 100%;
    }

    .trigger {
      position: absolute;
      top: 0;
      left: 0;
      padding: $padding;
    }

    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #ccc;
      font-size: 0.8rem;

      span {
        width: 50%;
        overflow-wrap: break-word;
      }
    }
  }
}

.animation {
  -webkit-animation: spin linear infinite;
  -moz-animation: spin linear infinite;
  animation: spin linear infinite;

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
