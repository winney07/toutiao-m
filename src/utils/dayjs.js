/**
 *初始化 dayjs 相关配置
 */
import Vue from 'vue'
import dayjs from 'dayjs'
// 加载使用中文语言包
import 'dayjs/locale/zh-cn'
// 加载相对时间包
import relativeTime from 'dayjs/plugin/relativeTime'

 // 配置使用相对时间
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

Vue.filter('relativeTime', value => {
    return dayjs(value).from(dayjs())
})
console.log(dayjs().format('YYY-MM-DD'))
