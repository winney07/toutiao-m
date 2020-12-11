<!-- 搜索联想建议 -->
<template>
 <div class="search-suggestion">
     <van-cell
        v-for="(str, index) in suggestions"
        :key="index"
        icon="search"
        @click="$emit('search', str)"
     >
     <div slot="title" v-html="highlight(str)"></div>
     </van-cell>
</div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
 name: 'SearchSuggestion',
 components: {},
 props: {
     searchText: {
         type: String,
         required: true
     }
 },
 data () {
  return {
      suggestions: []
  }
 },
 computed: {},
 watch: {
    //  searchText () {
    //      console.log('改变了输入框的值')
    //  }

    // 这才是监视的完整写法
    searchText: {
        // 当数据发生变化则会执行 handler处理函数
        handler: debounce(async function() {
            const { data } = await getSearchSuggestions(this.searchText)
            console.log(data)
            this.suggestions = data.data.options
        }, 200),

        /* async handler () {
            const { data } = await getSearchSuggestions(this.searchText)
            console.log(data)
            this.suggestions = data.data.options
        }, */
        // 该回调将会在侦听开始之后被立即调用
        immediate: true
    }
 },
 created() {},
 mounted() {},
 methods: {
     highlight (str) {
         return str.replace(new RegExp(this.searchText, 'gi'), `<span style="color:red">${this.searchText}</span>`)
     }
 }
}
</script>
<style lang='scss' scoped>
</style>
