<template>
  <div class="card">
    <div class="card-body">
      <div v-for="post in  posts.posts " :key="post.id">
        <div class="card post">
          <div class="card-body">
            {{ post.content }}
            <button v-if="is_me" @click="delete_post(post.id)" type="button" class="btn btn-danger btn-sm">delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';

export default {
  name: 'UserProfilePosts',

  props: {
    posts: {
      type: Object,
      requied: true,
    },
    user: {
      type: Object,
      requied: true,
    },
  },

  setup: (props, context) => {
    const stroe = useStore();

    let is_me = computed(() => stroe.state.user.id === props.user.id);

    const delete_post = (post_id) => {
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
        type: 'delete',
        data: {
          post_id: post_id,
        },
        headers: {
          'Authorization': 'Bearer ' + stroe.state.user.access,
        },
        success(resp) {
          console.log('delete ' + resp.result);
          context.emit('delete_post', post_id);
        },
        error(resp) {
          console.log('delete ' + resp.result);
        },
      });
    };

    return {
      is_me,
      delete_post,
    }
  },
}
</script>

<style scoped>
.post {
  margin-bottom: 10px;
}

button {
  float: right;
}
</style>