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
    />

    <!-- on-play background -->
    <circle
      class="background"
      :r="orbitRadius - strokeWidth / 2"
      stroke="none"
      fill="#222"
      cx="50"
      cy="50"
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
circle {
  transition: stroke-dashoffset 0.3s ease-in-out;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.background {
  display: none;
}

.play .background {
  display: block;
}
</style>
