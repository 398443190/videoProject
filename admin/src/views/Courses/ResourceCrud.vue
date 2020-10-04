<template>
  <div class="home">
    <avue-crud v-if="option.column" :data="data" :option="option" @row-del="rowDelete" @row-save="rowSave" @row-update="update"></avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class CourseList extends Vue {
  @Prop(String) resource!: string;
  data = [];
  option = {}

  async fetch () {
    const res = await this.$http.get(`${this.resource}`);
    this.data = res.data.data;
  }

  async fetchOption () {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }

  async rowDelete (form: any, index: number) {
    console.log(form, 'form')
    console.log(index, 'index')
    try {
      await this.$confirm("是否确认删除？");
    } catch (e) {
      console.log(e, "e");
      return;
    }
    await this.$http.delete(`/${this.resource}/${form._id}`);
    this.$message.success("删除成功");
    this.fetch()
  }

  async rowSave (form: any, done: any, loading: any) {
    await this.$http.post(`${this.resource}`, form)
    this.$message.success('保存成功')
    this.fetch();
    done();
    console.log(form, 'form')
    console.log(done, 'done')
    console.log(loading, 'loading')
  }

  async update (row: any, index: any, done: any, loading: any) {
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`${this.resource}/${row._id}`, data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }

  created () {
    this.fetch();
    this.fetchOption();
  }
}
</script>
