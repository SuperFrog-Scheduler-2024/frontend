<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
// import router from '@/router';
import { useRouter } from 'vue-router';

const router = useRouter();

const backendApiUrl = import.meta.env.VITE_API_URL;

const toast = useToast();

const requestId = ref('');

const updateRequestId = (value: string) => {
    
};

const search = () => {
    axios.get(`${backendApiUrl}/requests/${requestId.value}`)
        .then((response) => {
            router.push(`/manage/${requestId.value}`);
        })
        .catch((error) => {
            if (error.response.status === 404)
                toast.add({ severity: 'error', summary: 'Not Found', detail: 'The request was not found', life: 3000 });
            else
                toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while searching for the event', life: 3000 });
        });
};

</script>

<template>
    <div id="manage-view">
        <h1>Manage a request</h1>
        <div id="manage">
            <FloatLabel>
                <InputText id="requestid" v-model="requestId"
                    @update:model-value="updateRequestId" />
                <label for="requestid">RequestId</label>
            </FloatLabel>
            <Button label="Search" @click="search" />
        </div>
    </div>
</template>

<style scoped>
#manage-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    height: 100%;
}

#manage {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
}
</style>