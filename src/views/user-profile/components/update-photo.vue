<!-- 编辑头像 -->
<template>
 <div class="update-photo">
     <img :src="image" ref="image">
     <van-nav-bar
        class="toolbar"
        left-text="取消"
        right-text="确认"
        @click-left="$emit('close')"
        @click-right="onConfirm"
    />
 </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
 name: 'UpdatePhoto',
 components: {},
 props: {
     file: {
        //  type: String,
         required: true
     }
 },
 data () {
  return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
  }
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {
    const image = this.$refs.image
     this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        // autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true
    })
    console.log(this.cropper)
 },
 methods: {
     getCroppedCanvas() {
         return new Promise(resolve => {
              this.cropper.getCroppedCanvas().toBlob((file) => {
                resolve(file)
            })
         })
     },
     async onConfirm() {
         this.$toast.loading({
             message: '保存中',
             forbidClick: true,
             duration: 0
         })
         console.log('onConfirm')
         const file = await this.getCroppedCanvas()
         const img = window.URL.createObjectURL(file)

        // 文件格式处理
         const fd = new FormData()
         fd.append('photo', file)
        //  fd.append('photo', this.file)

         await updateUserPhoto(fd)

         this.$emit('close')
         this.$emit('update-photo', img)
        //  this.$emit('update-photo', this.image)

         this.$toast.success('保存成功')
     }
 }
}
</script>
<style lang='scss' scoped>
.update-photo{
    position: absolute;
    top: 50%;
    margin-top: -185px;
    margin-left: -185px;
    height: 370px;
    left: 50%;
    width:370px;
}
.toolbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    /deep/ .van-nav-bar__text{
        color: #fff;
    }
}
</style>
