<template>
  <div class="pa-3">
    <h3 class="">{{ course.name }}</h3>
    <v-select
        :items="course.episodes.map((v, index) => ({ text: v.name, value: index }))"
        v-model="currentIndex"
    ></v-select>
    <video :src="episode.file" width="100%" controls height="400px"/>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0
        }
    },
    computed: {
        episode(){
            return this.course.episodes[this.currentIndex]
        }
    },
    async asyncData({params, $axios}) {
        const {id} = params
        const course = await $axios.$get(`courses/${id}`, {
            params: {
                query: { populate: 'episodes' }
            }
        })
        console.log(course)
        return {
            id,
            course
        }
    },
}
</script>

<style></style>
