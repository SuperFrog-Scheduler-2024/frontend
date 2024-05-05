<template>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else id="edit-profile">
      <h1>Edit Profile</h1>
      <div class="group">
        <FloatLabel>
          <InputText id="firstName" v-model="student.firstName" />
          <label for="firstName">First Name</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="lastName" v-model="student.lastName" />
          <label for="lastName">Last Name</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="email" v-model="student.email" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <InputMask id="phoneNumber" mask="(999) 999-9999" v-model="student.phoneNumber" />
          <label for="phoneNumber">Phone Number</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="address" v-model="student.address" />
          <label for="address">Address</label>
        </FloatLabel>
      </div>
      <Button label="Save Changes" @click="updateProfile" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import FloatLabel from 'primevue/floatlabel';
  import InputText from 'primevue/inputtext';
  import InputMask from 'primevue/inputmask';
  import Button from 'primevue/button';
  import { useToast } from 'primevue/usetoast';
  
  const studentId = ref('your-student-id'); // This should be dynamically set
  const student = ref({});
  const loading = ref(false);
  const toast = useToast();
  
  onMounted(() => {
      fetchStudentProfile();
  });
  
  async function fetchStudentProfile() {
      loading.value = true;
      try {
          const response = await axios.get(`localhost:8080/api/v1/students/1`);
          student.value = response.data;
      } catch (error) {
          toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load profile data' });
      } finally {
          loading.value = false;
      }
  }
  
  async function updateProfile() {
      try {
          const response = await axios.put(`localhost:8080/api/v1/students/1`, student.value);
          toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
      } catch (error) {
          toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update profile' });
      }
  }
  </script>
  