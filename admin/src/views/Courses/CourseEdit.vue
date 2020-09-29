<template>
  <div class="home">
    <h3>{{isEdit? '编辑课程': '创建课程'}}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class CourseList extends Vue {
  @Prop(String) id!: string
  data = [];
  fields = {
    _id: { label: 'ID' },
    name: { label: '课程名称' },
    cover: { label: '课程封面图' }
  }

  get isEdit () {
    return this.id
  }

  async fetch () {
    const res = await this.$http.get('/courses')
    this.data = res.data.data
  }

  created () {
    this.fetch()
  }
}
</script>
