<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>


        <v-list-item class="mt-4">
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
            <v-list-item-title>登录</v-list-item-title>
        </v-list-item>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-bottom-sheet inset v-model="isShowLoginForm">
      <v-form @submit.prevent="login">
        <v-text-field v-model="loginModel.username" label="用户名">
        </v-text-field>
        <v-text-field v-model="loginModel.password" label="密码">
        </v-text-field>
        <v-btn color="success" type="submit">登陆</v-btn>
      </v-form>
    </v-bottom-sheet>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loginModel: {},
      isShowLoginForm: true,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'home',
          title: '首页',
          to: '/',
        },
        {
          icon: 'mdi-apps',
          title: '热门课程',
          to: '/courses',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '热门评论',
          to: '/comments',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'a lu 视频网站',
    }
  },
  methods: {
    login() {
      console.log(111)
    }
  },
}
</script>
