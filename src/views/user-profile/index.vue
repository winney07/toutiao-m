<!-- 用户资料 -->
<template>
 <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
        class="app-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <input
        type="file"
        hidden
        ref="file"
        accept="image/*"
        @change="onFileChange"
    >
    <van-cell title="头像" is-link center @click="$refs.file.click()">
        <van-image
            width="30"
            height="30"
            round fit="cover"
            :src="user.photo"
        />
    </van-cell>
    <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isEditNameShow=true"
    ></van-cell>
    <van-cell
        title="性别"
        :value="user.gender === 0 ? '男':'女'"
        is-link
        @click="isEditGenderShow=true"
    ></van-cell>
    <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="isEditBirthShow=true"
    ></van-cell>
    <!-- /个人信息 -->

    <!-- 编辑头像 -->
    <van-popup
        class="update-photo-popup"
        v-model="isEditPhotoShow"
        position="bottom"
        style="height:100%"
    >
        <update-photo
            v-if="isEditPhotoShow"
            :file="previewImage"
            @close="isEditPhotoShow=false"
            @update-photo="user.photo=$event"
        />
    </van-popup>
    <!-- /编辑头像 -->

    <!-- 编辑昵称 -->
    <van-popup
        v-model="isEditNameShow"
        position="bottom"
        :style="{ height: '100%' }"
    >
            <!-- :name="user.name"
            @update-name="user.name=$event" -->
        <update-name
            v-if="isEditNameShow"
            v-model="user.name"
            @close="isEditNameShow=false"
        />
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup
        v-model="isEditGenderShow"
        position="bottom"
    >
    <update-gender
        v-model="user.gender"
        @close="isEditGenderShow=false"
    />
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup
        v-model="isEditBirthShow"
        position="bottom"
    >
        <update-birth
            v-if="isEditBirthShow"
            v-model="user.birthday"
            @close="isEditBirthShow=false"
        />
    </van-popup>
    <!-- /编辑生日 -->
 </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirth from './components/update-birth'
import UpdatePhoto from './components/update-photo'

export default {
 name: 'UserProfile',
 components: {
     UpdateName,
     UpdateGender,
     UpdateBirth,
     UpdatePhoto
 },
 props: {},
 data () {
  return {
      user: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthShow: false,
      isEditPhotoShow: false,
      previewImage: null
  }
 },
 computed: {},
 watch: {},
 created() {
     this.loadUserProfile()
 },
 mounted() {},
 methods: {
     async loadUserProfile() {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
     },
     onFileChange() {
         // 展示弹出层
         this.isEditPhotoShow = true

        //  在弹出层预览选择的图片
        const blod = this.$refs.file.files[0]
        // const blod = window.URL.createObjectURL(this.$refs.file.files[0])
        this.previewImage = blod

         // 手动清空file的value值
         this.$refs.file.value = ''
     }
 }
}
</script>
<style lang='scss' scoped>
.van-popup{
    background-color: #f5f7f9;
}
.update-photo-popup{
    background-color: #000;
}
</style>
