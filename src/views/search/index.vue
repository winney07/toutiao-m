<!-- 文章搜索 -->
<template>
 <div class="">
     <!-- 搜索栏 -->
     <form action="/">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="$router.back()"
            @focus="isResultShow = false"
        />
    </form>
     <!-- /搜索栏 -->

     <!-- 搜索结果 -->
     <search-result v-if="isResultShow"></search-result>
     <!-- /搜索结果 -->

     <!-- 联想建议 -->
     <search-suggestion
        v-else-if="searchText"
        :search-text="searchText"
    />
     <!-- /联想建议 -->

     <!-- 历史记录 -->
     <search-history v-else></search-history>
     <!-- /历史记录 -->
</div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'

export default {
 name: 'searchIndex',
 components: {
     SearchSuggestion,
     SearchHistory,
     SearchResult
 },
 props: {},
 data () {
  return {
      searchText: '',
      isResultShow: false
  }
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {},
 methods: {
     onSearch () {
         console.log('搜索')
         this.isResultShow = true
     }
 }
}
</script>
<style lang='scss' scoped>
</style>
