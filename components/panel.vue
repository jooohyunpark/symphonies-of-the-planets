<template>
  <div
    ref="panel"
    class="panel"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <Planet />
  </div>
</template>

<script>
import Planet from '@/components/svg/Planet'
import gsap from 'gsap'

export default {
  components: {
    Planet
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
    if (this.on) {
      gsap.to(this.$refs.panel, 5 + 5 * Math.random(), {
        rotation: 360,
        transformOrigin: 'center',
        ease: 'none',
        repeat: -1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  border: 1px solid gray;
}
</style>
