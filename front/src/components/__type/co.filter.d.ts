
type CoFilterBarType = 'input' | 'search'

type CoFilterBar = {
  /** SQL 查询语句，支持 #codeParam# 占位符 */
  sql: string
  /** 类型标识，如 "search" */
  type: CoFilterBarType
  /** 加载状态（注意字段名拼写） */
  ioading: boolean
  /** 内部计数 */
  __num: number
  /** 内部版本标识 */
  __v: string
  /** 绑定字段名，如 'ItemCode' */
  k: string
  /** 标签文本 */
  label: string
  /** 输入框占位提示 */
  placeholder: string
}

type CoFilterBars = CoFilterBar[]