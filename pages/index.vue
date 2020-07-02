<template>
  <div>
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
                :time="time"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="poster">Symphonies of the Planets</div>
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
      row: Number(this.$route.query.row) || 3,
      column: Number(this.$route.query.column) || 5,
      size: Math.max(Number(this.$route.query.size) || 160, 120),
      time: Number(this.$route.query.time) || 60,
      data: [],
      info: {},
      start: false,
      piano: null
    }
  },
  created() {
    console.log('original data size: ', __data.length)

    let _data = __data.filter(d => {
      return (d.pl_name && d.pl_radj && d.pl_orbper && d.st_dist) !== null
    })

    console.log('cleaned data size: ', _data.length)

    this.info = {
      pl_orbper_min: this.min(_data, 'pl_orbper'),
      pl_orbper_max: this.max(_data, 'pl_orbper'),
      pl_radj_max: this.max(_data, 'pl_radj'),
      pl_radj_min: this.min(_data, 'pl_radj'),
      // pl_massj_max: this.max(_data, 'pl_massj'),
      // pl_massj_min: this.min(_data, 'pl_massj'),
      st_dist_max: this.max(_data, 'st_dist'),
      st_dist_min: this.min(_data, 'st_dist')
    }

    console.log('orbit period min: ', this.info.pl_orbper_min)
    console.log('orbit period max: ', this.info.pl_orbper_max)
    console.log('radius min: ', this.info.pl_radj_min)
    console.log('radius max: ', this.info.pl_radj_max)
    // console.log('mass min: ', this.info.pl_massj_min)
    // console.log('mass max: ', this.info.pl_massj_max)
    console.log('distance min: ', this.info.st_dist_min)
    console.log('distance max: ', this.info.st_dist_max)

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

      this.piano = new Sampler(path, {
        attack: 0,
        release: 1,
        curve: 'exponential'
      }).toMaster()
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;

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

.poster {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  background: #000;
  color: #fff;
  font-size: 18px;
  letter-spacing: 2px;
  z-index: 100;
}

@media screen and (max-width: 1056px) {
  .app {
    display: none;
  }

  .poster {
    display: flex;
  }
}
</style>
