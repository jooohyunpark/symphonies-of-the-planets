<template>
  <div class="panel" :style="{ width: size + 'px', height: size + 'px' }">
    <div ref="orbit" class="orbit">
      <Orbit :progress="duration" />
    </div>
    <div class="trigger">
      <Trigger />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import Orbit from '@/components/Orbit'
import Trigger from '@/components/Trigger'

export default {
  components: {
    Orbit,
    Trigger
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
    if (this.on) {
      gsap.to(this.$refs.orbit, 60 * Math.random(), {
        rotation: 360,
        transformOrigin: 'center',
        ease: 'none',
        repeat: -1
      })
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.panel {
  position: relative;
  padding: 16px;
  border: 1px solid #333;

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
</style>
