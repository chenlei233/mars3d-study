<template>
  <div id="app">
    <router-view/>
    <div class="nav">
      <div v-for="item in list" :key="item.value" @click="go(item.value)">{{ item.label }}</div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      list: [
        {
          label: '坐标',
          value: 'coordinate',
        },
        {
          label: '绘制',
          value: 'draw',
        },
        {
          label: '加载geojson数据',
          value: 'geojson',
        },
        {
          label: '地区',
          value: 'area',
        },
        {
          label: '加载wms',
          value: 'wms',
        },
        {
          label: '控制图层压盖',
          value: 'z-index',
        },
        {
          label: '轨道',
          value: 'orbital',
        },
      ],
    }
  },
  methods: {
    go(name) {
      this.$router.push({name})
    }
  },
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.nav {
  position: absolute;
  z-index: 999;
  color: red;
  right: 50px;
  top: 40%;
  background: #fff;
  padding: 20px;
  div {
    cursor: pointer;
    margin-bottom: 20px;
  }
}
</style>
