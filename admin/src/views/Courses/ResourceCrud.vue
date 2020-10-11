<template>
  <div class="home">
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      @row-del="rowDelete"
      @row-save="rowSave"
      @row-update="update"
      :page.sync="page"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="searchChange"
      :upload-before="uploadBefore"
      v-model="obj"
    >
    </avue-crud>
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
  option = {};
  obj = { cover: '', file: '' };
  page = {
    pageSize: 2,
    pageSizes: [2, 5, 10],
    total: null
  }

  query: any = {
  }

  async fetch () {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.data = res.data;
    this.page.total = res.data.total
  }

  async uploadBefore (file: any, done) {
    console.log(file, 'file')
    const params = new FormData()
    params.append('file', file)
    const res: any = await this.$http.post('upload', params, {
      headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
    })
    if (res && res.data.url) {
      this.obj.cover = res.data.url
      this.obj.file = res.data.url
      done()
    }
  }

  async changePage ({ pageSize, currentPage }: any) {
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }

  async changeSort ({ prop, order }: any) {
    if (!order) {
      this.query.sort = null
    } else {
      this.query.sort = {
        [prop]: order === 'ascending' ? 1 : -1
      }
    }
    this.fetch()
  }

  async searchChange (where: any, done: any) {
    // for (const k in where) {
    //   const field = this.option.column.find(v => v.prop === k)
    //   if (field.regex) {
    //     where[k] = { $regex: where[k] }
    //   }
    // }
    this.query.where = where
    done()
    this.fetch()
  }

  async fetchOption () {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }

  async rowDelete (form: any, index: number) {
    console.log(form, "form");
    console.log(index, "index");
    try {
      await this.$confirm("是否确认删除？");
    } catch (e) {
      console.log(e, "e");
      return;
    }
    await this.$http.delete(`/${this.resource}/${form._id}`);
    this.$message.success("删除成功");
    this.fetch();
  }

  async rowSave (form: any, done: any, loading: any) {
    await this.$http.post(`${this.resource}`, form);
    this.$message.success("保存成功");
    this.fetch();
    done();
    console.log(form, "form");
    console.log(done, "done");
    console.log(loading, "loading");
  }

  async update (row: any, index: any, done: any, loading: any) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
    this.$message.success("更新成功");
    this.fetch();
    done();
  }

  created () {
    // this.fetch();
    this.fetchOption();
  }
}
</script>
