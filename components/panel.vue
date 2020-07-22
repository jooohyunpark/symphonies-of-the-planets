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

<script>
import Orbit from '@/components/Orbit'
import Trigger from '@/components/Trigger'
import keys from '@/data/keys'

export default {
  components: {
    Orbit,
    Trigger
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    size: {
      type: Number,
      default: 180
    },
    info: {
      type: Object,
      default: () => {}
    },
    start: {
      type: Boolean,
      default: false
    },
    piano: {
      type: Object,
      default: () => {}
    },
    time: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      earth_radius: 0.0892,
      index: {
        start: 0,
        earth: 39,
        end: 87
      }
    }
  },
  computed: {
    cycleDuration() {
      return (this.data.pl_orbper / 365) * 60 * this.time
    },
    progress() {
      return this.data.st_dist / this.info.st_dist_max
    },
    key() {
      let i

      // upper
      if (this.data.pl_radj <= this.earth_radius) {
        i =
          this.index.earth +
          Math.floor(
            ((this.earth_radius - this.data.pl_radj) /
              (this.earth_radius - this.info.pl_radj_min)) *
              (this.index.end - this.index.earth)
          )
      }
      // lower
      else {
        i =
          this.index.earth -
          Math.floor(
            ((this.data.pl_radj - this.earth_radius) /
              (this.info.pl_radj_max - this.earth_radius)) *
              (this.index.earth - this.index.start)
          )
      }

      return keys[i]
    },
    playDuration() {
      return this.cycleDuration * this.progress
    }
  },
  mounted() {
    this.set_cycle_duration()

    console.log(this.data.pl_name, ':', this.key)

    this.$refs.orbit.addEventListener('animationiteration', this.play)
  },
  beforeDestroy() {
    this.$refs.orbit.removeEventListener('animationiteration', this.play)
  },
  methods: {
    set_cycle_duration() {
      this.$refs.orbit.style.animationDuration = this.cycleDuration + 's'
    },
    play() {
      this.piano.triggerAttackRelease(this.key, this.playDuration)
      this.$refs.orbit.classList.add('play')

      setTimeout(() => {
        this.$refs.orbit.classList.remove('play')
      }, this.playDuration * 1000)
    }
  }
}
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
