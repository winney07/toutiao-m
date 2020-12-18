<!-- 编辑生日 -->
<template>
 <div class="update-birth">
    <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
    />
 </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
 name: 'UpdateBirth',
 components: {},
 props: {
     value: {
         type: String,
         required: true
     }
 },
 data () {
  return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
  }
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {},
 methods: {
     async onConfirm (value, index) {
        this.$toast.loading({
            message: '保存中',
            forbidClick: true
        })
        const date = dayjs(this.currentDate).format('YYYY-MM-DD')

        await updateUserProfile({
            birthday: date
        })
        this.$toast.success('保存成功')
        this.$emit('close')

        this.$emit('input', date)
     }
 }
}
</script>
<style lang='scss' scoped>
</style>
