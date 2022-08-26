<template>
  <div class='home'>
    <div id='mars3dContainer' class='mars3d-container'></div>
  </div>
</template>

<script>
import * as mars3d from 'mars3d'
const Cesium = mars3d.Cesium
export default {
  name: 'HomView',
  data() {
    return {
    }
  },
  async mounted() {
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
      this.map.scene.skyBox = new Cesium.SkyBox({
        sources: {
          negativeX: './image/tycho2t3_80_mx.jpg',
          negativeY: './image/tycho2t3_80_my.jpg',
          negativeZ: './image/tycho2t3_80_mz.jpg',
          positiveX: './image/tycho2t3_80_px.jpg',
          positiveY: './image/tycho2t3_80_py.jpg',
          positiveZ: './image/tycho2t3_80_pz.jpg'
        }
      })
      const graphicLayer = new mars3d.layer.GraphicLayer()
      this.map.addLayer(graphicLayer)
      const satellite = new mars3d.graphic.Satellite({
        name: "atongmu",
        tle1: "1 39150U 13018A   21180.50843864  .00000088  00000-0  19781-4 0  9997",
        tle2: "2 39150  97.8300 252.9072 0018449 344.7422  15.3253 14.76581022440650",
        model: {
          url: "https://updatetile.obs.cn-north-4.myhuaweicloud.com/gltf/weixin.gltf",
          cale: 1,
          minimumPixelSize: 90,
          autoHeading: true,
          show: true
        },
        label: {
          color: "#ffffff",
          opacity: 1,
          font_family: "楷体",
          font_size: 30,
          outline: true,
          outlineColor: "#000000",
          outlineWidth: 3,
          background: true,
          backgroundColor: "#000000",
          backgroundOpacity: 0.5,
          font_weight: "normal",
          font_style: "normal",
          pixelOffsetX: 0,
          pixelOffsetY: -20,
          scaleByDistance: true,
          scaleByDistance_far: 10000000,
          scaleByDistance_farValue: 0.4,
          scaleByDistance_near: 100000,
          scaleByDistance_nearValue: 1,
          show: true
        },
        cone: {
          sensorType: mars3d.graphic.SatelliteSensor.Type.Rect,
          angle1: 10,
          angle2: 5,
          color: "rgba(0,255,255,0.5)",
          reverse: false,
          show: true
        },
        path: {
          show: true,
          color: "#00ff00",
          opacity: 0.5,
          width: 1
        },
        fixedFrameTransform: Cesium.Transforms.localFrameToFixedFrameGenerator("east", "south"),
        attr: { name: "阿童木" },
      })
      graphicLayer.addGraphic(satellite)
    },
  },
}
</script>
<style scoped>
.mars3d-container {
  height: 99vh
}
</style>
