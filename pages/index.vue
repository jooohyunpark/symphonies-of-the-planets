<template>
  <div class="app">
    <div class="panel-group">
      <div v-for="i in row" :key="i" class="row">
        <div v-for="j in column" :id="id(i, j)" :key="j" class="column">
          <Panel :data="data[i - 1][j - 1]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import data from '@/data/data.json'

export default {
  components: { Panel },
  data() {
    return {
      row: 4,
      column: 6,
      data: []
    }
  },
  created() {
    console.log('original data size: ', data.length)

    const _data = data.filter(d => {
      return (d.pl_name && d.pl_radj && d.pl_orbper) !== null
    })

    console.log('filtered data size: ', _data.length)

    console.log('orbit min: ', this.min(_data, 'pl_orbper'))
    console.log('orbit max: ', this.max(_data, 'pl_orbper'))

    for (let i = 0; i < this.row; i++) {
      const row_data = []
      for (let j = 0; j < this.column; j++) {
        const random_index = Math.floor(Math.random() * _data.length)
        row_data.push(_data[random_index])
      }
      this.data.push(row_data)
    }
  },
  mounted() {
    console.log('data: ', this.data)
  },
  methods: {
    id(i, j) {
      return `${i - 1}${j - 1}`
    },
    min(data, key) {
      return data.reduce(
        (min, p) => (p[key] < min ? p[key] : min),
        data[0][key]
      )
    },
    max(data, key) {
      return data.reduce(
        (max, p) => (p[key] > max ? p[key] : max),
        data[0][key]
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/_colors.scss';

.app {
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
