<!-- 小智同学 -->
<template>
 <div class="user-chat">
    <van-nav-bar
        class="app-nav-bar"
        title="小智同学"
        left-arrow
        @click-left="$router.back()"
    />

    <!-- 消息列表 -->
    <van-cell-group class="message-list">
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
        <van-cell title="单元格"/>
    </van-cell-group>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-field
    class="send-message-wrap"
        v-model="message"
        center
        clearable
        placeholder="请输入消息"
        >
        <template #button>
            <van-button size="small" type="primary">发送</van-button>
        </template>
    </van-field>
    <!-- /发送消息 -->
 </div>
</template>

<script>
// import io from 'socket.io-client'

// const socket = io('http://ttapi.research.itcast.cn')
// socket.on('connect', function() {
//     console.log('建立连接成功')
// })
// socket.on('event', function(data) {

// })
// socket.on('disconnect', function() {

// })

export default {
 name: 'UserChat',
 components: {},
 props: {},
 data () {
  return {
      message: ''
  }
 },
 computed: {},
 watch: {},
 created() {},
 mounted() {},
 methods: {}
}
</script>
<style lang='scss' scoped>
.message-list{
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 52px;
    overflow-y: auto;
}
.send-message-wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
/deep/ .van-button{
    width: 60px;
}
</style>
