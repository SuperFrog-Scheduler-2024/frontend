<script setup lang="ts">
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import Button from 'primevue/button';
import { ref } from 'vue';
import DateTime from '@/components/DateTime.vue';
// @ts-ignore
import ChosenFeature from '@/components/ChosenFeature.vue';
// @ts-ignore
import PolicyAgreement from '@/components/PolicyAgreement.vue';
import axios from 'axios';

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
axios.get("http://localhost:8080/api/v1/requests").then(response => console.log(response));
</script>

<template>
    <div id="request-view">
        <h1>Request a SuperFrog Appearance</h1>
    </div>
    <Stepper linear>
        <StepperPanel header="Select date and time">
            <template #content="{ nextCallback }">
                <div class="step">
                    <DateTime />
                </div>
                <div class="nextbutton">
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                </div>
            </template>
        </StepperPanel>
        <StepperPanel header="Chosen Feature">
            <template #content="{ prevCallback, nextCallback }">
                <div class="step">
                    <ChosenFeature />
                </div>
                <div class="bothbuttons">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                </div>
            </template>
        </StepperPanel>
        <StepperPanel header="Complete Form">
            <template #content="{ prevCallback, nextCallback }">
                <div class="step">
                </div>
                <div class="bothbuttons">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                </div>
            </template>
        </StepperPanel>
        <StepperPanel header="Policy Agreement">
            <template #content="{ prevCallback, nextCallback }">
                <div class="step">
                    <PolicyAgreement />
                </div>
                <div class="bothbuttons">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
                </div>
            </template>
        </StepperPanel>
        <StepperPanel header="Review and Submit">
            <template #content="{ prevCallback }">
                <div class="step">
                </div>
                <div class="backbutton">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                </div>
            </template>
        </StepperPanel>
    </Stepper>
</template>

<style scoped>
#request-view {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.step {
    widows: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.nextbutton {
    display: flex;
    justify-content: flex-end;
}

.bothbuttons {
    display: flex;
    justify-content: space-between;
}

.backbutton {
    display: flex;
    justify-content: flex-start;
}
</style>
