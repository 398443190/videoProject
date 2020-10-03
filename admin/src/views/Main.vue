<template>
  <el-container>
      <el-aside width="200px">
        <el-menu style="height:100vh" mode="vertical" :default-active="$route.path" router>
          <el-submenu
            v-for="(item, index) in menu.items"
            :index="`menu-item-${index }`"
            :key="`menu-item-${index}`"
          >
            <template slot="title">{{ item.title }}</template>
            <el-menu-item
              v-for="(subItem, subIndex) in item.items"
              :index="subItem.path"
              :key="`subItem-index-${subIndex}`"
            >
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
          <el-header><h3 class="">a lu 的视频网站</h3></el-header>
        <el-main height="">
          <!-- Main content -->
          <router-view :key="$route.path"/>
        </el-main>
        <el-footer height="">
          <!-- Footer content -->
        </el-footer>
      </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "课程管理", path: "/courses/list" },
          { title: "课时管理", path: "/courses/create" }
        ]
      },
      {
        title: "运营管理",
        items: [{ title: "用户管理", path: "/user" }]
      }
    ]
  };
}
</script>
