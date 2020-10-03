<template>
  <div class="course-edit">
    <h3>{{ isEdit ? "编辑课程" : "创建课程" }}</h3>
    <ele-form v-model="formData" :form-desc="formDesc" :request-fn="submit"></ele-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class CourseList extends Vue {
  @Prop(String) id!: string;
  formData = {};
  formDesc = {
    name: { label: "课程名称", type: "input" },
    cover: { label: "课程封面图", type: "input" }
  };

  get isEdit () {
    return this.id;
  }

  async fetch () {
    const res = await this.$http.get(`/courses/${this.id}`)
    console.log(res, 'res')
    console.log(res.data, 'res.data')
    this.formData = res.data
  }

  created () {
    this.isEdit && this.fetch();
  }

  async submit (value: any) {
    const url = this.isEdit ? `courses/${this.id}` : `courses`
    const method = this.isEdit ? 'put' : 'post'
    await this.$http[method](url, value)
    this.$message.success('保存成功')
    this.formData = {}
    this.$router.go(-1)
  }
}
</script>
