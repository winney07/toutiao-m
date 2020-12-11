<!-- 文章列表 -->
<template>
 <div id="" class="article-list">
     <van-pull-refresh
        v-model="isRefreshLoading"
        :success-text="refreshSuccessTxt"
        :success-duration="1500"
        @refresh="onRefresh"
    >
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <!-- <van-cell
                v-for="(article, index) in articles"
                :key="index"
                :title="article.title"
            /> -->
            <article-item
                v-for="(article, index) in articles"
                :key="index"
                :article="article"
            />
        </van-list>
    </van-pull-refresh>
</div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
 name: 'ArticleList',
 components: {
     ArticleItem
 },
 props: {
     channel: {
         type: Object,
         required: true
     }
 },
 data () {
  return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false,
      refreshSuccessTxt: ''
  }
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {},
 methods: {
    async onLoad() {
        // 异步更新数据
        // console.log(this.channel.id)
        const { data } = await getArticles({
           channel_id: this.channel.id, // 频道ID
            timestamp: this.timestamp || Date.now(), // 时间藏，请求新的推荐数据传当前的时间藏，请求历史推荐传指定的时间戳,timestamp相当于页码
            with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含

        })
        const { results } = data.data
        // console.log(results)
        this.articles.push(...results)
        // 加载状态结束
        this.loading = false

        // // 数据全部加载完成
        if (results.length) {
            this.timestamp = data.data.pre_timestamp
        } else {
            this.finished = true
        }
    },
    async onRefresh () {
        const { data } = await getArticles({
           channel_id: this.channel.id,
            timestamp: Date.now(),
            with_top: 1
        })
        console.log(data)
        const { results } = data.data
        this.articles.unshift(...results)

        this.isRefreshLoading = false

        this.refreshSuccessTxt = `更新了${results.length}条数据`
    }
}
}
</script>
<style lang='scss' scoped>
.article-list {
    position : fixed;
    left: 0;
    right: 0;
    bottom : 50px;
    top: 90px;
    overflow-y: auto;
}
</style>
