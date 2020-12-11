<!-- 文章搜索 -->
<template>
 <div class="">
     <!-- 搜索栏 -->
     <form action="/">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch(searchText)"
            @cancel="$router.back()"
            @focus="isResultShow = false"
        />
    </form>
     <!-- /搜索栏 -->

     <!-- 搜索结果 -->
     <search-result
        v-if="isResultShow"
        :search-text="searchText"
     >
    </search-result>
     <!-- /搜索结果 -->

     <!-- 联想建议 -->
     <search-suggestion
        v-else-if="searchText"
        :search-text="searchText"
        @search="onSearch"
    />
     <!-- /联想建议 -->

     <!-- 历史记录 -->
     <search-history
        v-else
        :search-histories="searchHistories"
        @search="onSearch"
        @update-histories="searchHistories = $event"
    ></search-history>
     <!-- /历史记录 -->
</div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'

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
      isResultShow: false,
      searchHistories: getItem('search-history') || []
  }
 },
 computed: {
     ...mapState(['user'])
 },
 watch: {
     // 只要监听到搜索历史记录发生变化，就存储到本地
     searchHistories () {
         setItem('search-history', this.searchHistories)
     }
 },
 created() {
     this.loadSearchHistories()
 },
 mounted() {},
 methods: {
     onSearch (searchText) {
         // 把输入框设置为你想要的搜索文本
         this.searchText = searchText

        //  判断是否存在
        const index = this.searchHistories.indexOf(searchText)
        if (index !== -1) {
            // 把重复项删除
            this.searchHistories.splice(index, 1)
        }

        // 把最新的搜索历史记录放到顶部
        this.searchHistories.unshift(searchText)

        // setItem('search-history', this.searchHistories)

         this.isResultShow = true
     },

     async loadSearchHistories () {
         const searchHistories = getItem('search-history') || []

        //  let searchHistories = getItem('search-history') || []
        //  if (this.user) {
        //      const data = await getSearchHistories()
        //      console.log(data.data.keywords)
        //      searchHistories = [...new Set([
        //     ...searchHistories,
        //     ...data.data.keywords])]
        //  }
         this.searchHistories = searchHistories
         console.log(searchHistories)
     }
 }
}
</script>
<style lang='scss' scoped>
</style>
