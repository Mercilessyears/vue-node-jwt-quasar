<template>
  <q-page class="column flex-center">
    <!-- 1.首页大背景-->
    <q-img
      src="../statics/images/banner.jpg">
    </q-img>
    <!--2.软件介绍-->
    <div class="column justify-center q-my-md">
      <div class="banner-item row">
        <picture>
          <source media="(max-width: 600px)" srcset="../statics/icons/apple-icon-120x120.png">
          <source media="(min-width: 600px)" srcset="../statics/images/banner1.jpg">
          <img src="../statics/images/banner1.jpg" width="300px" height="400px" />
        </picture>
        <div class="item-text column justify-center items-center" style="width: 400px"><p>我是文本一</p></div>
      </div>
      <div class="banner-item row">
        <div class="item-text column justify-center items-center" style="width: 400px"><p>我是文本二</p></div>
        <picture>
          <source media="(max-width: 600px)" srcset="../statics/icons/apple-icon-120x120.png">
          <source media="(min-width: 600px)" srcset="../statics/images/banner1.jpg">
          <img src="../statics/images/banner1.jpg" width="300px" height="400px" />
        </picture>
      </div>
      <div class="banner-item row">
        <picture>
          <source media="(max-width: 600px)" srcset="../statics/icons/apple-icon-120x120.png">
          <source media="(min-width: 600px)" srcset="../statics/images/banner1.jpg">
          <img src="../statics/images/banner1.jpg" width="300px" height="400px" />
        </picture>
        <div class="item-text column justify-center items-center" style="width: 400px"><p>我是文本三</p></div>
      </div>
    </div>
    <!--3.注册引导-->
    <q-banner class="bg-grey-3 text-bold text-center q-pb-md" style="width: 100%">
      <p>高效办公，高速浏览模型，便捷办公</p>
      <p>立即加入我们吧！</p>
      <q-btn rounded push color="red" size="md">立即注册</q-btn>
    </q-banner>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style scoped lang="scss">
  .banner-item{
    margin: 10px 0 ;
  }
</style>
