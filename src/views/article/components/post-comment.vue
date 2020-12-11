<!-- 发表评论 -->
<template>
 <div class="post-comment">
    <van-row>
        <van-col span="20">
             <van-field
                class="post-field"
                v-model.trim="message"
                rows="2"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="优质评论将会被优先展示"
                show-word-limit
            />
        </van-col>
        <van-col span="4">
            <van-button
            class="post-btn"
            type="default"
            @click="onAddComment"
        >发布</van-button>
        </van-col>
    </van-row>
 </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
 name: 'postComment',
 components: {},
 props: {
     target: {
         type: [String, Number, Object],
         required: true
     }
 },
 data () {
  return {
      message: '',
      art_id: null
  }
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {},
 methods: {
     async onAddComment () {
         // 处理防抖
         this.$toast.loading({
             duration: 0, // 持续展示toast
             forbidClick: true,
             message: '发布中'
         })
         console.log('点击发布')
         // 有评论内容，发布评论
         if (this.message) {
             const { data } = await addComment({
                 target: this.target,
                 content: this.message,
                 art_id: this.art_id
             })
            // 将数据追加到评论列表
             const newComment = data.data.new_obj
             newComment.is_liking = false
             this.$emit('post-success', newComment)

             // 提示
             this.$toast.success('发布成功')
             this.message = ''
         } else {
             this.$toast('请输入评论')
         }
     }
 }
}
</script>
<style lang='scss' scoped>
.post-comment{
    padding: 14px;
    box-sizing: border-box;
    .van-row{
        display: flex;
        align-items: center;
    }
    .post-field{
        background-color: #f5f7f9;
    }
    .post-btn{
        border:none;
        font-size: 12px;
    }
}
</style>
