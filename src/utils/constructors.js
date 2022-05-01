// 這邊用來記錄聊天室通用的資料格式
import { v1 as uuidv1 } from 'uuid'

// 用來比對物件是否存在必要的鍵值
function checkRequiredKey(requiredConfigKeys, config, constructorName) {
  let validated = true
  const configKeys = Object.keys(config)
  requiredConfigKeys.forEach(key => {
    if (!configKeys.includes(key)) {
      console.error(`${constructorName} require "${key}" property`)
      validated = false
    }
  })
  return !validated
}

// 結構生產器
function schemaConstructor({ constructorName, requiredConfigKeys, OptionalConfig }) {
  return (config) => {
    if (checkRequiredKey(requiredConfigKeys, config, constructorName)) { return config }
    return {
      ...OptionalConfig,
      ...config
    }
  }
}

// 流程節點
export function FlowNodeData(config = {}) {
  this.id = config.id || uuidv1() // node id
  this.name = config.name || '' // node 名稱
  this.left = config.left || '0px' // 座標
  this.top = config.top || '0px' // 座標
  this.messages = config.messages || []
  this.connect_target = config.connect_target || null
  this.connect_flow_id = config.connect_flow_id || null
  this.is_ring = config.is_ring || false // for 轉接真人客服顯示
  this.is_root = config.is_root || false // for 根節點判斷
}

// message type: text
export function TextMessage(config = {}) {
  this.id = config.id || uuidv1()
  this.type = 'text'
  this.text = config.text || ''
}


// message type: card 文字加选项
export function ContentOptionCardMessage(config = {}) {
  this.id = config.id || uuidv1()
  this.type = 'card'
  this.content = config.content || '' // 內容
  this.options = config.options || [new CardOption()] // 回答选项
}

// card.options 的 option 格式
export function CardOption(config = {}) {
  this.id = config.id || uuidv1()
  this.connect_target = config.connect_target || null
  this.value = config.value || ''
  // this.icon = config.icon || '' 先不要
}

export default {
  FlowNodeData,
  TextMessage,
  ContentOptionCardMessage,
  CardOption
}
