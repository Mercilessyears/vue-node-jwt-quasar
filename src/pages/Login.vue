<template>
    <q-page class="column justify-center items-center space-login">
      <div style="max-width: 599px;width: 400px">
        <q-tabs v-model="loginTab" inline-label class="bg-grey-5 text-blue-10 shadow-2">
          <q-tab name="orduser" icon="mails" label="普通用户登录" />
          <q-tab name="orguser" icon="photos" label="组织用户登录" />
        </q-tabs>
        <q-tab-panels v-model="loginTab">
          <q-tab-panel name="orduser">
            <q-form @submit="loginSubmit">
              <q-input v-model="loginForm.name" label="用户名" autofocus clearable lazy-rules :rules="loginFormRules.user">
                <template v-slot:prepend>
                  <q-icon name="account_circle"/>
                </template>
              </q-input>
              <q-input v-model="loginForm.pwd" label="密码" type="password" clearable lazy-rules :rules="loginFormRules.pw">
                <template v-slot:prepend>
                  <q-icon name="vpn_key"/>
                </template>
              </q-input>
              <div class="row">
                <q-input v-model="loginForm.code" label="验证码" class="col-8"/>
                <q-field v-model="showCode" class="col-3 offset-1"></q-field>
              </div>
              <q-btn type="submit" label="登录" color="primary" class="fit q-mt-md"/>
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="orguser">
            <q-form>
              <q-input label="组织名">
                <template v-slot:prepend>
                  <q-icon name="fas fa-user-alt"/>
                </template>
              </q-input>
              <q-input label="密码" type="password"/>
              <q-btn color="primary" class="fit q-mt-md" label="登录"/>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-page>
</template>

<script>
import { login } from '../requests/api'

export default {
  name: 'Login',
  data () {
    return {
      loginTab: 'orduser',
      loginForm: {
        name: 'qwer111',
        pwd: '11111111',
        code: ''
      },
      showCode: '1234',
      loginFormRules: {
        // eslint-disable-next-line no-mixed-operators
        user: [val => val && val.length > 0 || '用户名不能为空', val => val.length > 4 || '用户名长度不低于5'],
        // eslint-disable-next-line no-mixed-operators
        pw: [val => val && val.length > 0 || '密码不能为空', val => val.length > 7 || '密码长度不低于8位'],
        code: []
      }
    }
  },
  methods: {
    loginSubmit () {
      login(this.loginForm).then((res) => {
        if (res.data.code === 200) {
          this.$router.push('/workbench')
          this.$q.notify('登录成功')
        } else {
          this.$q.notify(res.data.message)
        }
      }).catch((err) => {
        this.$q.notify(err.message)
      })
    }
  }
}
</script>

<style scoped>
.space-login{
  background: url("../statics/images/banner.jpg") no-repeat;
  background-size: cover;
}
</style>
