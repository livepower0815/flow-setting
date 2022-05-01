<template>
  <div ref="tool" class="node-menu">
    <div class="node-menu-left">
      <div class="node-menu-name">
        Kerry Flow Setting Demo
      </div>
    </div>
    <ul class="node-menu-ul">
      <draggable v-model="menuList" v-bind="draggableOptions" @end="end" @start="move">
        <li v-for="menu in menuList" :key="menu.id" class="node-menu-li" :type="menu.type">
          {{ menu.name }}
          <el-tooltip effect="dark" content="請拖曳新增" placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </li>
      </draggable>
    </ul>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
var mousePosition = {
  left: -1,
  top: -1
}
export default {
  name: 'NodeMenu',
  components: {
    draggable
  },
  data() {
    return {
      // draggable配置参数参考 https://www.cnblogs.com/weixin186/p/10108679.html
      draggableOptions: {
        preventOnFilter: false,
        sort: false,
        disabled: false,
        ghostClass: 'tt',
        // 不使用H5原生的配置
        forceFallback: true
        // 拖拽的时候样式
        // fallbackClass: 'flow-node-draggable'
      },
      menuList: [
        {
          id: '1',
          type: 'verticalOption',
          name: '拖曳新增節點'
        }
      ],
      nodeMenu: {}
    }
  },
  created() {
    /**
     * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
     * @param event
     */
    if (this.isFirefox()) {
      document.body.ondrop = function(event) {
        // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
        mousePosition.left = event.layerX
        mousePosition.top = event.clientY - 50
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    // 根据类型获取左侧菜单对象
    getMenuByType(type) {
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].type === type) {
          return this.menuList[i]
        }
      }
    },
    // 拖拽开始时触发
    move(evt) {
      var type = evt.item.attributes.type.nodeValue
      this.nodeMenu = this.getMenuByType(type)
    },
    // 拖拽结束时触发
    end(evt, e) {
      this.$emit('dropNode', evt, this.nodeMenu)
    },
    // 是否是火狐浏览器
    isFirefox() {
      var userAgent = navigator.userAgent
      if (userAgent.indexOf('Firefox') > -1) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.node-menu {
  height: 100%;
  display: flex;
  background-color: #f5fafc;
  margin: 0px -20px;
  &-left {
    display: flex;
    flex: 1;
    min-width: 340px;
    font-size: 20px;
    font-weight: 500;
    color: $Primary;
    // justify-content: center;
    align-items: center;
    padding-left: 20px;
  }

  &-name {
    display: flex;
    align-items: center;

    .tool-icon {
      margin-left: 8px;
      &:hover {
        color: #2897db;
        cursor: pointer;
      }
    }
  }

  &-ul {
    height: 100%;
    display: flex;
    flex: 3;
    min-width: 200px;
    align-items: center;
    list-style: none;
    padding: 0 20px;
    margin: 0;
    // border-left: 1px solid #c9d1da;
    // border-right: 1px solid #c9d1da;
  }

  &-li {
    display: inline-block;
    color: #565758;
    width: 140px;
    border: 1px dashed #666666;
    border-radius: 5px;
    padding: 5px 5px 5px 8px;
    margin-left: 12px;
    text-align: center;

    &:hover {
      color:  #2897db;
      border: 1px solid  #2897db;
      cursor: grab;
    }
  }

  &-right {
    display: flex;
    flex: 3;
    justify-content: center;
    align-items: center;
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

</style>
