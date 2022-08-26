<template>
  <div class='home'>
    <div id='mars3dContainer' class='mars3d-container'></div>
  </div>
</template>

<script>
import * as mars3d from 'mars3d'
import proj4 from 'proj4'
export default {
  name: 'HomView',
  data() {
    return {
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const mapOptions = {
        scene: {
          //默认视角参数
          center:{ lat: 30.054604, lng: 108.885436, alt: 17036414, heading: 0, pitch: -90 },
          shadows: false, //是否启用日照阴影
          removeDblClick: true, //是否移除Cesium默认的双击事件

          //以下是Cesium.Viewer所支持的options【控件相关的写在另外的control属性中】
          sceneMode: 3, //3等价于Cesium.SceneMode.SCENE3D,

          //以下是Cesium.Scene对象相关参数
          showSun: true, //是否显示太阳
          showMoon: true, //是否显示月亮
          showSkyBox: true, //是否显示天空盒
          showSkyAtmosphere: true, //是否显示地球大气层外光圈
          fog: true, //是否启用雾化效果
          fxaa: true, //是否启用抗锯齿

          //以下是Cesium.Globe对象相关参数
          globe: {
            depthTestAgainstTerrain: false, //是否启用深度监测
            baseColor: '#546a53', //地球默认背景色
            showGroundAtmosphere: true, //是否在地球上绘制的地面大气
            enableLighting: false //是否显示昼夜区域
          },
          //以下是Cesium.ScreenSpaceCameraController对象相关参数
          cameraController: {
            zoomFactor: 3.0, //鼠标滚轮放大的步长参数
            minimumZoomDistance: 1, //地球放大的最小值（以米为单位）
            maximumZoomDistance: 50000000, //地球缩小的最大值（以米为单位）
            enableRotate: true, //2D和3D视图下，是否允许用户旋转相机
            enableTranslate: true, //2D和哥伦布视图下，是否允许用户平移地图
            enableTilt: true, // 3D和哥伦布视图下，是否允许用户倾斜相机
            enableZoom: true, // 是否允许 用户放大和缩小视图
            enableCollisionDetection: true //是否允许 地形相机的碰撞检测
          }
        },
        control: {
          baseLayerPicker: true, //basemaps底图切换按钮
          homeButton: true, //视角复位按钮
          sceneModePicker: true, //二三维切换按钮
          navigationHelpButton: true, //帮助按钮
          fullscreenButton: true, //全屏按钮 
          contextmenu: { 
            hasDefault: true, //不显示右键菜单
          },
        },
        terrain: {
          url: 'http://data.mars3d.cn/terrain',
          show: true
        },
        basemaps: [
          {
            name: '天地图影像',
            type: 'group',
            layers: [
              {
                name: '底图',
                type: 'tdt',
                layer: 'img_d',
                key: ['eb6ea6e1715a5f581eca71813dc4317e'],
              },
              {
                name: '注记',
                type: 'tdt',
                layer: 'img_z',
                key: ['eb6ea6e1715a5f581eca71813dc4317e'],
              }
            ],
            show: true,
          },
        ],
      }
      this.map = new mars3d.Map('mars3dContainer', mapOptions)
      const locationBar = new mars3d.control.LocationBar({
        fps: true,
        template: '<div>经度:{lng}</div><div>纬度:{lat}</div> <div>海拔：{alt}米</div> <div>层级：{level}</div><div>方向：{heading}度</div> <div>俯仰角：{pitch}度</div><div>视高：{cameraHeight}米</div>'
      })
      this.map.addControl(locationBar)
      this.map.on('click', (e) => {
        proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')
        proj4.defs('EPSG:4525', '+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=37500000 +y_0=0 +ellps=GRS80 +units=m +no_defs')
        alert(
          `经度:${mars3d.LngLatPoint.fromCartesian(e.cartesian)._lng},纬度:${mars3d.LngLatPoint.fromCartesian(e.cartesian)._lat},高程:${mars3d.LngLatPoint.fromCartesian(e.cartesian)._alt}\n横坐标:${proj4('EPSG:4326', 'EPSG:4525', [ mars3d.LngLatPoint.fromCartesian(e.cartesian)._lng, mars3d.LngLatPoint.fromCartesian(e.cartesian)._lat ])[0]},纵坐标:${proj4('EPSG:4326', 'EPSG:4525', [ mars3d.LngLatPoint.fromCartesian(e.cartesian)._lng, mars3d.LngLatPoint.fromCartesian(e.cartesian)._lat ])[1]} (CGCS2000  4525)`
        )
      })
    },
  },
}
</script>
<style scoped>
.mars3d-container {
  height: 99vh
}
</style>
