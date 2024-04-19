<script setup lang="ts">
import Steps from 'primevue/steps';
import { ref } from 'vue';
// @ts-ignore
import DateTime from '@/components/DateTime.vue';

const activeStep = ref(0); // Active step index

// Define the steps
const items = [
    { label: 'Select date and time' },
    { label: 'Chosen Feature' },
    { label: 'Complete Form' },
    { label: 'Policy Agreement' },
    { label: 'Review and Submit' }
];
const goToNextStep = () => {
    activeStep.value++; // Increment the active step index
};
</script>

<template>
    <div id="request-view">
        <h1>Request a SuperFrog Appearance</h1>
        <div id="request-status-steps">
            <Steps v-model:activeStep="activeStep" :model="items" :readonly="false" />
        </div>
        <DateTime v-if="activeStep === 0" @next-step="goToNextStep" />
    </div>
</template>

<style scoped>
#request-view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>
