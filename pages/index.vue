<template>
  <div class="container">
    <div class="panel-group">
      <div v-for="i in row" :key="i" class="row">
        <div v-for="j in column" :id="id(i, j)" :key="j" class="column">
          <Panel :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  components: { Panel },
  data() {
    return {
      row: 5,
      column: 5,
      data: {
        duration: Math.random()
      }
    }
  },
  methods: {
    id(i, j) {
      return `${i - 1}${j - 1}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_colors.scss';

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: $bg-color;

  .row {
    display: flex;
  }
}
</style>
