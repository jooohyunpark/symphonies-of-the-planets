<template>
  <div class="panel" :style="{ width: size + 'px', height: size + 'px' }"></div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 100,
    },
  },
}
</script>

<style lang="scss" scoped>
.panel {
  border: 1px solid gray;
}
</style>
