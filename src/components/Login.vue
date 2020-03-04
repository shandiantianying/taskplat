<template>
  <div class="login-vue" :style="bg">
    <div class="container">
      <p class="title">WELCOME</p>
      <div class="input-c">
        <Input
          prefix="ios-contact"
          v-model="account"
          placeholder="用户名"
          clearable
          @on-blur="verifyAccount"
        />
        <p class="error">{{accountError}}</p>
      </div>
      <div class="input-c">
        <Input
          type="password"
          v-model="pwd"
          prefix="md-lock"
          placeholder="密码"
          clearable
          @on-blur="verifyPwd"
        />
        <p class="error">{{pwdError}}</p>
      </div>

      <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
      <p class="account">
        <span @click="register">注册账号</span> |
        <span @click="forgetPwd">忘记密码</span>
      </p>
    </div>
  </div>
</template>

<script>
import { request } from "../network/index";
export default {
  name: "login",
  data() {
    return {
      account: "admin",
      pwd: "admin",
      accountError: "",
      pwdError: "",
      isShowLoading: false,
      bg: {}
    };
  },
  created() {
    this.bg.backgroundImage =
      "url(" +
      require("../assets/imgs/bg0" + new Date().getDay() + ".jpg") +
      ")";
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    verifyAccount() {
    //   if (this.account !== "admin") {
    //     this.accountError = "账号为admin";
    //   } else {
    //     this.accountError = "";
    //   }
    },
    verifyPwd() {
    //   if (this.pwd !== "admin") {
    //     this.pwdError = "密码为admin";
    //   } else {
    //     this.pwdError = "";
    //   }
    },
    register() {},
    forgetPwd() {},
    submit() {
      let params = {
        username: this.account,
        password: this.pwd
      };
      console.log(params);
      this.isShowLoading = true
      request({
        url: "v1/user/checkUser",
        method: "POST",
        data: params,
      })
        .then(res => {
        this.isShowLoading = false;
          if(res.data.errorCode==='-1'){
              this.accountError = res.data.errorMsg;
          }else if(res.data.errorCode==='-2'){
             this.pwdError = res.data.errorMsg;
          }if(res.data.errorCode==='0'){
              console.log(res);
              localStorage.setItem('userImg', 'http://img3.imgtn.bdimg.com/it/u=327780991,864370952&fm=11&gp=0.jpg')
              localStorage.setItem('userName', this.account)
              // 登陆成功 假设这里是后台返回的 token
              localStorage.setItem('token', 'i_am_token')
              this.$router.push({ path: this.redirect || '/' })
          }
           else {

              this.$Message.warning("您的账号，密码登录异常，请稍候再试！");
          }
        })
        .catch(res => {
          this.isShowLoading = false;
          this.$Message.warning("您的网络连接异常，请稍候再试！");
        });
        this.isShowLoading = false;

      // if (this.account === 'admin' && this.pwd === 'admin') {
      //         this.isShowLoading = true
      //         // 登陆成功 设置用户信息
      //         localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
      //         localStorage.setItem('userName', '小明')
      //         // 登陆成功 假设这里是后台返回的 token
      //         localStorage.setItem('token', 'i_am_token')
      //         this.$router.push({ path: this.redirect || '/' })
      //     } else {
      //         if (this.account !== 'admin') {
      //             this.accountError = '账号为admin'
      //         }

      //         if (this.pwd !== 'admin') {
      //             this.pwdError = '密码为admin'
      //         }
      //     }
    }
  }
};
</script>

<style>
.login-vue {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.login-vue .container {
  background: rgba(255, 255, 255, 0.5);
  width: 300px;
  text-align: center;
  border-radius: 10px;
  padding: 30px;
}
.login-vue .ivu-input {
  background-color: transparent;
  color: #fff;
  outline: #fff;
  border-color: #fff;
}
.login-vue ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue .title {
  font-size: 16px;
  margin-bottom: 20px;
}
.login-vue .input-c {
  margin: auto;
  width: 200px;
}
.login-vue .error {
  color: red;
  text-align: left;
  margin: 5px auto;
  font-size: 12px;
  padding-left: 30px;
  height: 20px;
}
.login-vue .submit {
  width: 200px;
}
.login-vue .account {
  margin-top: 30px;
}
.login-vue .account span {
  cursor: pointer;
}
.login-vue .ivu-icon {
  color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
  color: #777;
}
</style>
