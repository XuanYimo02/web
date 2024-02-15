<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <UserProfileInfo @follow="follow" @unfollow="unfollow" v-bind:user="user"></UserProfileInfo>
        <UserProfileSubmit v-if="is_me" @editpost='editpost'></UserProfileSubmit>
        <!-- <UserProfilewrite></UserProfilewrite> -->
      </div>
      <div class="col-9">
        <UserProfilePosts :user="user" :posts="posts" @delete_post="delete_post"></UserProfilePosts>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue';
import UserProfileInfo from '@/components/UserProfileInfo.vue';
import UserProfilePosts from '@/components/UserProfilePosts.vue';
import UserProfileSubmit from '@/components/UserProfileSubmit.vue';
// import UserProfilewrite from '@/components/UserProfilewrite.vue';
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from 'vuex';
import store from '@/store';

export default {
  name: 'UserActive',

  components: {
    ContentBase,
    UserProfileInfo,
    UserProfilePosts,
    UserProfileSubmit,
    // UserProfilewrite,
  },

  setup: () => {
    const route = useRoute();
    let userId = parseInt(route.params.userId);
    console.log(userId);
    const user = reactive({});
    const posts = reactive({});
    const stroe = useStore();

    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
      type: 'get',
      data: {
        user_id: userId,
      },
      headers: {
        'Authorization': 'Bearer ' + stroe.state.user.access,
      },
      success(resp) {
        user.id = resp.id;
        user.username = resp.username;
        user.photo = resp.photo;
        user.is_followed = resp.is_followed;
        user.followcount = resp.followerCount;
      }
    });

    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
      type: 'get',
      data: {
        user_id: userId,
      },
      headers: {
        'Authorization': 'Bearer ' + stroe.state.user.access,
      },
      success(resp) {
        console.log(resp);
        posts.count = resp.length;
        posts.posts = resp;
      },
    });

    const follow = () => {
      if (user.is_followed) return;
      user.is_followed = true;
      user.followcount++;
    };

    const unfollow = () => {
      if (!user.is_followed) return;
      user.is_followed = false;
      user.followcount--;
    };

    const editpost = (content) => {
      posts.posts.unshift({
        id: ++posts.count,
        userid: 1,
        content: content,
      });
    };

    const delete_post = (post_id) => {
      posts.posts = posts.posts.filter(post => post.id !== post_id);
      posts.count = posts.posts.length;
    };

    const is_me = computed(() => userId === store.state.user.id);

    return {
      user,
      follow,
      unfollow,
      posts,
      editpost,
      is_me,
      delete_post,
    }
  }
}
</script>

<style scoped></style>