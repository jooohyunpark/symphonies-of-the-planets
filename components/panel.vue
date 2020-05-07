<template>
  <div
    ref="panel"
    class="panel"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <Orbit :progress="duration" />
  </div>
</template>

<script>
import gsap from 'gsap'
import Orbit from '@/components/Orbit'

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
    },
    duration: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {}
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
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.panel {
  position: relative;
  padding: 8px;
  border: 1px solid pink;
}
</style>
