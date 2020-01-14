<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated>
      <q-toolbar class="q-mx-sm-auto">
        <q-btn flat class="q-mr-sm" to="/">
          <q-avatar>
            <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png">
          </q-avatar>
          <q-toolbar-title class="gt-xs">SPACE</q-toolbar-title>
        </q-btn>
        <q-btn stretch flat label="产品下载" class="gt-xs"/>
        <q-btn stretch flat label="产品介绍" class="gt-xs"/>
        <q-space/>
        <q-btn stretch flat label="登录" class="gt-xs" to="/login"/>
        <q-btn stretch flat label="注册" class="gt-xs" to="/register"/>
        <!--响应式出现头像-->
        <q-btn rounded dense flat class="xs" @click="showLoginFlag = true">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="showLoginFlag"
      :width="150"
      side="right">
      <q-list>
        <q-item
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>
            <q-btn to="/login">登录</q-btn>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>
          <q-item-section>注册</q-item-section>
        </q-item>

        <q-separator spaced />
        <q-item
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="cloud_download" />
          </q-item-section>

          <q-item-section>产品下载</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-icon name="extension" />
          </q-item-section>
          <q-item-section>产品介绍</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <q-footer>
      <p class="q-ma-none text-center text-h6">我是脚本</p>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'SpaceLayout',
  data () {
    return {
      showLoginFlag: false
    }
  },
  watch: {
    '$q.screen.xs': function (newVal) {
      if (!newVal) {
        this.showLoginFlag = false
      }
    }
  }
}
</script>

<style scoped>
</style>
