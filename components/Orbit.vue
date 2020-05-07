<template>
  <svg width="100%" height="100%" viewBox="0 0 100 100">
    <circle
      ref="orbit"
      :r="orbitRadius"
      :stroke="color"
      :stroke-width="strokeWidth"
      fill="none"
      cx="50"
      cy="50"
      :style="{ strokeDashoffset: circumference }"
    />
    <circle
      :r="orbitRadius"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-opacity="0.1"
      fill="none"
      cx="50"
      cy="50"
    />
    <circle
      ref="planet"
      class="planet"
      :r="planetRadius"
      :stroke="color"
      :stroke-width="strokeWidth"
      :cx="planet_cx"
      :cy="planet_cy"
    />
    <!-- <line
      x1="50"
      :y1="50 - orbitRadius - lineLength / 2"
      x2="50"
      :y2="50 - orbitRadius + lineLength / 2"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="square"
    />-->
  </svg>
</template>

<script>
export default {
  props: {
    orbitRadius: {
      type: Number,
      default: 40
    },
    planetRadius: {
      type: Number,
      default: 5
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: '#ccc'
    },
    progress: {
      type: Number,
      default: 0.1
    }
  },
  data() {
    return {
      circumference: this.orbitRadius * 2 * Math.PI
      // lineLength: 2
    }
  },
  computed: {
    offset() {
      return (1 - this.progress) * this.circumference
    },
    planet_cx() {
      return 50 + this.orbitRadius * Math.cos(2 * Math.PI * this.progress)
    },
    planet_cy() {
      return 50 + this.orbitRadius * Math.sin(2 * Math.PI * this.progress)
    }
  },
  mounted() {
    this.$refs.orbit.style.strokeDasharray = `${this.circumference} ${this.circumference}`
    this.$refs.orbit.style.strokeDashoffset = this.offset
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_colors.scss';

circle {
  transition: 0.3s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.planet {
  fill: $bg-color;
}
</style>
