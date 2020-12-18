<!-- 编辑性别 -->
<template>
 <div class="update-gender">
    <van-picker
        show-toolbar
        :columns="columns"
        :default-index="localIndex"
        @cancel="$emit('close')"
        @confirm="onConfirm"
    />
 </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
 name: 'UpdateGender',
 components: {},
 props: {
     value: {
         type: Number,
         required: true
     }
 },
 data () {
  return {
      columns: ['男', '女'],
      localIndex: this.value
  }
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {},
 methods: {
    //  onChange (picker, value, index) {
    //     console.log(value)
    //      console.log(index)
    //      this.localIndex = index
    //  },
     async onConfirm (value, index) {
        this.$toast.loading({
            message: '保存中',
            forbidClick: true
        })

        await updateUserProfile({
            gender: index
        })
        this.$toast.success('保存成功')
        this.$emit('close')

        this.$emit('input', index)
     }
 }
}
</script>
<style lang='scss' scoped>
</style>
