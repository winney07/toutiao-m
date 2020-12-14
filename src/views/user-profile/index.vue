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
    <van-cell title="头像" is-link center>
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
    ></van-cell>
    <van-cell
        title="生日"
        :value="user.birthday"
        is-link
    ></van-cell>
    <!-- /个人信息 -->

    <!-- 编辑昵称弹出层 -->
    <van-popup
        v-model="isEditNameShow"
        position="bottom"
        :style="{ height: '100%' }"
    >
        <update-name
            :name="user.name"
            @close="isEditNameShow=false"
            @update-name="user.name=$event"
        />
    </van-popup>
    <!-- /编辑昵称弹出层 -->
 </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'

export default {
 name: 'UserProfile',
 components: {
     UpdateName
 },
 props: {},
 data () {
  return {
      user: {},
      isEditNameShow: false
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
     }
 }
}
</script>
<style lang='scss' scoped>
.van-popup{
    background-color: #f5f7f9;
}
</style>
