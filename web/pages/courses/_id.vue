<template>
  <div class="pa-3">
    <v-row class="">
      <v-col :md="8">
        <video :src="episode.file" width="100%" controls height="400px" />
        <like-btn name="LIKE" type="Episode" :object="episode._id"></like-btn>
        <h3 class="">{{ course.name }}</h3>
        <v-select
          :items="
            course.episodes.map((v, index) => ({ text: v.name, value: index }))
          "
          v-model="currentIndex"
        ></v-select>
      </v-col>
      <v-col :md="4">
      <comment-list type="Episode" :object="episode._id"></comment-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
import CommentList from '../../components/CommentList.vue'
export default {
  data() {
    return {
      currentIndex: 0,
    }
  },
  components: {
    LikeBtn,
    CommentList
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    },
  },
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' },
      },
    })
    console.log(course)
    return {
      id,
      course,
    }
  }
}
</script>

<style></style>
