<template>
  <div class="panel-container" @click="play">
    <div class="panel" :style="{ width: size + 'px', height: size + 'px' }">
      <div ref="orbit" class="orbit animation">
        <Orbit :progress="computed_pl_radj(data.pl_radj)" />
      </div>
      <div class="trigger">
        <Trigger />
      </div>
      <div class="title">
        <span>
          {{ data.pl_name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Orbit from '@/components/Orbit'
import Trigger from '@/components/Trigger'
import * as Tone from 'tone'
// import A2 from '@/assets/sounds/A2.mp3'
// import piano from '@/components/test.js'

export default {
  components: {
    Orbit,
    Trigger
  },
  props: {
    size: {
      type: Number,
      default: 120
    },
    data: {
      type: Object,
      default: () => {}
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      synth: null
    }
  },
  mounted() {
    this.init_duration()

    // console.log(this.$refs.orbit.style)

    // this.synth = new Tone.Synth({
    //   oscillator: {
    //     type: 'sine'
    //   },
    //   envelope: {
    //     attack: 0.005,
    //     decay: 0.1,
    //     sustain: 0.3,
    //     release: 1
    //   }
    // }).toMaster()
  },
  destroyed() {},
  methods: {
    init_duration() {
      this.$refs.orbit.style.animationDuration =
        this.computed_pl_orbper(this.data.pl_orbper) + 's'
    },
    computed_pl_orbper(val) {
      return (val / 365) * 60 * 10
    },
    computed_pl_radj(val) {
      return val / this.info.pl_radj_max
    },
    computed_pl_bmassj(val) {
      return val / this.info.pl_bmassj_max
    },
    play(note, duration) {
      this.synth.triggerAttackRelease('C3', 8)
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
    // border-bottom: 1px solid #333;

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
