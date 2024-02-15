<template>
  <ContentBase>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Handle</label>
            <input v-model="handle" type="text" class="form-control" id="exampleInputEmail1">
            <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Confirm password</label>
            <input v-model="password_confirm" type="password" class="form-control" id="exampleInputPassword2">
          </div>
          <!-- <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
          <div class="error">{{ error_message }}</div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import $ from 'jquery';

export default {
  name: 'RegisterView',

  components: {
    ContentBase,
  },

  setup() {
    const store = useStore();
    let handle = ref('');
    let password = ref('');
    let password_confirm = ref('');
    let error_message = ref('');

    const register = () => {
      error_message.value = "";
      console.log(handle.value, password.value, password_confirm.value);

      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/user/',
        type: 'post',
        data: {
          username: handle.value,
          password: password.value,
          password_confirm: password_confirm.value,
        },
        success(resp) {
          if (resp.result === 'success') {
            store.dispatch("login", {
              handle: handle.value,
              password: password.value,
              success() {
                router.push({ name: 'userlist' });
              },
              error() {
                error_message.value = 'system error , please try again later';
              },
            });
          }
          else {
            error_message.value = resp.result;
          }
        },
      });
    };

    return {
      handle,
      password,
      password_confirm,
      error_message,
      register,
    }
  }
}
</script>

<style scoped>
button {
  width: 100%;
}

.error {
  color: red;
}
</style>