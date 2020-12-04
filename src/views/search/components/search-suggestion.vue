<!-- 搜索联想建议 -->
<template>
 <div class="search-suggestion">
     <van-cell
        v-for="(str, index) in suggestions"
        :key="index"
        :title="str"
        icon="search"
     />
</div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'

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
        async handler () {
            const { data } = await getSearchSuggestions(this.searchText)
            console.log(data)
            this.suggestions = data.data.options
        },
        // 该回调将会在侦听开始之后被立即调用
        immediate: true
    }
 },
 created() {},
 mounted() {},
 methods: {}
}
</script>
<style lang='scss' scoped>
</style>
