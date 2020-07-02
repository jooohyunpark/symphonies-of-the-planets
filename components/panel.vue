<template>
  <div class="panel-container">
    <div class="panel" :style="{ width: size + 'px', height: size + 'px' }">
      <div ref="orbit" class="orbit" :class="start && 'animation'">
        <Orbit :progress="progress" />
      </div>
      <div class="trigger">
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
      default: 160
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
  computed: {
    cycleDuration() {
      return (this.data.pl_orbper / 365) * 60 * this.time
    },
    progress() {
      return this.data.st_dist / this.info.st_dist_max
    },
    key() {
      const index = Math.floor(
        87 -
          Math.min(
            ((this.data.pl_radj - this.info.pl_radj_min) /
              (this.info.pl_radj_max - this.info.pl_radj_min)) *
              88,
            87
          )
      )
      // console.log(this.data.pl_radj, index)
      return keys[index]
    },
    playDuration() {
      return this.cycleDuration * this.progress
    }
  },
  mounted() {
    this.set_cycle_duration()

    // console.log(this.data.pl_name, ':', this.key)

    this.$refs.orbit.addEventListener('webkitAnimationIteration', this.play)
  },
  beforeDestroy() {
    this.$refs.orbit.removeEventListener('webkitAnimationIteration', this.play)
  },
  methods: {
    set_cycle_duration() {
      this.$refs.orbit.style.animationDuration = this.cycleDuration + 's'
    },
    play() {
      this.piano.triggerAttackRelease(this.key, this.playDuration)
    }
  }
}
</script>

<style lang="scss" scoped>
$padding: 24px;

.panel-container {
  // border: 1px solid #333;

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
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
