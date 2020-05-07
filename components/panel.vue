<template>
  <div
    ref="panel"
    class="panel"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <Orbit />
  </div>
</template>

<script>
import Orbit from '@/components/svg/Orbit'
import gsap from 'gsap'

export default {
  components: {
    Orbit
  },
  props: {
    size: {
      type: Number,
      default: 100
    },
    on: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    // if (this.on) {
    //   gsap.to(this.$refs.panel, 60 * Math.random(), {
    //     rotation: 360,
    //     transformOrigin: 'center',
    //     ease: 'none',
    //     repeat: -1
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  // border: 1px solid gray;
}
</style>
