<template>
  <div class="ps-container">
    <div v-if="this.$slots['query-group'] || this.$slots['query-action']" class="ps-query">
      <div v-if="this.$slots['query-group']" class="query-item-wrap">
        <slot name="query-group"></slot>
      </div>
      <div v-if="this.$slots['query-action']" class="query-action">
        <slot name="query-action"></slot>
      </div>
    </div>
    <div v-if="this.$slots.controller" class="ps-controller">
      <slot name="controller"></slot>
    </div>
    <div v-if="this.$slots.content" ref="table" class="ps-content">
      <slot name="content"></slot>
    </div>
    <div v-if="this.$slots['content-scroll']" class="ps-content-scroll">
      <slot name="content-scroll"></slot>
    </div>
    <div v-if="this.$slots.pager" class="ps-pager">
      <slot name="pager"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  mounted() {
    // console.log(this.$slots)
  }
}
</script>

<style lang="scss" scoped>
$padding: 8px;
.ps-container{
  position: relative;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .ps-query{
    padding: $padding $padding $padding $padding/2;
    position: relative;
    display: flex;
    .query-item-wrap{
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      margin-right: 8px;
    }
    .query-action{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      flex-shrink: 0;
      padding: 0;
      min-width: 100px;
      padding-top: 4px;
      & >>> .el-button+.el-button{
        // margin-left: 0;
        margin-top: 4px;
      }
    }
  }
  .ps-controller{
    padding: $padding;
    border-top: 1px solid #d9d9d9;
    position: relative;
  }
  .ps-content{
    position: relative;
    flex: 1;
    padding: $padding;
    border-top: 1px solid #d9d9d9;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .ps-content-scroll{
    position: relative;
    flex: 1;
    padding: $padding;
    // border-top: 1px solid #d9d9d9;
    overflow-y: auto;
  }
  .ps-pager{
    border-top: 1px solid #d9d9d9;
    position: relative;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
