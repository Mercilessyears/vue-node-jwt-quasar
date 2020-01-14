<template>
  <q-page padding class="flex justify-center items-center">
    <div>
      <div class="text-center text-h5 shadow-3 q-pa-md">
        账号注册
      </div>
      <q-form @submit="submitRegister" class="q-pa-lg shadow-3 rounded-borders" style="width: 35em">
        <q-input label="用户名" filled v-model="registerForm.name" lazy-rules :rules="registerRules.name"/>
        <q-input type="password" filled label="密码" v-model="registerForm.pwd" lazy-rules :rules="registerRules.pwd"/>
        <q-input label="真实姓名" filled v-model="registerForm.realname" lazy-rules :rules="[val => !!val]"/>
        <q-input type="tel" label="手机号码" filled v-model="registerForm.phone" lazy-rules :rules="registerRules.phone"/>
        <q-input type="email" label="邮箱地址" filled v-model="registerForm.email" lazy-rules :rules="registerRules.email"/>
        <q-toggle v-model="accept" label="阅读并同意条款" class="q-mt-xs"></q-toggle>
        <div>
          <q-btn label="注册" type="submit" color="primary" class="q-mt-lg fit"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import fetch from '../requests/fetch'
export default {
  name: 'Register',
  data () {
    return {
      registerForm: {
        name: 'qwer',
        pwd: 'qqqqqwwww',
        realname: 'qweq',
        phone: '123',
        email: '123@qq.com'
      },
      registerRules: {
        name: [val => !!val || '用户名不能为空', val => val.length > 2 || '用户名长度不能小于3位'],
        pwd: [val => !!val || '密码不能为空', val => val.length > 7 || '用户名长度不能小于8位'],
        phone: [val => !!val || '手机号码不能为空'],
        email: [val => !!val || '邮箱不能为空']
      },
      accept: false,
      userData: null
    }
  },
  mounted () {
  },
  methods: {
    submitRegister () {
      if (this.accept) {
        fetch.post('http://192.168.1.103:7001/users', this.registerForm).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$q.notify('注册成功')
          } else {
            this.$q.notify(res.data)
          }
        }).catch((err) => {
          this.$q.notify(err.message)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
