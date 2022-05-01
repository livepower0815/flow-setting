<template>
  <div class="emoji-tool tool-btn">
    <div class="emoji-tool__btn">
      <img
        :src="require('@/assets/chat/msg_tool_emoji.svg')"
        :title="$t('emoji')"
        @click.stop="openEmoji"
      >
      <Picker
        v-if="showPicker"
        :data="emojiIndex"
        class="emoji-tool__picker"
        title=""
        native
        :emoji-size="18"
        :show-preview="false"
        @select="selectEmoji"
        @blur="handleBlur"
      />
    </div>
    <div v-if="showPicker" class="emoji-tool__layer" @click="closePicker"></div>
  </div>
</template>

<script>
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'

import EmojiData from 'emoji-mart-vue-fast/data/all.json'

const emojiIndex = new EmojiIndex(EmojiData)

export default {
  components: {
    Picker
  },
  data() {
    return {
      showPicker: false,
      emojiIndex: emojiIndex,
      emoji: ''
    }
  },
  methods: {
    openEmoji(data) {
      this.showPicker = !this.showPicker
    },
    closePicker() {
      this.showPicker = false
      this.$emit('inputFocus')
    },
    selectEmoji(emoji) {
      // console.log(emoji)
      this.$emit('emoji', emoji.native)
    },
    handleBlur() {
      this.closePicker()
    }
  }
}
</script>

<style lang="scss" scoped>
.emoji-tool {
  &__btn {
    position: relative;
    z-index: 200;
    cursor: pointer;
    transition: transform .2s ease-in-out;
    user-select: none;
    border-radius: 50%;
    img:hover {
      transform: rotate(15deg);
    }
  }
  &__picker {
    position: absolute;
    z-index: 1900;
    top: -250px;
    height: 250px;
    right: 8px;
    // transform: scale(0.8);
    transform-origin: right bottom;
    & >>> {
      .emoji-mart-anchor {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 4px;
      }
    }
  }
  &__layer {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
