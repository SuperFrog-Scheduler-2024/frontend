<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';


const authToken = useAuthStore();

const username = ref('');
const password = ref('');

const router = useRouter();


const login = async () => {
  authToken.login(username.value, password.value);
  router.push('/');
};



</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="title">Login</h1>  
        <div class="p-field">
          <p class="field">Username</p>
          <InputText id="username" v-model="username" />
        </div>  
        <div class="p-field">
          <p class="field">Password</p>
          <Password id="password"  v-model="password" :feedback="false" />
        </div>
        <div class="login-button">
          <Button label="Submit" icon="pi pi-check" iconPos="right" @click="login()" />
          
        </div>
    </div>
  </div>
</template>



<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  
}

.login {
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.title {
  text-align: center;
  color: black;
}

.field {
  color: black;
}

.p-field {
  margin-left: 50px;
  margin-bottom: 15px;
}

.login-button {
  margin-top: 15px;
  margin-left: 115px;
  justify-items: center;
}
</style>
