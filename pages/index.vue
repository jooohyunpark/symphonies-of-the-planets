<template>
  <div class="container">
    <div class="panel-group">
      <div v-for="i in row" :key="_computed(i)" class="row">
        <div
          class="column"
          v-for="j in column"
          :key="_computed(j)"
          :id="`${_computed(i)}${_computed(j)}`"
        >
          <Panel :size="80" />
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
      row: 10,
      column: 10,
    }
  },
  methods: {
    _computed(val) {
      return val - 1
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #181818;
}
.row {
  display: flex;
}
</style>
