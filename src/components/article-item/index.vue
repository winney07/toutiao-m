<!-- 文章列表项 -->
<template>
<van-cell class="article-item">
    <div slot="title">{{ article.title }}</div>
    <div slot="label">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate }}</span>
    </div>
    <!-- 默认插槽的名字叫default，可以省略 -->
    <!-- <div slot="default">hello</div> -->
    <div>hello</div>
</van-cell>
</template>
<script>
export default {
 name: 'ArticleItem',
 components: {},
 props: {
     article: {
         type: Object,
         required: true
     }
 },
 data () {
  return {}
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {},
 methods: {}
}
</script>
<style lang='scss' scoped>
</style>
