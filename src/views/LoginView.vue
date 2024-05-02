<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Login</h1>  
        <div class="p-field">
          <label for="username">Username</label>
          <InputText id="username" v-model="username" />
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <Password id="password"  v-model="password" :feedback="false"" />
        </div>
        <div class="login-button">
          <Button label="Submit" icon="pi pi-check" iconPos="right" />
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();
const login = async () => {
  router.push('/');
};

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login {
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.p-field {
  margin-bottom: 15px;
}

.login-button {
  margin-top: 15px;
}
</style>
