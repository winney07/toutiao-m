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
        <van-form
            :show-error="false"
            :show-error-message="false"
            validate-first
            ref="login-form"
            @submit="onLogin"
            @failed="onFailed"
        >
            <van-field
                v-model="user.mobile"
                icon-prefix="toutiao"
                left-icon="shouji"
                placeholder="请输入手机号"
                name="mobile"
                :rules="formRules.mobile"
            />
            <van-field
                v-model="user.code"
                clearable
                icon-prefix="toutiao"
                left-icon="yanzhengma"
                center
                placeholder="请输入验证码"
                name="code"
                :rules="formRules.code"
            >
                <template #button>
                    <van-count-down
                        v-if="isCountDownShow"
                        :time="1000 * 60"
                        format="ss s"
                        center
                        @finish="isCountDownShow = false"
                    />
                    <van-button
                        v-else
                        size="mini"
                        class="send-btn"
                        round
                        center
                        @click.prevent = "onSendSms"
                        :disabled="isSendSmsLoading"
                    >获取验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" type="info" block>登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
        user: {
            mobile: '17090086870',
            code: '246810'
        },
        formRules: {
            mobile: [
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号码格式错误' }
            ],
            code: [
                { required: true, message: '请输入验证码' },
                { pattern: /\d{6}$/, message: '验证码格式错误' }
            ]
        },
        isCountDownShow: false, // 控制倒计时和获取验证码的显示状态
        isSendSmsLoading: false // 发送验证码按钮的 loading 状态(避免重复提交)
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
      async onLogin() {
            // 1.  找到数据接口
            // 2.  封装请求方法
            // 3.  请求调用登录
            Toast.loading({
                message: '登录中...',
                forbidClick: true, // 是否禁止背景点击
                duration: 0 // 值为 0 时，toast 不会消失
            })
          try {
              const { data } = await login(this.user)
                // 4. 处理响应结果
              console.log(data)
              Toast.success('登录成功')

              this.$store.commit('setUser', data.data)
              // 清除layout的缓存，让它重新渲染
              this.$store.commit('removeCachePage', 'LayoutIndex')

             // 登录成功，跳转回原来页面
            //   this.$router.back()
              this.$router.push(this.$route.query.redirect || '/')
          } catch (err) {
              console.log(err)
              console.log('登录失败')
              Toast.fail('登录失败')
          }
      },

    //   onSendSms () {
    //       this.$refs['login-form'].validate('mobile').then(
    //         data => {
    //             console.log(data)
    //       })
    //   }

        onFailed (error) {
            if (error.errors[0]) {
                this.$toast({
                    message: error.errors[0].message, // 提示消息
                    position: 'top' // 防止手机键盘太高看不见提示消息
                })
            }
        },

        async onSendSms () {
            try {
                // 校验手机号码
                await this.$refs['login-form'].validate('mobile')

                // 验证通过，请求发送验证码
                this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
                await sendSms(this.user.mobile)

                // 短信发出去了，隐藏发送按钮，显示倒计时
                this.isCountDownShow = true

                // 倒计时结束 -> 隐藏倒计时，显示发送按钮（监视倒计时的 finish 事件处理）
            } catch (err) {
                // try 里面任何代码的错误都会进入 catch
                // 不同的错误需要有不同的提示，那就需要判断了
                let message = ''
                if (err && err.response && err.response.status === 429) {
                    // 发送短信失败的错误提示
                    message = '发送太频繁了，请稍后重试'
                } else if (err.name === 'mobile') {
                    // 表单验证失败的错误提示
                    message = err.message
                } else {
                    // 未知错误
                    message = '发送失败，请稍后重试'
                }

                // 提示用户
                this.$toast({
                    message,
                    position: 'top'
                })
            }

                // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
                this.isSendSmsLoading = false
            }
        }
}
</script>
<style lang='scss' scoped>
    .login-container{
        .send-btn{
            width:76px;
            height: 23px;
            background-color: #ededed;
            .van-button__text{
                font-size: 11px;
                color: #666;
            }
        }
        .login-btn-wrap{
            padding: 26px 16px;
            .login-btn{
                background-color: #6db4fd;
                border:none;
                .van-button__text{
                    font-size: 15px;
                }
            }
        }
    }
</style>
