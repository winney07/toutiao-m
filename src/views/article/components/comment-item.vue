<!-- 评论项 -->
<template>
 <div class="comment-item">
       <van-cell
            :title="comment.aut_name"
        >
        <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            width="36px"
            height="36px"
            :src="comment.aut_photo"
        />
        <div>
            <van-icon
                :color="comment.is_liking ? '#e5645f' : '#777'"
                :name="comment.is_liking ? 'good-job' : 'good-job-o'"
                class="search-icon"
                @click="onCommentLike(comment)"
            />
            <span class="like-acount">{{ comment.like_count ? comment.like_count : "赞" }}</span>
        </div>
        <div slot="label" class="content">{{ comment.content }}</div>
        <div slot="label">
            {{ comment.pubdate | relativeTime}}
            <van-button
                class="reply-btn"
                type="default"
                size="mini"
                @click="$emit('reply-click', comment)"
            >回复 {{ comment.reply_count }}</van-button>
        </div>
       </van-cell>
 </div>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'

export default {
 name: 'commentItem',
 components: {},
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
     async onCommentLike (comment) {
         if (comment.is_liking) {
            //  已点赞，取消点赞
            await deleteCommentLike(comment.com_id)
         } else {
             // 未点赞，添加点赞
            await addCommentLike(comment.com_id)
         }

        comment.is_liking = !comment.is_liking
        comment.like_count += comment.is_liking ? 1 : -1
        this.$toast.success(comment.is_liking ? '点赞成功' : '取消成功')
     }
 }
}
</script>
<style lang='scss' scoped>
.comment-item{
    .avatar{
        margin-right: 8px;
    }
    .van-cell__title>span{
        color: #466b9d;
    }
    .content{
        color: #363636;
    }
    .reply-btn{
        margin-left: 10px;
    }
    .van-cell__value{
        flex-shrink: 0;
        flex: unset;
        overflow: unset;
        position: absolute;
        right: 10px;
    }
    .search-icon {
        top: 2px;
        margin-right: 3px;
    }
    .like-acount{
        font-size: 10px;
        color: #666;
    }
}
</style>
