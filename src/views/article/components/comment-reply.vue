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

      <van-cell ref="comment-area-tip" title="全部评论" :border="false" />
     <!-- 评论回复列表 -->
     <comment-item :comment="comment"/>
     <!-- /评论回复列表 -->

     <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="showPostComment=true"
      >写评论</van-button>
    </div>
    <!-- /底部区域 -->
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
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    border: 1px solid #eeeeee;
    font-size: 12px;
    line-height: 23px;
    color: #363636;
  }
}
</style>
