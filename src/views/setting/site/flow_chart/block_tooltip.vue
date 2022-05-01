<template>
  <div class="tooltip" :class="{'tooltip-show': show}" :style="computePosition">
    <div class="tooltip-delete" @click="clickHandler('delete')">
      <i class="el-icon-delete"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockTooltip',
  props: {
    show: {
      type: Boolean
    },
    top: {
      type: [Number, String],
      default: 0
    },
    left: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {

    }
  },
  computed: {
    computePosition() {
      return {
        top: this.top + 'px',
        left: this.left + 'px'
      }
    }
  },
  methods: {
    clickHandler(eventType) {
      switch (eventType) {
        case 'delete':
          this.$emit('delete')
          break
        default:
          console.error('clickHandler not match type!')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  padding: 4px;
  background: white;
  box-shadow:  0 0 0 2px #c9d1da;
  border-radius: 4px;
  position: absolute;
  display: none;

  &.tooltip-show {
    display: block;
  }

  &:hover {
    display: block;
  }

  &-delete {
    padding: 4px;
    border-radius: 2px;

    &:hover {
      background-color: #eaeff5;
      cursor: pointer;
    }
  }
}
</style>
