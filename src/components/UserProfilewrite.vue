<template>
  <div class="card edit-field">
    <div class="card-body">
      <label for="edit-post" class="form-label">编辑帖子</label>
      <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
      <button @click="editpost" type="button" class="btn btn-primary btn-sm">发帖</button>
      <div>{{ content }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
  name: "UserProfileWrite",
  setup(props, context) {
    let content = ref('');
    const store = useStore();

    const editpost = () => {
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
        type: 'post',
        data: {
          content: content.value,
        },
        headers: {
          'Authorization': 'Bearer ' + store.state.user.access,
          // 'Authentication': 'Bearer' + access,
        },
        success(resp) {
          if (resp.result === "success") {
            console(resp);
            context.emit('editpost', content.value);
            content.value = "";
          }
        },
        error(resp) {
          console.log(resp);
        },
      });
    };

    return {
      content,
      editpost,
    }
  }
}
</script>

<style scoped>
.edit-field {
  margin-top: 20px;
}

button {
  margin-top: 10px;
}
</style>
