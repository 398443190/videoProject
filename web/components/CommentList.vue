<template>
  <v-card flat titl class="pa-3">
    <v-form @submit.prevent="send">
      <v-text-field
        label="说点啥呢"
        required
        append-icon="mdi-send"
        @click:append="send"
        v-model="content"
      ></v-text-field>
    </v-form>
    评论列表
    <v-list two-line>
      <v-list-item v-for="(item, index) in comments" :key="index">
        <v-list-item-avatar>
          <span class="white-text">{{ item.user }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.content }}</v-list-item-title>
          <v-list-item-subtitle>
            <span>{{ item.user.username }}</span>
            <span>{{ item.createdAt }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      comments: [],
    }
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
  },
  watch: {
    object: {
      handler: 'fetch',
      immediate: true,
    },
  },
  methods: {
    async send() {
      const ret = await this.$axios.$post('comments', {
        type: this.type,
        object: this.object,
        content: this.content,
      })
      await this.fetch()
      this.content = ''
    },
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              type: this.type,
              object: this.object,
            },
            sort: '-_id'
          },
        },
      })
    },
  },
}
</script>
<style></style>
