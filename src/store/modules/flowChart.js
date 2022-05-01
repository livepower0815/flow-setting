const state = {
  nodeList: [],
  jsPlumbInstance: null,
  tooltipId: null,
  toolTimer: null
}

const mutations = {
  SET_NODE_LIST(state, list) {
    state.nodeList = list
  },
  PUSH_NODE_LIST(state, node) {
    state.nodeList.push(node)
  },
  SPLICE_NODE_LIST(state, listIndex) {
    state.nodeList.splice(listIndex, 1)
  },
  RESET_NODE_LIST(state) {
    state.nodeList = []
  },
  SET_PLUMB_INSTANCE(state, instance) {
    state.jsPlumbInstance = instance
  },
  SET_TOOLTIP_ID(state, id) {
    state.tooltipId = id
  },
  SET_TOOL_TIMER(state, timer) {
    state.toolTimer = timer
  },
  CLEAN_TOOL_TIMER(state) {
    if (state.toolTimer !== null) {
      clearTimeout(state.toolTimer)
      state.toolTimer = null
    }
  },
  CHANGE_NODE_SITE(state, { nodeId, left, top }) {
    const findItem = state.nodeList.find(node => node.id === nodeId)
    findItem.left = left
    findItem.top = top
  }
}

const actions = {
  setTooltip({ commit }, id) {
    commit('CLEAN_TOOL_TIMER')
    const toolTimer = setTimeout(() => {
      commit('SET_TOOLTIP_ID', id)
    }, 300)
    commit('SET_TOOL_TIMER', toolTimer)
  },
  // 重绘所有元素
  repaintEverything({ state }) {
    setTimeout(() => {
      state.jsPlumbInstance.repaintEverything()
    }, 0)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
