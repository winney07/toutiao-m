<!-- 频道编辑组件 -->
<template>
 <div class="channel-edit">
     <van-cell center :border="false">
        <div
            slot="title"
            class="channel-title"
        >我的频道</div>
        <van-button
            type="danger"
            plain
            round
            size="mini"
            @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑'}}</van-button>
     </van-cell>

     <van-grid :gutter="10">
        <van-grid-item
            class="grid-item"
            :class="{ active: index === active }"
            :icon="(isEdit && index !== 0) ? 'close' : ''"
            v-for="(channel, index) in userChannels"
            :key="index"
            :text="channel.name"
            @click="onUserChannelClick(channel, index)"
        />
    </van-grid>

    <van-cell center :border="false">
        <div
            slot="title"
            class="channel-title"
        >频道推荐</div>
     </van-cell>

     <van-grid :gutter="10">
        <van-grid-item
            class="grid-item"
            v-for="(channel, index) in recommendchannels"
            :key="index"
            :text="channel.name"
            @click="onAdd(channel)"
        />
     </van-grid>

</div>
</template>

<script>
// import { getAllChannels } from '@/api/channel'
import { addUserChannels, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
 name: 'channelEdit',
 components: {},
 props: {
     userChannels: {
         type: Array,
         required: true
     },
     active: {
         type: Number,
         required: true
     }
 },
 data () {
  return {
      isEdit: false,
      allChannels: [
            {
                id: 2,
                name: '开发资讯'
            },
            {
                id: 3,
                name: 'ios'
            },
            {
                id: 4,
                name: 'c++'
            },
            {
                id: 5,
                name: 'android'
            },
            {
                id: 6,
                name: 'css'
            },
            {
                id: 8,
                name: '区块链'
            },
            {
                id: 9,
                name: 'go'
            },
            {
                id: 10,
                name: '产品'
            },
            {
                id: 11,
                name: '后端'
            },
            {
                id: 12,
                name: 'linux'
            },
            {
                id: 13,
                name: '人工智能'
            },
            {
                id: 14,
                name: 'php'
            },
            {
                id: 15,
                name: 'javascript'
            },
            {
                id: 16,
                name: '架构'
            },
            {
                id: 17,
                name: '前端'
            },
            {
                id: 18,
                name: 'python'
            },
            {
                id: 19,
                name: 'java'
            },
            {
                id: 20,
                name: '算法'
            },
            {
                id: 21,
                name: '面试'
            },
            {
                id: 22,
                name: '科技动态'
            },
            {
                id: 23,
                name: 'js'
            },
            {
                id: 24,
                name: '设计'
            },
            {
                id: 25,
                name: '数码产品'
            },
            {
                id: 1,
                name: 'html'
            },
            {
                id: 7,
                name: '数据库'
            },
            {
                id: 26,
                name: '软件测试'
            },
            {
                id: 27,
                name: '测试开发'
            },
            {
                id: 31,
                name: 'test4'
            },
            {
                id: 32,
                name: 'test18'
            },
            {
                id: 41,
                name: 'test17'
            }
        ]
  }
 },
 computed: {
     ...mapState(['user']),
     // 推荐的频道列表
    recommendchannels () {
        // 思路:所有频道–我的频道=剩下的推荐频道
        // filter方法:过滤数据，根据方法返回的布尔值true 来收集数据
        // 判断channel是否属于用户频道
        // filter方法查找满足条件的所有元素
        return this.allChannels.filter(channel => {
            // find方法查找满足条件的单个元素
            return !this.userChannels.find(userChannel => {
                // 找到满足该条件的元素
                return userChannel.id === channel.id
            })
        })
    }
 },
 watch: {},
 created() {
    //  this.loadAllChannels()
 },
 mounted() {},
 methods: {
     // 存在跨域请求
    //  async loadAllChannels () {
    //      const { data } = await getAllChannels()
    //      console.log(data)
    //      this.allChannels = data.data.channels
    //  },
   async onAdd (channel) {
        this.userChannels.push(channel)

        // 数据持久化
        // 如果登录了
        if (this.user) {
            // 存数据库
            await addUserChannels({
                channel: [
                    { id: channel.id, seq: this.userChannels.length }
                ]
            })
        } else {
            // 存本地
            setItem('user-channels', this.userChannels)
        }
    },
    onUserChannelClick (channel, index) {
        // 推荐频道不能删除
        if (this.isEdit && index !== 0) {
            // 编辑状态，删除频道
            this.deleteChannel(channel, index)
        } else {
            // 非编辑状态，切换频道
            this.switchChannel(index)
        }
    },
    async deleteChannel (channel, index) {
        // 如果删除的是当前激活频道之前的频道
        if (index <= this.active) {
            // 更新激活频道的索引
            this.$emit('update-active', this.active - 1)
        }
        // console.log(index)
        this.userChannels.splice(index, 1)

        // 数据持久化
        if (this.user) {
            // 登录了，持久化到线上
            await deleteUserChannel(channel.id)
        } else {
            // 没有登录，持久化到本地
            setItem('user-channels', this.userChannels)
        }
    },
    switchChannel (index) {
        console.log(index)
        // 切换频道
        this.$emit('update-active', index)

        // 关闭弹出层
        this.$emit('close')
    }
 }
}
</script>
<style lang='scss' scoped>
.channel-edit{
    padding-top: 54px;
    .channel-title{
        font-size: 16px;
        color: #333;
    }
    .van-button--danger{
        width:50px;
    }
    /deep/ .grid-item{
        width:80px;
        height: 43px;
        /deep/ .van-grid-item__content{
            background-color: #f4f5f6;
            .van-grid-item__text{
                font-size:12px;
                color:#222;
                margin-top:0;
            }
        }
        .van-icon-close{
            position: absolute;
            right: -5px;
            top: -5px;
            font-size: 18px;
            color: #ccc;
        }
    }
    .active{
        /deep/ .van-grid-item__text{
            color: red !important;
        }
    }
}
</style>
