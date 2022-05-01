<template>
  <div v-loading="isLoading" class="flow-container">
    <el-container class="flow-chart-body">
      <el-header class="flow-chart-body-header">
        <NodeMenu
          ref="nodeMenu"
          @dropNode="dropNode"
        />
      </el-header>
      <el-main class="flow-chart-body-content">
        <!-- 流程圖畫布區塊 -->
        <div class="entire-chart">
          <div id="nodeContainer" ref="nodeContainer">
            <template v-for="(node, index) in nodeList">
              <FlowNode
                :id="node.id"
                :key="node.id"
                :node="node"
                :node-index="index"
                :flow-chart-data="flowChartData"
                @changeNodeSite="changeNodeSite"
                @deleteNode="deleteNode(index, node)"
                @selectOtherFlow="selectOtherFlow(node)"
              />
            </template>
          </div>
        </div>
      </el-main>
      <!-- 縮放工具欄 -->
      <div class="flow-chart-toolbar">
        <div class="flow-chart-toolbar__item" @click="setZoom(1.25)">
          <i class="el-icon-plus"></i>
        </div>
        <div class="flow-chart-toolbar__item" @click="setZoom(0.75)">
          <i class="el-icon-minus"></i>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import { jsPlumb } from 'jsplumb'
import NodeMenu from '@/views/setting/site/flow_chart/node_menu'
import FlowNode from '@/views/setting/site/flow_chart/flow_node'
import { FlowNodeData } from '@/utils/constructors.js'

export default {
  name: 'FlowChartBody',
  components: {
    NodeMenu,
    FlowNode
  },
  data() {
    return {
      flowChartData: {
        'flow_id': 'FL481WavdeSKj',
        'site_id': 'WS3SXyGDtjQmq',
        'flow_name': '新流程',
        'enable': true,
        'nodes': [
          {
            'id': 'GR481WaxCkGSU',
            'flow_id': 'FL481WavdeSKj',
            'is_root': true,
            'is_ring': false,
            'name': '根节点123',
            'left': '43.3333px',
            'top': '298.333px',
            'connect_target': '',
            'connect_flow_id': '',
            'messages': [
              {
                'id': 'BL4n2ghQFaiGU',
                'type': 'card',
                'content': '請選擇你遇到的問題',
                'options': [
                  {
                    'id': 'OP4n2ghQFaiGV',
                    'value': '入款問題',
                    'connect_target': 'GR481WiEbTfur'
                  },
                  {
                    'id': 'OP4n2ghQFwNwu',
                    'value': '出款問題',
                    'connect_target': 'GR4n2ghQEMNTj'
                  },
                  {
                    'id': 'OP4n2ghQFUim5',
                    'value': '信用卡問題',
                    'connect_target': 'GR4n2ghQEMNTk'
                  }
                ]
              }
            ]
          },
          {
            'id': 'GR481WiEbTfuq',
            'flow_id': 'FL481WavdeSKj',
            'is_root': false,
            'is_ring': true,
            'name': '轉接真人',
            'left': '884px',
            'top': '134px',
            'connect_target': '',
            'connect_flow_id': '',
            'messages': [
              {
                'id': 'BL4n2ghQGDhZf',
                'type': 'text',
                'text': '好的了解，接下來幫你轉接真人客服。',
                'options': []
              }
            ]
          },
          {
            'id': 'GR481WiEbTfur',
            'flow_id': 'FL481WavdeSKj',
            'is_root': false,
            'is_ring': false,
            'name': '入款問題',
            'left': '466px',
            'top': '54.3333px',
            'connect_target': '',
            'connect_flow_id': '',
            'messages': [
              {
                'id': 'BL4n2ghQHohCq',
                'type': 'card',
                'content': '入款遇到什麼問題',
                'options': [
                  {
                    'id': 'OP4n2ghQHKMs1',
                    'value': '連線異常',
                    'connect_target': 'GR481WiEbTfuq'
                  },
                  {
                    'id': 'OP4n2ghQJ8hgA',
                    'value': '款項沒有儲值成功',
                    'connect_target': 'GR481WiEbTfuq'
                  }
                ]
              }
            ]
          },
          {
            'id': 'GR4n2ghQEMNTj',
            'flow_id': 'FL481WavdeSKj',
            'is_root': false,
            'is_ring': false,
            'name': '出款問題',
            'left': '466px',
            'top': '437.667px',
            'connect_target': '',
            'connect_flow_id': '',
            'messages': [
              {
                'id': 'BL4n2ghQKYLnw',
                'type': 'card',
                'content': '出款遇到什麼問題',
                'options': [
                  {
                    'id': 'OP4n2ghQLmgc7',
                    'value': '連線異常2',
                    'connect_target': 'GR481WiEbTfuq'
                  },
                  {
                    'id': 'OP4n2ghQLHL1G',
                    'value': '沒有到帳',
                    'connect_target': 'GR481WiEbTfuq'
                  }
                ]
              }
            ]
          },
          {
            'id': 'GR4n2ghQEMNTk',
            'flow_id': 'FL481WavdeSKj',
            'is_root': false,
            'is_ring': false,
            'name': '信用卡問題',
            'left': '467.333px',
            'top': '822px',
            'connect_target': '',
            'connect_flow_id': '',
            'messages': [
              {
                'id': 'BL4n2ghQMsKDS',
                'type': 'card',
                'content': '信用卡遇到什麼事情',
                'options': [
                  {
                    'id': 'OP4n2ghQMQfts',
                    'value': '卡片被盜',
                    'connect_target': 'GR481WiEbTfuq'
                  },
                  {
                    'id': 'OP4n2ghQNcKi3',
                    'value': '卡片遺失',
                    'connect_target': 'GR481WiEbTfuq'
                  }
                ]
              }
            ]
          }
        ]
      },
      // 縮放
      zoom: 1,
      isLoading: false,
      siteSettingData: {
        avatar_url: '',
        name: '智能客服'
      },
      submitErrorMessage: '',
      jsplumbSetting: {
        // 动态锚点、位置自适应
        Anchors: [
          'Right',
          'RightMiddle',
          'Top',
          'TopCenter',
          'TopRight',
          'TopLeft',
          'Bottom',
          'BottomCenter',
          'BottomRight',
          'BottomLeft',
          'Left',
          'LeftMiddle'
        ],
        // 容器ID
        Container: 'nodeContainer',
        // 连线的样式，直线或者曲线等，可选值:  StateMachine、Flowchart，Bezier、Straight
        Connector: ['Bezier', { curviness: 100 }],
        // Connector: ['Straight', {stub: 20, gap: 1}],
        // Connector: ['Flowchart', {stub: 30, gap: 1, alwaysRespectStubs: false, midpoint: 0.5, cornerRadius: 10}],
        // Connector: ['StateMachine', {margin: 5, curviness: 10, proximityLimit: 80}],
        // 鼠标不能拖动删除线
        ConnectionsDetachable: true,
        // 鼠標拖曳時沒放到對應端點會復原原來的連線
        // ReattachConnections: true,
        // 删除线的时候节点不删除
        DeleteEndpointsOnDetach: false,
        /**
         * 连线的两端端点类型：圆形
         * radius: 圆的半径，越大圆越大
         */
        Endpoint: ['Blank', { Overlays: '' }],
        // EndpointStyle: { fill: '#1879ffa1', outlineWidth: 2 },
        // 是否打开jsPlumb的内部日志记录
        LogEnabled: true,
        /**
         * 连线的样式
         */
        PaintStyle: {
          // 线的颜色
          stroke: '#aaaaaa',
          // 线的粗细，值越大线越粗
          strokeWidth: 1,
          // 设置外边线的颜色，默认设置透明，这样别人就看不见了，点击线的时候可以不用精确点击，参考 https://blog.csdn.net/roymno2/article/details/72717101
          outlineStroke: 'transparent',
          // 线外边的宽，值越大，线的点击范围越大
          outlineWidth: 10
        },
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        /**
         *  叠加 参考： https://www.jianshu.com/p/d9e9918fd928
         */
        Overlays: [
          // 箭头叠加
          [
            'Arrow',
            {
              width: 10, // 箭头尾部的宽度
              length: 8, // 从箭头的尾部到头部的距离
              location: 1, // 位置，建议使用0～1之间
              direction: 1, // 方向，默认值为1（表示向前），可选-1（表示向后）
              foldback: 0.623 // 折回，也就是尾翼的角度，默认0.623，当为1时，为正三角
            }
          ]
        ],
        // 绘制图的模式 svg、canvas
        RenderMode: 'svg',
        // 鼠标滑过线的样式
        HoverPaintStyle: { stroke: '#aed8f3', strokeWidth: 3 },
        // 滑过锚点效果
        // EndpointHoverStyle: {fill: 'red'}
        Scope: 'jsPlumb_DefaultScope' // 范围，具有相同scope的点才可连接
      },
      targetAnchors: ['TopLeft']
    }
  },
  computed: {
    nodeList() {
      return this.$store.state.flowChart.nodeList
    },
    jsPlumb() {
      return this.$store.state.flowChart.jsPlumbInstance
    }
  },
  mounted() {
    // 导入默认配置
    const jsPlumbInstance = jsPlumb.getInstance(this.jsplumbSetting)
    this.$store.commit('flowChart/SET_PLUMB_INSTANCE', jsPlumbInstance)
    this.$nextTick(() => {
      this.jsPlumbInit()
    })

    this.$el.addEventListener('mouseover', this.setHover)
  },
  destroyed() {
    this.$store.commit('flowChart/RESET_NODE_LIST')
    this.$el.removeEventListener('mouseover', this.setHover)
  },
  methods: {
    jsPlumbInit() {
      this.jsPlumb.ready(() => {
        // 会使整个jsPlumb暫停渲染。
        this.jsPlumb.setSuspendDrawing(true)
        const optionsMakeSource = []
        const connectionList = []
        const flowData = this.flowChartData.nodes
        flowData.forEach((node, Nodeindex) => {
          this.addNode(new FlowNodeData(node))
          // 添加節點連線
          if (node.connect_target) {
            connectionList.push({
              source: node.id + '-endpoint',
              target: node.connect_target
            })
          }

          // 添加 card options 端點及連線
          const cardMessages = node.messages.filter((message) => message.type === 'card')
          if (cardMessages.length > 0) {
            cardMessages.forEach((card) => {
              if (card.options && card.options.length > 0) {
                card.options.forEach((option) => {
                  // 端點
                  optionsMakeSource.push({
                    optionId: option.id + '-endpoint',
                    endpoint: 'Blank',
                    isSource: true,
                    anchor: 'Right',
                    maxConnections: 1
                  })
                  if (option.connect_target) {
                    // 連線
                    connectionList.push({
                      source: option.id + '-endpoint',
                      target: option.connect_target
                    })
                  }
                })
              }
            })
          }
        })

        // 等 dom 完成後渲染端點及連線
        this.$nextTick(() => {
          optionsMakeSource.forEach((source) => {
            this.jsPlumb.makeSource(source.optionId, source)
          })
          connectionList.forEach((connection) => {
            this.jsPlumb.connect(connection)
          })
          // 会使整个jsPlumb立即重绘。
          this.jsPlumb.setSuspendDrawing(false, true)
        })

        // 当连接建立前
        this.jsPlumb.bind('beforeDrop', this.beforeDrop)

        // 連線建立時觸發
        this.jsPlumb.bind('connection', this.connectionHandler)

        // 連線删除時觸發
        this.jsPlumb.bind('connectionDetached', this.connectionDetached)

        // click 连接点击事件
        this.jsPlumb.bind('click', this.clickConnection)
      })
    },
    // 拖曳計算添加節點
    dropNode(evt, nodeMenu) {
      const screenX = evt.originalEvent.clientX
      const screenY = evt.originalEvent.clientY
      const nodeContainer = this.$refs.nodeContainer
      const containerRect = nodeContainer.getBoundingClientRect()
      let left = screenX
      let top = screenY
      // 计算是否拖入到容器中
      if (
        left < containerRect.x ||
        left > containerRect.width + containerRect.x ||
        top < containerRect.y ||
        containerRect.y > containerRect.y + containerRect.height
      ) {
        this.$message.error('請把節點拖入到畫布中')
        return
      }
      left = (left - containerRect.x + nodeContainer.scrollLeft) / this.zoom
      top = (top - containerRect.y + nodeContainer.scrollTop) / this.zoom
      // 居中
      left -= 85
      top -= 16

      const node = new FlowNodeData({
        name: '子節點', // node 名稱
        left: left + 'px', // 座標
        top: top + 'px' // 座標
      })

      /**
       * 这里可以进行业务判断、是否能够添加该节点
       */
      this.addNode(node)
    },
    // 添加節點 FlowNodeData
    addNode(node) {
      this.$store.commit('flowChart/PUSH_NODE_LIST', node)
      // this.nodeList.push(node)
      this.$nextTick(() => {
        this.jsPlumb.makeTarget(node.id, {
          endpoint: 'Blank',
          // endpoint: ['Dot', { radius: 7 }],
          paintStyle: { fill: '#aed8f3' },
          anchor: [0, 0, -1, 0, -2, 20]
          // anchors: this.targetAnchors
        })

        this.jsPlumb.draggable(node.id, {
          filter: '.block > div',
          // filterExclude: false,
          containment: 'parent',
          hoverClass: 'CustomHoverClass'
        })

        // 為 node 添加端點
        this.jsPlumb.makeSource(`${node.id}-endpoint`, {
          endpoint: 'Blank',
          isSource: true,
          anchor: 'Right',
          maxConnections: 1
        })
      })
    },
    // 監聽滑標，拿來顯示 tooltip
    setHover(e) {
      // 取得元素 ID，沒有的話拿取父元素
      const getElementId = (el, count) => {
        return el.id !== '' ? el.id : count === 0 ? '' : getElementId(el.parentElement, count - 1)
      }
      const setValue = getElementId(e.target, 5)
      if (setValue) {
        this.$store.dispatch('flowChart/setTooltip', setValue)
      }
    },
    // 同步節點座標
    changeNodeSite({ nodeId, left, top }) {
      this.$store.commit('flowChart/CHANGE_NODE_SITE', { nodeId, left, top })
    },
    // 删除節點
    deleteNode(listIndex, node) {
      this.jsPlumb.remove(node.id)
      this.$store.commit('flowChart/SPLICE_NODE_LIST', listIndex)
      this.$store.dispatch('flowChart/repaintEverything')
    },
    // 官方縮放函式
    setZoom(zoom) {
      this.zoom = this.zoom * zoom
      const instance = this.jsPlumb
      const el = instance.getContainer()
      var p = ['webkit', 'moz', 'ms', 'o']
      var s = 'scale(' + this.zoom + ')'
      var oString = 'top left'

      for (var i = 0; i < p.length; i++) {
        el.style[p[i] + 'Transform'] = s
        el.style[p[i] + 'TransformOrigin'] = oString
      }

      el.style['transform'] = s
      el.style['transformOrigin'] = oString

      instance.setZoom(this.zoom)
    },
    // 当连接建立前做些相關的驗證
    beforeDrop(info) {
      const sourceData = info.connection.source.dataset
      const targetData = info.connection.target.dataset
      if (sourceData.nodeId === targetData.nodeId) {
        this.$message.error('端節點不能連線到自己的節點')
        return false
      }
      return true
    },
    // 連線建立時觸發
    connectionHandler(info) {
      const sourceData = info.source.dataset
      const targetData = info.target.dataset
      switch (sourceData.type) {
        case 'nodePoint':
          this.nodeList[sourceData.nodeIndex].connect_target = targetData.nodeId
          break
        case 'cardOption':
          this.nodeList[sourceData.nodeIndex].messages[sourceData.messageIndex].options[
            sourceData.optionIndex
          ].connect_target = targetData.nodeId
          break
        default:
          break
      }
    },
    // 連線删除時觸發
    connectionDetached(info) {
      const sourceData = info.source.dataset
      // const targetData = info.target.dataset
      switch (sourceData.type) {
        case 'nodePoint':
          this.nodeList[sourceData.nodeIndex].connect_target = null
          break
        case 'cardOption':
          this.nodeList[sourceData.nodeIndex].messages[sourceData.messageIndex].options[
            sourceData.optionIndex
          ].connect_target = null
          break
        default:
          break
      }
    },
    // click 连接点击事件
    clickConnection(connection) {
      this.$confirm('是否刪除該連線', '提示', {
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.jsPlumb.deleteConnectionsForElement(connection.sourceId)
        })
        .catch(() => {
          // do nothing
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;

  .flow-chart {
    &-body {
      border-top: 1px solid #c9d1da;
      border-right: 1px solid #c9d1da;
      border-bottom: 1px solid #c9d1da;

      &-content {
        position: relative;
        border-top: 1px solid #c9d1da;

        .entire-chart {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 3000px;
          height: 2600px;
        }

        #nodeContainer {
          height: 100%;
          position: relative;
          background: rgb(242, 245, 250);
        }
      }
    }

    &-toolbar {
      position: absolute;
      right: 30px;
      top: 46%;
      padding: 4px;
      background: white;
      box-shadow: 0 0 0 2px #c9d1da;
      border-radius: 4px;
      z-index: 500;
      transition: right 0.4s;

      &__item {
        padding: 8px;

        &:nth-child(n + 2) {
          border-top: #c9d1da solid 1px;
        }

        &:hover {
          background-color: #eaeff5;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
