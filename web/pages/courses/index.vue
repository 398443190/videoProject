<template>
  <div class="pa-3">
    <h3 class="">热门课程</h3>
    <v-row class="">
      <v-col v-for="item in courses" :key="item._id" md="3">
        <v-card class="mx-auto" max-width="344">
          <router-link :to="`courses/${item._id}`">
            <v-img :src="item.cover" height="200px"></v-img>

            <v-card-title>{{ item.name }}</v-card-title>
          </router-link>

          <v-card-subtitle> {{ item.createAt }} </v-card-subtitle>

          <v-card-actions>
            <like-btn name="LIKE" type="Course" :object="item._id"></like-btn>
            <v-btn color="orange lighten-2" text> Explore </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
export default {
  components: {
    LikeBtn,
  },
  data() {
    return {
      show: false,
    }
  },
  async asyncData({ $axios }) {
    const data = await $axios.$get('courses')
    return {
      courses: data.data,
    }
  },
}
</script>
