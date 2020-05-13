<template>
  <div class="panel-container">
    <div
      class="panel"
      :style="{ width: size + 'px', height: size + 'px' }"
      @click="onClick"
    >
      <div ref="orbit" class="orbit">
        <Orbit :progress="computed_orbit(data.pl_orbper)" />
      </div>
      <div class="trigger">
        <Trigger />
      </div>
    </div>
    <div class="title">{{ data.pl_name }}</div>
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
      this.toggle()
    }
  },
  mounted() {
    this.gsap_obj = gsap.to(this.$refs.orbit, 60 * Math.random(), {
      rotation: 360,
      transformOrigin: 'center',
      ease: 'none',
      repeat: -1
    })

    this.toggle()

    // let synth = new Tone.Synth().toMaster()
    // synth.triggerAttackRelease('C4', '8n')
  },
  destroyed() {
    if (this.gsap_obj) this.gsap_obj.kill()
  },
  methods: {
    onClick() {
      this.play = !this.play
    },
    toggle() {
      if (this.play) this.gsap_obj.play()
      else this.gsap_obj.pause()
    },
    computed_orbit(val) {
      return Math.min(val / 365, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
$padding: 18px;

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
  }

  .title {
    width: 100%;
    height: 100%;
    // line-height: 24px;
    padding-bottom: $padding;
    color: #fff;
    text-align: center;
    font-size: 0.8rem;
  }
}
</style>
