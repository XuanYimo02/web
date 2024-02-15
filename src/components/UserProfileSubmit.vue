<template>
  <div class="card edit">
    <div class="card-body">
      <label for="floatingTextarea2" class="form-label">Edit Post</label>
      <!-- <div class="form-floating"> -->
      <textarea v-model="content" class="form-control" id="floatingTextarea2" rows="3"></textarea>
      <button @click="editpost" type="button" class="btn btn-primary btn-sm">Submit</button>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
  name: 'UserProfileSubmit',

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
            console.log('submit ' + resp.result);
            context.emit('editpost', content.value);
            content.value = "";
          }
        },
        error(resp) {
          console.log('submit ' + resp.result);
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
.edit,
button {
  margin-top: 10px;
}
</style>