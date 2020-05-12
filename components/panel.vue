<template>
  <div class="panel-container">
    <div
      class="panel"
      :style="{ width: size + 'px', height: size + 'px' }"
      @click="onClick"
    >
      <div ref="orbit" class="orbit">
        <Orbit :progress="data.duration" />
      </div>
      <div class="trigger">
        <Trigger />
      </div>
    </div>
    <div class="title">test</div>
  </div>
</template>

<script>
import Orbit from '@/components/Orbit'
import Trigger from '@/components/Trigger'
import gsap from 'gsap'
// import * as Tone from 'tone'

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
    }
  },
  data() {
    return {
      play: false,
      gsap_obj: null
    }
  },
  watch: {
    play() {
      if (this.play) this.gsap_obj.play()
      else this.gsap_obj.pause()
    }
  },
  mounted() {
    if (this.play) {
      this.gsap_obj = gsap.to(this.$refs.orbit, 60 * Math.random(), {
        rotation: 360,
        transformOrigin: 'center',
        ease: 'none',
        repeat: -1
      })
    }

    // let synth = new Tone.Synth().toMaster()
    // synth.triggerAttackRelease('C4', '8n')
  },
  destroyed() {
    this.gsap_obj.kill()
  },
  methods: {
    onClick() {
      this.play = !this.play
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-container {
  // border: 1px solid #333;

  .panel {
    position: relative;
    padding: 16px;
    // border-bottom: 1px solid #333;

    .orbit {
      width: 100%;
      height: 100%;
    }

    .trigger {
      position: absolute;
      top: 0;
      left: 0;
      padding: 16px;
    }
  }

  .title {
    width: 100%;
    height: 100%;
    line-height: 24px;
    // padding-bottom: 16px;
    color: #fff;
    text-align: center;
    font-size: 0.8rem;
  }
}
</style>
