<!-- 编辑昵称 -->
<template>
 <div class="update-name">
     <!-- 导航栏 -->
    <van-nav-bar
        title="修改昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
    />
    <!-- /导航栏 -->
    <div class="name-field-wrap">
        <van-field
            v-model="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入留言"
            show-word-limit
        />
    </div>
 </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
 name: 'UpdateName',
 components: {},
 props: {
     name: {
         type: String,
         required: true
     }
 },
 data () {
  return {
      localName: this.name
  }
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {},
 methods: {
     async onConfirm () {
         console.log('onConfirm')
         this.$toast.loading({
             message: '保存中',
             forbidClick: true
         })
         try {
             await updateUserProfile({
                 name: this.localName
             })
             this.$toast.success('保存成功')
             this.$emit('close')

             this.$emit('update-name', this.localName)
         } catch (err) {
             if (err && err.response && err.response.status === 409) {
                 this.$toast.fail('昵称已存在')
             }
         }
     }
 }
}
</script>
<style lang='scss' scoped>
.name-field-wrap{
    padding: 10px;
}
</style>
