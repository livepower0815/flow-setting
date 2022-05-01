<template>
  <div
    :id="node.id"
    ref="node"
    class="block"
    :style="nodeContainerStyle"
    data-type="node"
    :data-node-id="node.id"
    :data-node-index="nodeIndex"
    @mouseup="changeNodeSite"
    @mousedown="mousedownHandler"
    @mouseleave="mouseleaveHandler"
  >
    <!-- 起始節點顯示 -->
    <div v-if="isRoot" class="block-start">
      <div class="block-start-icon">
        <i class="el-icon-right"></i>
      </div>
      <div class="block-start-text">開始</div>
    </div>

    <!-- 節點名稱 -->
    <div class="block-header">
      <span v-if="!editNodeName">{{ formatName(node.name) }}</span>
      <input
        v-else
        ref="nodeNameInput"
        v-model="node.name"
        :class="{'error-border': node.name.trim() === '' || node.name.length > 20}"
        type="text"
        @blur="switchNameMode(false)"
      >
      <span class="block-header-tool">
        <i v-if="!editNodeName" class="el-icon-edit" @click="switchNameMode(true)"></i>
      </span>
    </div>

    <template v-for="(message, msgIndex) in node.messages">
      <!-- 文字區塊 -->
      <div
        v-if="message.type === 'text'"
        :id="message.id"
        :key="`text-${message.id}`"
        class="block-text"
        :class="{'error-border': message.text.trim() === ''}"
      >
        <el-input
          v-model="message.text"
          size="mini"
          placeholder="請輸入文字內容"
          type="textarea"
          maxlength="1000"
          show-word-limit
          resize="none"
          :rows="3"
        />
        <BlockTooltip
          :show="showMessageTooltip(message.id)"
          :top="0"
          :left="-34"
          @delete="deleteMessage(msgIndex, node, message)"
        />
      </div>

      <!-- 聊天卡片區塊 -->
      <ChatCard
        v-if="message.type === 'card'"
        :key="`chatcard-${message.id}`"
        :card="message"
        :node="node"
        :node-index="nodeIndex"
        :message-index="msgIndex"
      >
        <template #tooltip>
          <BlockTooltip
            :show="showMessageTooltip(message.id)"
            :top="0"
            :left="-34"
            @delete="deleteMessage(msgIndex, node, message)"
          />
        </template>
      </ChatCard>
    </template>

    <!-- 转接真人客服 -->
    <div v-if="isRing" :id="`${node.id}-ring`" class="block-action">
      <i class="el-icon-service block-action__icon"></i>
      <span class="block-action__content">轉接真人客服</span>
      <!-- 節點工具列 -->
      <BlockTooltip
        :show="showMessageTooltip(`${node.id}-ring`)"
        :top="0"
        :left="-34"
        @delete="deleteRing"
      />
    </div>

    <!-- 添加选项 -->
    <div
      class="block-add"
    >
      <el-dropdown trigger="click" placement="top" @command="handleCommand($event, node)">
        <span class="block-add__content">
          <i class="el-icon-plus" style="margin-right: 8px;"></i> 添加選項
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="contentOptionCard">添加文字 ＋ 選項按鈕</el-dropdown-item>
          <el-dropdown-item command="text">添加文字</el-dropdown-item>
          <el-dropdown-item :disabled="isRing || node.connect_flow_id !== null" divided command="ring">轉接真人客服</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 節點工具列 -->
    <BlockTooltip
      :show="showTooltip && !isRoot"
      :top="-42"
      :left="132"
      @delete="deleteNode"
    />

    <!-- :class="{'has-target': node.connect_target !== null}" -->
    <!-- 節點 source 拿來串另一個 flow -->
    <div
      v-show="!isRing && node.connect_flow_id === null"
      :id="`${node.id}-endpoint`"
      ref="nodeEndpoint"
      class="block-endpoint"
      data-type="nodePoint"
      :data-node-id="node.id"
      :data-endpoint-id="`${node.id}-endpoint`"
      :data-node-index="nodeIndex"
    >
    </div>
  </div>
</template>

<script>
import ChatCard from '@/views/setting/site/flow_chart/chat_card'
import BlockTooltip from '@/views/setting/site/flow_chart/block_tooltip'
import { TextMessage, ContentOptionCardMessage } from '@/utils/constructors.js'

export default {
  name: 'FlowNode',
  components: {
    ChatCard,
    BlockTooltip
  },
  props: {
    node: {
      type: Object,
      required: true
    },
    nodeIndex: {
      type: [Number, String],
      required: true
    },
    flowChartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editNodeName: false,
      isImgLoading: false
    }
  },
  computed: {
    // 节点容器样式
    nodeContainerStyle() {
      return {
        top: this.node.top,
        left: this.node.left
      }
    },
    showTooltip() {
      return this.$store.state.flowChart.tooltipId === this.node.id
    },
    jsPlumb() {
      return this.$store.state.flowChart.jsPlumbInstance
    },
    isRing() {
      return this.node.is_ring
    },
    isRoot() {
      return this.node.is_root
    }
  },
  methods: {
    // 鼠标移动后抬起
    changeNodeSite() {
      // 避免抖动
      if (this.node.left === this.$refs.node.style.left && this.node.top === this.$refs.node.style.top) {
        return
      }
      this.$emit('changeNodeSite', {
        nodeId: this.node.id,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top
      })
    },
    // 點擊到的節點圖層要上升
    mousedownHandler(event) {
      this.$el.classList.add('over-layout')
    },
    // 離開還原 z-index
    mouseleaveHandler(event) {
      this.$el.classList.remove('over-layout')
    },
    showMessageTooltip(messageId) {
      return this.$store.state.flowChart.tooltipId === messageId
    },
    deleteNode() {
      this.$emit('deleteNode')
    },
    deleteMessage(index, node, message) {
      node.messages.splice(index, 1)
      if (message.type === 'card') {
        this.jsPlumb.remove(message.id)
      }
      this.$store.dispatch('flowChart/repaintEverything')
    },
    // 為節點添加新的 message
    handleCommand(type, node) {
      let message
      switch (type) {
        // 純文字
        case 'text':
          message = new TextMessage()
          break
        // 文字加选项
        case 'contentOptionCard':
          message = new ContentOptionCardMessage()
          break
        case 'ring':
          node.is_ring = true
          node.connect_target = null
          this.jsPlumb.deleteConnectionsForElement(node.id + '-endpoint')
          break
        default:
          console.error('addMessage "type" no match!')
          break
      }
      if (message) {
        node.messages.push(message)

        // 初始化可拖移的節點
        if (type === 'contentOptionCard' || type === 'card') {
          this.$nextTick(() => {
            message.options.forEach(option => {
              this.jsPlumb.makeSource(option.id + '-endpoint', {
                endpoint: 'Blank',
                isSource: true,
                anchor: 'Right',
                maxConnections: 1
              })
            })
          })
        }
      }
      this.$store.dispatch('flowChart/repaintEverything')
    },
    // 切換節點名稱的編輯模式
    switchNameMode(switchValue) {
      if (!switchValue && (this.node.name.trim() === '' || this.node.name.length > 20)) {
        return false
      }
      this.editNodeName = switchValue
      if (switchValue) {
        this.$nextTick(() => {
          this.$refs.nodeNameInput.focus()
        })
      }
    },
    // 删除轉接真人客服
    deleteRing() {
      this.node.is_ring = false
      this.$store.dispatch('flowChart/repaintEverything')
    },
    // 删除連結至其他流程
    deleteFlowRoot() {
      this.node.connect_flow_id = null
      this.$store.dispatch('flowChart/repaintEverything')
    },
    // 過長過濾掉
    formatName(str, limitLength = 10) {
      if (str.length > limitLength) {
        return `${str.slice(0, limitLength)}...`
      }
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  position: absolute;
  box-shadow:  0 0 0 2px #c9d1da;
  border-radius: 20px;
  width: 300px;
  background: rgba(255, 255, 255, 0.79);
  padding: 16px;
  z-index: 300;

  &.over-layout {
    z-index: 800;
  }

  &:hover {
    box-shadow:  0 0 0 3px #aed8f3;
    cursor: grab;
  }

  &>div {
    &:hover {
      cursor: auto;
    }
  }

  .block-start {
    position: absolute;
    left: 0px;
    top: -42px;
    display: flex;
    background-color: white;
    border-radius: 24px;
    padding: 8px;
    box-shadow:  0 0 0 2px #c9d1da;
    font-size: 12px;
    font-weight: 600;
    align-items: center;

    &-icon {
      background-color: rgb(41, 187, 255);
      color: white;
      border-radius: 10px;
      padding: 2px;
      margin-right: 6px;
    }

    &-text {
      color: $Primary;
    }
  }

  &-header {
    font-size: 20px;
    font-weight: 500;
    color: $Primary;
    display: inline-block;

    span {
      display: inline-block;
      padding: 4px;
    }

    input {
      border:none;
      background-image:none;
      background-color:transparent;
      padding: 4px;
      border-radius: 2px;
      box-shadow:  0 0 0 3px #aed8f3;

      // 驗證錯誤的紅框
      &.error-border {
        box-shadow: 0 0 0 2px #f3aeae;
      }

      &:focus {
        outline: none;
      }
    }

    &-tool {
      display: none;
      &:hover {
        color: #2897db;
        cursor: pointer;
      }
    }
  }

  &-image {
    position: relative;
    box-shadow:  0 0 0 2px #c9d1da;
    border-radius: 12px;
    margin-top: 20px;
    &:hover {
      box-shadow:  0 0 0 2px #aed8f3;
    }

    &-uploader {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 120px;

      .image-contain {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center, center;
        height: 100%;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
      .uploader-icon {
        padding: 28px 8px;
      }
    }
  }

  &-text {
    position: relative;
    padding: 8px;
    box-shadow:  0 0 0 2px #c9d1da;
    border-radius: 12px;
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;

    &:hover {
      box-shadow:  0 0 0 2px #aed8f3;
    }
  }

  &-action {
    position: relative;
    padding: 8px;
    box-shadow:  0 0 0 2px #c9d1da;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 12px;

    &:hover {
      box-shadow:  0 0 0 2px #aed8f3;
    }

    &__icon {
      margin-right: 8px;
      background-color: #00e213;
      border-radius: 50%;
      padding: 4px;
      color: #ffffff;
    }

    &__content {
      color: $Primary;
      font-size: 14px;
    }
  }

  &-add {
    padding: 8px;
    box-shadow:  0 0 0 2px #c9d1da;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 12px;

    &:hover {
      box-shadow:  0 0 0 2px #aed8f3;
    }

    &__content {
      cursor: pointer;
      color: $Primary;
      font-size: 16px;
    }
  }

  &-endpoint {
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: 10px;
    right: 10px;
    box-shadow:  0 0 0 2px #666666;
    border-radius: 50%;

    &:hover {
      box-shadow:  0 0 0 3px #aed8f3;
    }

    &.jtk-connected {
      background-color: #aed8f3;
      box-shadow: 0 0 0 2px #aed8f3;
    }
  }
}

>>> {
  .el-upload--text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 驗證錯誤的紅框
.error-border {
  box-shadow: 0 0 0 2px #f3aeae;

  &:hover {
    box-shadow: 0 0 0 2px #f3aeae;
  }
}
</style>
