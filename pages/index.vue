<template>
  <div class="app" @click="start = true">
    <transition name="fade">
      <div v-if="piano && piano.loaded" class="panel-group">
        <div v-for="i in row" :key="i" class="row">
          <div v-for="j in column" :id="id(i, j)" :key="j" class="column">
            <Panel
              :data="data[i - 1][j - 1]"
              :info="info"
              :size="size"
              :start="start"
              :piano="piano"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Sampler } from 'tone'
import source_keys from '@/data/source_keys'
import Panel from '@/components/Panel'
import __data from '@/data/planets.json'

export default {
  components: { Panel },
  data() {
    return {
      row: Number(this.$route.query.row) || 1,
      column: Number(this.$route.query.column) || 3,
      size: Math.max(Number(this.$route.query.size) || 160, 120),
      data: [],
      info: {},
      start: false,
      piano: null
    }
  },
  created() {
    console.log('original data size: ', __data.length)

    const _data = __data.filter(d => {
      return (
        (d.pl_name && d.pl_radj && d.pl_orbper && d.pl_bmassj && d.st_dist) !==
        null
      )
    })

    console.log('filtered data size: ', _data.length)

    console.log('orbit period min: ', this.min(_data, 'pl_orbper'))
    console.log('orbit period max: ', this.max(_data, 'pl_orbper'))
    console.log('radius min: ', this.min(_data, 'pl_radj'))
    console.log('radius max: ', this.max(_data, 'pl_radj'))
    console.log('mass min: ', this.min(_data, 'pl_bmassj'))
    console.log('mass max: ', this.max(_data, 'pl_bmassj'))
    console.log('distance min: ', this.min(_data, 'st_dist'))
    console.log('distance max: ', this.max(_data, 'st_dist'))

    this.info = {
      pl_orbper_min: this.min(_data, 'pl_orbper'),
      pl_orbper_max: this.max(_data, 'pl_orbper'),
      pl_radj_max: this.max(_data, 'pl_radj'),
      pl_radj_min: this.min(_data, 'pl_radj'),
      pl_bmassj_max: this.max(_data, 'pl_bmassj'),
      pl_bmassj_min: this.min(_data, 'pl_bmassj'),
      st_dist_max: this.max(_data, 'st_dist'),
      st_dist_min: this.min(_data, 'st_dist')
    }

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
    this.init_piano()
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
    },
    init_piano() {
      const path = {}

      const computed_key = val => {
        return val.replace('#', 's')
      }

      source_keys.map(key => {
        path[key] = require(`@/assets/sounds/${computed_key(key)}.ogg`)
      })

      this.piano = new Sampler(path, { release: 1 }).toMaster()
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

  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 0.3s ease-in-out;
  }
}
</style>
