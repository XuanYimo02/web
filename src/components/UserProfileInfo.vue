<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3 img-field">
          <img :src="user.photo" class="img-fluid" alt="">
        </div>
        <div class="col-9">
          <!-- <div class="username">{{ fullname }}</div> -->
          <div class="username">{{ user.username }}</div>
          <div class="fans">粉丝:{{ user.followcount }}</div>
          <button v-on:click='follow' v-if="!user.is_followed" type="button" class="btn btn-secondary btn-sm">关注</button>
          <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-secondary btn-sm">取消关注</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
  name: 'UserProfileInfo',

  props: {
    user: {
      type: Object,
      required: true,
    }
  },

  setup: (props, context) => {
    let fullname = computed(() => props.user.lastname + ' ' + props.user.firstname);
    // let fullname = props.user.lastname + ' ' + props.user.firstname;
    const store = useStore();

    const follow = () => {
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
        type: 'post',
        data: {
          target_id: props.user.id,
        },
        headers: {
          'Authorization': 'Bearer ' + store.state.user.access,
          // 'Authentication': 'Bearer' + access,
        },
        success(resp) {
          if (resp.result === 'success') {
            context.emit('follow');
          }
        }
      });
    };

    const unfollow = () => {
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
        type: 'post',
        data: {
          target_id: props.user.id,
        },
        headers: {
          'Authorization': 'Bearer ' + store.state.user.access,
          // 'Authentication': 'Bearer' + access,
        },
        success(resp) {
          if (resp.result === 'success') {
            context.emit('unfollow');
          }
        }
      });
    };

    return {
      fullname,
      follow,
      unfollow,
    }
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
}

.username {
  font-weight: bolder;
}

.fans {
  font-size: 12px;
  color: gray;
}

button {
  padding: 2px 4px;
  font-size: 12px;
}

.img-field {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>