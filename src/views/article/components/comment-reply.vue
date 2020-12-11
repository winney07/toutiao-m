<!-- 评论回复 -->
<template>
 <div class="comment-reply">
     <!-- 头部 -->
    <van-nav-bar
        title="0条回复"
        @click-left="$emit('close-reply')"
    >
        <span slot="left"><van-icon name="cross" /></span>
    </van-nav-bar>
     <!-- /头部 -->

     <!-- 当前评论 -->
     <comment-item :comment="comment"/>
     <!-- /当前评论 -->

     <!-- 评论回复列表 -->
     <!-- /评论回复列表 -->
 </div>
</template>

<script>
import commentItem from './comment-item'

export default {
 name: 'commentReply',
 components: {
     commentItem
 },
 props: {
     comment: {
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
 methods: {
 }
}
</script>
<style lang='scss' scoped>
</style>
