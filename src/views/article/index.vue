<!-- 文章详情 -->
<template>
 <div class="article-container">
     <!-- 导航栏 -->
      <van-nav-bar
        class="app-nav-bar"
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
     />
     <div class="article-wrap">
        <!-- 标题 -->
        <h1 class="title">{{ article.title }}</h1>
        <!-- 作者信息 -->
        <van-cell center class="user-info">
            <div slot="title" class="name">{{ article.aut_name }}</div>
            <van-image
                slot="icon"
                fit="cover"
                class="avator"
                round
                :src="article.aut_photo"
            />
            <div slot="label" class="pubdate">{{ article.pubdate | relativeTime}}</div>
            <van-button
                :type="article.is_followed ? 'default' : 'info'"
                round
                size="small"
                class="follow-btn"
                :icon="article.is_followed ? '' : 'plus'"
                :loading="isFollowLoading"
                @click="onFollow"
            >
            {{ article.is_followed ? "已关注" : "关注"}}
            </van-button>
        </van-cell>
        <!-- 文章内容 -->
        <div class="content markdown-body" v-html="article.content" ref="article-content">
        </div>
        <van-divider dashed>正文结束</van-divider>

         <van-cell ref="comment-area-tip" title="全部评论" :border="false" />

        <!-- 评论列表 -->
        <comment-list
            :list="commentList"
            :source="articleId"
           @update-total-count="commentCount = $event"
           @reply-click="onReplyClick"
        />
        <!-- /评论列表 -->
    </div>
     <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="showPostComment=true"
      >写评论</van-button>

      <!-- 评论个数图标 -->
      <van-icon
        name="comment-o"
        :info="commentCount"
        color="#777"
      />
      <!-- /评论个数图标 -->

      <!-- 收藏按钮 -->
      <van-icon
         :color="article.is_collected ? 'orange' : '#777'"
         :name="article.is_collected? 'star': 'star-o'"
         @click="onCollect"
      />
      <!-- /收藏按钮 -->

      <!-- 点赞按钮 -->
      <van-icon
        :color="article.attitude === 1 ? 'hotpink' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon name="share" color="#777777"></van-icon>
      <!-- /点赞按钮 -->
    </div>
    <!-- /底部区域 -->

     <!-- 发表评论文本域 -->
    <van-popup
        v-model="showPostComment"
        position="bottom"
     >
        <post-comment :target="articleId" @post-success="onPostSuccess"/>
     </van-popup>
      <!-- /发表评论文本域 -->

      <!-- 评论回复 -->
      <van-popup
        v-model="isReplyShow"
        position="bottom"
     >
        <comment-reply
            :comment="replyComment"
            @close-reply="isReplyShow=false"
        />
     </van-popup>
      <!-- /评论回复 -->
</div>
</template>

<script>
import './github-markdown.css'
import {
    getArticleById,
    addCollect,
    deleteCollect,
    addLike,
    deleteLike
} from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import commentList from './components/comment-list'
import postComment from './components/post-comment'
import commentReply from './components/comment-reply'

export default {
 name: 'articleIndex',
 components: {
     commentList,
     postComment,
     commentReply
 },
 props: {
     articleId: {
        type: [String, Number, Object],
        required: true
     }
 },
 data () {
  return {
      article: {},
      isFollowLoading: false, // 关注用户按钮的loading状态
      isCollectLoading: false,
      isLikeLoading: false,
      commentCount: 0,
      showPostComment: false,
      isReplyShow: false,
      commentList: [],
      replyComment: {}
  }
 },
 computed: {},
 watch: {},
 created() {
     this.loadArticle()
 },
 mounted() {},
 methods: {
     async loadArticle () {
         const { data } = await getArticleById(this.articleId)
        //  console.log(data)
         this.article = data.data

         this.$nextTick(() => {
             this.handlePerviewImage()
         })
     },

     handlePerviewImage () {
        //  1、获取文章内容DOM容器
         const articleContent = this.$refs['article-content']
        // 2、得到所有的img标签
         const imgs = articleContent.querySelectorAll('img')

         const imgPaths = []
        // 3、循环img列表，给img注册点击事件
         imgs.forEach((img, index) => {
            imgPaths.push(img.src)

            img.onclick = function () {
                // 4、在实践中处理函数中调用ImagePreview()预览
                ImagePreview({
                    images: imgPaths,
                    startPosition: index
                })
            }
         })
     },

     async onFollow () {
        //  开启
         this.isFollowLoading = true
         if (this.article.is_followed) {
             // 已关注，取消关注
             await deleteFollow(this.article.aut_id)
         } else {
            //  未关注，添加关注
             await addFollow(this.article.aut_id)
         }
        // 更新视图
         this.article.is_followed = !this.article.is_followed
        //  关闭
          this.isFollowLoading = false
     },

      async onCollect () {
        //  开启
         this.isCollectLoading = true
         if (this.article.is_collected) {
             // 已关注，取消关注
             await deleteCollect(this.articleId)
         } else {
            //  未关注，添加关注
             await addCollect(this.articleId)
         }
        // 更新视图
         this.article.is_collected = !this.article.is_collected
        //  关闭
          this.isCollectLoading = false
          this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
     },

      async onLike () {
        //  开启
         this.isLikeLoading = true
         if (this.article.attitude === 1) {
             // 已关注，取消关注
             await deleteLike(this.articleId)
             this.article.attitude = -1
         } else {
             //  未关注，添加关注
             await addLike(this.articleId)
             this.article.attitude = 1
         }
        // 更新视图
        //  关闭
          this.isLikeLoading = false
          this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
     },

        //  发布成功处理
     onPostSuccess (comment) {
         this.showPostComment = false
         console.log('comment')
         console.log(comment)
         this.commentList.unshift(comment)
         this.commentCount++
     },

     onReplyClick(comment) {
         console.log(comment)
         this.replyComment = comment
         this.isReplyShow = true
     }

 }
}
</script>
<style lang='scss' scoped>
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
  background-color: #fff;
}
.title{
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
}
.user-info{
    .avator{
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }
    .name{
        font-size: 12px;
        color: #333;
    }
    .pubdate{
        font-size: 11px;
        color: #b4b4b4;
    }
    .van-cell__label{
        margin-top:0;
    }
    .follow-btn {
        width: 85px;
        height: 29px;
    }
}

ul {
    list-style: unset;
}
.markdown-body{
    padding: 14px;
    background-color: #fff;
}
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
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
    }
  }
}
</style>
