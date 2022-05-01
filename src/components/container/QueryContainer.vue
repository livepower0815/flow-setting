<template>
  <el-form ref="form" class="ps-query-container" v-bind="$attrs">
    <template v-if="hasPriority">
      <el-button class="ps-query-container__collapseBtn" :icon="isCollapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" @click="handle_collapse" />
      <div class="ps-query-container__priority">
        <slot name="priority"></slot>
      </div>
    </template>
    <el-collapse-transition>
      <div v-show="!isCollapse" class="ps-query-container__optional">
        <slot></slot>
      </div>
    </el-collapse-transition>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    hasPriority() {
      return this.$slots.priority && (this.$slots.priority).length > 0
    }
  },
  created() {
    // console.log(this.$attrs)
    // console.log(this.$slots)
  },
  mounted() {
    if (this.hasPriority && !this.$slots.default) {
      console.warn('有優先展示的查詢組件，沒有次要展示組件，請檢查是否有需要放置優先展示的Slot。')
    }
  },
  methods: {
    handle_collapse() {
      this.isCollapse = !this.isCollapse
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    submitForm(cb) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          cb()
        } else {
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ps-query-container {
  position: relative;
  width: 100%;
  padding-right: 36px;
  & >>> .el-form-item {
    margin: 4px;
    background-color: #f5f5f5;
    padding: 0 12px;
    border-radius: 4px;
    position: relative;
    flex-wrap: wrap;
    display: inline-flex;
    &.is-required:not(.is-no-asterisk) {
      .el-form-item__label:before {
        position: absolute;
        top: -4px;
        left: -4px;
        content: '必填';
        font-size: 12px;
        line-height: 1;
        padding: 2px 4px;
        border-radius: 4px;
        color: #fff;
        background-color: $Danger;
      }
    }
    .el-form-item__error{
      padding-top: 0;
      margin-top: -2px;
      z-index: 2;
    }
  }
  & >>> .el-form-item__label{
    font-weight: 500;
    flex-shrink: 0;
  }
  & >>> .el-form-item__content{
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    line-height: initial;
    .el-form-item__error--inline{
      flex-shrink: 0;
      margin-top: 0;
    }
  }
  &__priority {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
  &__collapseBtn {
      position: absolute;
      right: 4px;
      top: 4px;
      // margin-top: 11px;
      padding: 0 !important;
      border: 1px solid #DCDFE6 !important;
      width: 30px;
      height: 30px;
      flex-shrink: 0;
  }
  &__optional {
    display: flex;
    flex-wrap: wrap;
    // padding-top: 4px;
  }
}

</style>
