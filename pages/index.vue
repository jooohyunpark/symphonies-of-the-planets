<template>
  <div class="container">
    <div class="panel-group">
      <div v-for="i in row" :key="_computed(i)" class="row">
        <div
          v-for="j in column"
          :id="`${_computed(i)}${_computed(j)}`"
          :key="_computed(j)"
          class="column"
        >
          <Panel :size="80" :on="true" />
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
      column: 10
    }
  },
  methods: {
    _computed(val) {
      return val - 1
    }
  }
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
