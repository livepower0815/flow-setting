<template>
  <div
    :id="card.id"
    class="chat-card"
  >
    <!-- 文字區塊 -->
    <div class="chat-card-text">
      <div v-if="hasTitleKey" :id="`${card.id}-title`" class="chat-card-text__title">
        <el-input
          v-model="card.title"
          :class="{'is-error': card.title.trim() === ''}"
          size="mini"
          placeholder="請輸入標題"
          maxlength="50"
        >
          <template slot="append">{{ `${card.title.length}/${50}` }}</template>
        </el-input>
        <BlockTooltip
          :show="showOptionTooltip(`${card.id}-title`)"
          :top="0"
          :left="-40"
          @delete="deleteTitle"
        />
      </div>
      <div v-if="hasSubtitleKey" :id="`${card.id}-subtitle`" class="chat-card-text__subtitle">
        <el-input
          v-model="card.sub_title"
          :class="{'is-error': card.sub_title.trim() === ''}"
          size="mini"
          placeholder="請輸入次標題"
          maxlength="50"
        >
          <template slot="append">{{ `${card.sub_title.length}/${50}` }}</template>
        </el-input>
        <BlockTooltip
          :show="showOptionTooltip(`${card.id}-subtitle`)"
          :top="0"
          :left="-40"
          @delete="deleteSubTitle"
        />
      </div>
      <div v-if="hasContnetKey" class="chat-card-text__content">
        <el-input
          v-model="card.content"
          :class="{'is-error': card.content.trim() === ''}"
          size="mini"
          placeholder="請輸入內容"
          type="textarea"
          resize="none"
          maxlength="1000"
          show-word-limit
          :rows="3"
        />
      </div>
    </div>

    <!-- 选项區塊 -->
    <template v-if="hasOptionsKey">
      <div v-for="(option, index) in card.options" :id="option.id" :key="option.id" class="chat-card-options">
        <el-input
          v-model="option.value"
          :class="{'is-error': option.value.trim() === ''}"
          size="mini"
          maxlength="25"
          placeholder="請輸入選項內容"
        >
          <template slot="append">{{ `${option.value.length}/${25}` }}</template>
        </el-input>
        <!-- 節點 source 拿來串另一個 flow -->
        <div
          :id="option.id + '-endpoint'"
          class="chat-card-options-endpoint"
          data-type="cardOption"
          :data-node-id="node.id"
          :data-endpoint-id="option.id + '-endpoint'"
          :data-node-index="nodeIndex"
          :data-message-index="messageIndex"
          :data-option-index="index"
        ></div>
        <BlockTooltip
          v-if="index > 0"
          :show="showOptionTooltip(option.id)"
          :top="0"
          :left="-24"
          @delete="deleteOption(index, card)"
        />
      </div>
      <div class="chat-card-add" @click="addOption(card.options)">
        <i class="el-icon-plus" style="margin-right: 8px;"></i> 添加選項按鈕
      </div>
    </template>

    <!-- 拿來放工具列 -->
    <slot name="tooltip"></slot>
  </div>
</template>

<script>
import BlockTooltip from '@/views/setting/site/flow_chart/block_tooltip'
import { CardOption } from '@/utils/constructors.js'

export default {
  name: 'ChatCard',
  components: {
    BlockTooltip
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    node: {
      type: Object,
      default: () => {
        return {}
      }
    },
    nodeIndex: {
      type: [String, Number],
      required: true
    },
    messageIndex: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      isImgLoading: false
    }
  },
  computed: {
    jsPlumb() {
      return this.$store.state.flowChart.jsPlumbInstance
    },
    hasImagesUrlKey() {
      return this.card.hasOwnProperty('url')
    },
    hasTitleKey() {
      return this.card.hasOwnProperty('title')
    },
    hasSubtitleKey() {
      return this.card.hasOwnProperty('sub_title')
    },
    hasContnetKey() {
      return this.card.hasOwnProperty('content')
    },
    hasOptionsKey() {
      return this.card.hasOwnProperty('options') && this.card.options.length > 0
    }
  },
  methods: {
    showOptionTooltip(optionId) {
      return this.$store.state.flowChart.tooltipId === optionId
    },
    addOption(options) {
      const option = new CardOption()
      options.push(option)
      this.initOptionPlumb(option)
    },
    initOptionPlumb(option) {
      this.$nextTick(() => {
        this.jsPlumb.makeSource(option.id + '-endpoint', {
          endpoint: 'Blank',
          isSource: true,
          anchor: 'Right',
          maxConnections: 1
        })
        this.$store.dispatch('flowChart/repaintEverything')
      })
    },
    deleteTitle() {
      this.$delete(this.card, 'title')
      this.$store.dispatch('flowChart/repaintEverything')
    },
    deleteSubTitle() {
      this.$delete(this.card, 'sub_title')
      this.$store.dispatch('flowChart/repaintEverything')
    },
    deleteOption(index, card) {
      const optionId = card.options[index].id
      this.jsPlumb.remove(optionId)
      card.options.splice(index, 1)
      this.$store.dispatch('flowChart/repaintEverything')
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-card {
  margin-top: 20px;
  border-radius: 12px;
  box-shadow:  0 0 0 2px #c9d1da;
  position: relative;
  &:hover {
    box-shadow:  0 0 0 2px #aed8f3;
  }

  &-image {
    border-bottom: 1px solid #c9d1da;
    overflow: hidden;
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
    padding: 8px;

    &__title {
      position: relative;
      margin: 6px 0;
    }

    &__subtitle {
      position: relative;
      margin: 6px 0;
    }

    &__content {
      margin: 6px 0;
    }
  }

  &-options {
    position: relative;
    padding: 8px;
    border-top: 1px solid #c9d1da;
    display: flex;
    justify-content: center;
    align-items: center;

    &-endpoint {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-left: 12px;
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

  &-add {
    padding: 8px;
    border-top: 1px solid #c9d1da;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
}

// 驗證錯誤的紅框
.is-error {
  >>> {
    input.el-input__inner {
      border-color: #e47373;
    }

    textarea.el-textarea__inner {
      border-color: #e47373;
    }
  }
}

// 驗證錯誤的紅框
.error-border {
  box-shadow: 0 0 0 2px #f3aeae;
  border-radius: 12px 12px 0 0;
}

>>> {
  .el-input-group__append {
    padding: 0 10px;
  }
}
</style>
