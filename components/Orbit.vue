<template>
  <svg width="100%" height="100%" viewBox="0 0 100 100">
    <circle
      ref="orbit"
      class="orbit"
      :r="r"
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
    r: {
      type: Number,
      default: 40
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: '#fff'
    },
    progress: {
      type: Number,
      default: 0.1
    }
  },
  data() {
    return {
      circumference: this.r * 2 * Math.PI
    }
  },
  computed: {
    offset() {
      return (1 - this.progress) * this.circumference
    }
  },
  mounted() {
    this.$refs.orbit.style.strokeDasharray = `${this.circumference} ${this.circumference}`
    this.$refs.orbit.style.strokeDashoffset = this.offset
  }
}
</script>

<style lang="scss" scoped>
circle {
  transition: 0.35s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
