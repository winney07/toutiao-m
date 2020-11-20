<!-- 登录页面 -->
<template>
    <div id="" class="login-container">
        <van-nav-bar
        class="app-nav-bar"
        title="注册/登录"
        left-arrow
        @click-left="$router.back()"
        />
        <!-- 登录表单 -->
        <van-cell-group>
            <van-field
                v-model="user.mobile"
                label="文本"
                left-icon="smile-o"
                right-icon="warning-o"
                placeholder="请输入手机号"
            />
            <van-field
                v-model="user.code"
                clearable
                label="文本"
                left-icon="music-o"
                placeholder="请输入验证码"
            >
                <template #button>
                    <van-button size="small" round>获取验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" type="info" block>登录</van-button>
            </div>
        </van-cell-group>
    </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
        user: {
            mobile: '',
            code: ''
        }
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
    .login-container{
        .login-btn-wrap{
            padding: 26px 16px;
            .login-btn{
                background-color: #6db4fd;
                border:none;
            }
        }
    }
</style>
