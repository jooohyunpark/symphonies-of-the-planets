<template>
  <svg ref="svg" width="100%" height="100%" viewBox="0 0 100 100">
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
  </svg>
</template>

<script>
export default {
  props: {
    orbitRadius: {
      type: Number,
      default: 40
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
    }
  },
  computed: {
    offset() {
      return (1 - this.progress) * this.circumference
    }
  },
  mounted() {
    this.init_transform_offset()
    this.$refs.orbit.style.strokeDasharray = `${this.circumference} ${this.circumference}`
    this.$refs.orbit.style.strokeDashoffset = this.offset
  },
  methods: {
    init_transform_offset() {
      this.$refs.svg.setAttribute(
        'style',
        `transform: rotate(${-1 * this.progress * 360}deg);
        -webkit-transform: rotate(${-1 * this.progress * 360}deg);
        -moz-transform: rotate(${-1 * this.progress * 360}deg);
          `
      )
    }
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
</style>
