<!-- 首页 -->
<template>
 <div id="" class="home-container">
     <!-- 导航栏 -->
     <van-nav-bar
        class="app-nav-bar"
    >
    <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
        to="/search"
    >搜索</van-button>
    </van-nav-bar>
     <!-- /导航栏 -->

     <!-- 文章频道列表 -->
    <van-tabs class="channel-tabs" v-model="active">
        <van-tab
            :key="channel.id"
            :title="channel.name"
            v-for="channel in channels"
        >
            <!-- 文章列表 -->
            <article-list :channel="channel"/>
            <!-- /文章列表 -->
        </van-tab>

        <!--汉堡按H定位把列表最后的位置给挡住了，解决办法的就是在这里添加一个占位元素|-->
        <div slot="nav-right" class="wap-nav-placeholder"></div>

        <div
            slot="nav-right"
            class="wap-nav-wrap"
            @click="isChannelEditShow = true"
        >
            <van-icon name="wap-nav"/>
        </div>
    </van-tabs>
     <!-- /文章频道列表 -->

     <van-popup
        v-model="isChannelEditShow"
        position="bottom"
        class="channel-edit-popup"
        closeable
        close-icon-position="top-left"
        get-container="body"
     >
     <channel-edit
        :user-channels="channels"
        :active="active"
        @close="isChannelEditShow = false"
        @update-active="active = $event"
     />
     </van-popup>
</div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import channelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
 name: 'HomeIndex',
 components: {
     ArticleList,
     channelEdit
 },
 props: {},
 data () {
  return {
      active: 0,
      channels: [],
      isChannelEditShow: false
  }
 },
 computed: {
     ...mapState(['user'])
 },
 watch: {},
 created() {
     this.loadChannels()
 },
 mounted() {},
 methods: {
     async loadChannels() {
         let channels = []

         if (this.user) {
            // 用户登录，获取线上数据
             const { data } = await getUserChannels()
             channels = data.data.channels
         } else {
            // 用户未登录，获取本地数据
             const localChannels = getItem('user-channels')
             if (localChannels) {
                //  有本地数据
                 channels = localChannels
             } else {
                //  没有本地数据，获取推荐频道
                const { data } = await getUserChannels()
                channels = data.data.channels
             }
         }

         this.channels = channels
        //  const { data } = await getUserChannels()
        // //  console.log(data)
        //  this.channels = data.data.channels
     }
    //  onUpdateActive (index) {
    //      this.active = index
    //  }
 }
}
</script>
<style lang='scss' scoped>
.home-container{
    /deep/ .van-nav-bar__title{
        max-width: none;
    }

    .search-btn{
        width:277px;
        height: 32px;
        background-color: #5babfb;
        border: none;
        .van-icon{
            font-size: 16px;
        }
        .van-button__text{
            font-size: 14px;
        }
    }
    .channel-tabs {
        /deep/ .van-tab {
            border-right: 1px solid #edeff3;
            border-bottom: 1px solid #edeff3;
        }
        /deep/ .van-tab:last-child{
            border-right: none;
        }
        /deep/ .van-tabs__line {
            bottom: 20px;
            width: 15px !important;
            height: 3px;
            background-color: #3296fa;
            border-radius: 3px;
        }
    }
}
.channel-edit-popup{
    height: 100%;
}
.wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
}
.wap-nav-wrap{
    position:fixed;
    right: 0;
    width:33px;
    height: 43px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    font-size: 18px;
    &::after{
        position: absolute;
        left: 0;
        // top:0;
        content: '';
        width: 1px;
        height: 29px;
        background: url('./line.png') no-repeat;
        background-size: cover;
    }
}
</style>
