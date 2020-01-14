<template>
  <q-layout view="hHh lpr lff" class="overflow-hidden">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar class="q-px-lg">
        登录状态：{{ isLogin }}
        <q-btn dense flat round icon="menu" @click="workBenchLeftFlag = !workBenchLeftFlag" />

        <q-btn flat class="q-mr-sm" to="/workbench">
          <q-avatar>
            <img src="https://cdn.quasar.dev/app-icons/icon-128x128.png">
          </q-avatar>
          {{ username }}
          <q-toolbar-title class="gt-xs">SPACE</q-toolbar-title>
        </q-btn>
        <q-space/>
        <q-btn-dropdown icon="fas fa-bell" stretch flat dense>
          <q-tabs v-model="MessageTab">
            <q-tab name="SysMessage" label="系统消息" />
            <q-tab name="InvMessage" label="邀请消息" />
          </q-tabs>
          <q-tab-panels v-model="MessageTab">
            <q-tab-panel name="SysMessage">
              <q-list>
                <q-item-section v-for="(l, i) in MessageList" :key="i">
                  {{ l.name }}
                </q-item-section>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-btn-dropdown>
        <q-btn round>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

<!--    <q-drawer v-model="workBenchLeftFlag" side="left" overlay bordered>-->
<!--      &lt;!&ndash; drawer content &ndash;&gt;-->
<!--    </q-drawer>-->
    <q-drawer
      v-model="workBenchLeftFlag"
      show-if-above
      @click.capture="drawerClick"
      @mini-state="drawerMiniClick"

      :width="60+listWidth"
      :breakpoint="600"

      content-class="bg-grey-3"
    >
      <q-layout class="column" style="height: 100%">
        <q-list padding style="width: 60px;height: 100%" bordered class="bg-deep-orange-2">
          <q-item clickable v-ripple :active="menuLink === 'workbench_index'" to="/workbench/index" @click="clickIndexBtn" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="inbox" />
              <span>工作</span>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :active="menuLink === 'project'" to="/workbench/project" @click="clickProjectBtn" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="fas fa-th-list"/>
              <span>项目</span>
            </q-item-section>

          </q-item>

          <q-item clickable v-ripple :active="menuLink === 'members'" to="/workbench/members" @click="clickMembersBtn" active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="fas fa-users"/>
              <span>成员</span>
            </q-item-section>
          </q-item>
        </q-list>
        <!--中间详细列表-->
        <q-page-container :style="{width: listWidth + 'px'}">
          <router-view />
        </q-page-container>
      </q-layout>

      <div class="q-mini-drawer-hide absolute" :style="{top: ($q.screen.height-50)/2 + 'px', right: '-14px'}">
        <q-btn
          dense
          outline
          unelevated
          color="secondary"
          class="glossy"
          style="width: 15px;height: 40px"
          :icon="listWidthFlag ? 'chevron_right' : 'chevron_left'"
          size="10px"
          @click="toggleForList"
        >
          <q-tooltip anchor="center right" self="center left" content-class="bg-gry">收缩</q-tooltip>
        </q-btn>
      </div>
    </q-drawer>

  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SpaceWorkbenchLayout',
  data () {
    return {
      listWidth: 240,
      listWidthFlag: false,
      showDetilesList: true,
      menuLink: 'workbench',
      workBenchLeftFlag: false,
      miniState: false,
      MessageTab: 'SysMessage',
      MessageList: [{ id: 1, name: 'xxxx' }, { id: 2, name: 'wwww' }]
    }
  },
  computed: {
    ...mapState({
      username: state => state.login.userInfo.name,
      isLogin: state => state.login.isLogin
    })
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions('login', {
      setUserInfo: 'set_user'
    }),
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    // 获取用户基础信息
    async getUserInfo () {
      const res = await this.setUserInfo()
      console.log(res)
      if (!res) {
        this.$q.notify('获取用户信息失败！')
      }
    },
    drawerMiniClick (e) {
      console.log(e)
    },
    toggleForList () {
      this.listWidthFlag = !this.listWidthFlag
      if (this.listWidthFlag) {
        this.listWidth = 0
      } else {
        this.listWidth = 240
      }
    },
    clickIndexBtn () {
      this.menuLink = 'workbench_index'
      if (this.$q.screen.xs) {
        this.workBenchLeftFlag = true
      }
    },
    clickMembersBtn () {
      this.menuLink = 'members'
      if (this.$q.screen.xs) {
        this.workBenchLeftFlag = true
      }
    },
    clickProjectBtn () {
      this.menuLink = 'project'
      if (this.$q.screen.xs) {
        this.workBenchLeftFlag = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.my-menu-link{
  color: white;
  background: #7eb2f2
}
</style>
<style>
.q-drawer__content{
  overflow: hidden !important;
}
</style>
