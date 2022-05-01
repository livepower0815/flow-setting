<template>
  <div class="chat-quick-reply" tabindex="0" @blur="handleBlur" @focus="handleFocus" @keydown="handleWrapperKeydown">
    <div
      v-for="(reply, rIndex) in replyList"
      ref="quickItem"
      :key="`reply-${rIndex}`"
      class="chat-quick-reply__item"
      :class="{'chat-quick-reply__item--active': rIndex === selectIndex}"
      :tabindex="rIndex"
      @keydown="handleItemKeydown"
      @click="handleSelected(rIndex)"
    >{{ reply }}</div>
  </div>
</template>

<script>
export default {
  props: {
    autoFocus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectIndex: 0,
      replyList: [
        '欢迎光临！！',
        '超级动物大逃杀！！',
        '我有黑纱超跑～',
        '比利有六块肌跟大胸肌:smile:',
        '比利的比例不对',
        '我想放弃了',
        '清明时节雨纷纷',
        '路上行人欲断魂',
        '打击武肺人人有责',
        '防疫之心不可无',
        '我买不到口罩',
        ':smile:123'
      ]
    }
  },
  mounted() {
    if (this.autoFocus) {
      this.$el.focus()
      this.$refs.quickItem[0].focus()
    }
  },
  methods: {
    hide() {
      this.$emit('close')
    },
    handleSelected(index) {
      this.$emit('selected', this.replyList[index])
      this.hide()
    },
    handleFocus() {
      console.log('Focus event fire')
    },
    handleBlur() {
      console.log('Blur event fire')
    },
    handleWrapperKeydown(event) {
      const keyCode = event.keyCode
      if ([38, 40].indexOf(keyCode) > -1) {
        event.preventDefault()
        event.stopPropagation()
        this.$refs.quickItem[0].focus()
      } else if (keyCode === 13) {
        // 选取
      } else if ([9, 27].indexOf(keyCode) > -1) { // tab || esc
        this.hide()
      }
    },
    handleItemKeydown(event) {
      const keyCode = event.keyCode
      const replyLen = this.replyList.length - 1
      if ([38, 40].indexOf(keyCode) > -1) {
        event.preventDefault()
        event.stopPropagation()
        if (keyCode === 38) { // up
          this.selectIndex !== 0 ? this.selectIndex-- : this.selectIndex = replyLen
        } else { // down
          this.selectIndex >= replyLen ? this.selectIndex = 0 : this.selectIndex++
        }
        this.$nextTick(() => {
          this.$refs.quickItem[this.selectIndex].scrollIntoView(false)
        })
      } else if (keyCode === 13) {
        // 选取
        event.preventDefault()
        this.handleSelected(this.selectIndex)
      } else if ([9, 27].indexOf(keyCode) > -1) { // tab || esc
        this.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-quick-reply {
  position: fixed;
  z-index: 1900;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  @include boxshadow;
  @include scrollBar;
  .chat-quick-reply__item {
    line-height: 1.5;
    &:hover{
      background-color: #e5e5e5;
      color: #333;
    }
    &--active {
      background-color: red;
      color: #fff;
    }
  }
}
</style>
