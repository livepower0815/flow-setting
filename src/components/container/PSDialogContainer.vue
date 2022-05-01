<template>
  <div class="ps-dialog-container">
    <div class="ps-dialog-container__content">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="ps-dialog-container__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PSDialogContainer',
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    // console.log(this.$attrs)
    // console.log(this.$slots)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

.ps-dialog-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  &__content {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 12px;
    padding-top: 12px;
    flex: 1;
    // margin-bottom: 12px;
    @include scrollBar;
  }

  &__footer {
    position: relative;
    border-top: #c9d1da 1px solid;
    flex-shrink: 0;
    margin: 0;
    padding: 8px 12px;
    // &::before {
    //   content: '';
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   background: #c9d1da;
    //   width: 100%;
    //   height: 1px;
    // }
  }
  & >>> {
    .el-button {
      margin: 2px;
    }
  }
}

</style>
