<script setup lang="ts">
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import Button from 'primevue/button';
import { ref, reactive, onMounted } from 'vue';
import DateTime from '@/components/DateTime.vue';
import ChosenFeature from '@/components/ChosenFeature.vue';
// @ts-ignore
import CompleteForm from '@/components/CompleteForm.vue';
import PolicyAgreement from '@/components/PolicyAgreement.vue';
import axios from 'axios';

// Define a ref for "nextButtonStatus"
const nextButtonStatus1 = ref(true);
const nextButtonStatus2 = ref(true);
const nextButtonStatus3 = ref(true);
const nextButtonStatus4 = ref(true);

// Refs for emitted values
// p1
const selectedStartTime = ref<Date | null>(null);
const selectedTimeLength = ref<number | null>(null);
// p2
const selectedFeatureType = ref<string>('');
const selectedFeatureStaff = ref<string[]>([]);
const selectedFeatureDescription = ref<string>('');
// p3
const selectedFirstName = ref<string>('');
const selectedLastName = ref<string>('');
const selectedPhoneNumber = ref<string>('');
const selectedEmail = ref<string>('');
const selectedEventTitle = ref<string>('');
const selectedOrganization = ref<string>('');
const selectedOnCampus = ref<boolean>(false);
const selectedAddress = ref<string>('');
const selectedSpecialInstructions = ref<string>('');
const selectedExpensesBenefits = ref<string>('');
const selectedOtherOrganizations = ref<string>('');
// p4
const selectedPolicyAgreement = ref<boolean>(false);

// onMounted(() => {
//     const backendApiUrl = import.meta.env.VITE_API_URL;
//     axios.get(`${backendApiUrl}/requests`)
//         .then(response => console.log(response.data))
//         .catch(error => console.error(error));
// });
</script>

<template>
    <div id="request-view">
        <h1>Request a SuperFrog Appearance</h1>
    </div>
    <Stepper linear>
        <StepperPanel header="Select date and time">
            <template #content="{ nextCallback }">
                <div class="step">
                    <DateTime @next-step-disabled="nextButtonStatus1 = true" @next-step-enabled="nextButtonStatus1 = false"
                        @update-start-time="selectedStartTime = $event" @update-time-length="selectedTimeLength = $event" />
                </div>
                <div class="nextbutton">
                    <Button label="Next" :disabled="nextButtonStatus1" icon="pi pi-arrow-right" iconPos="right"
                        @click="nextCallback" />
                </div>
            </template>
        </StepperPanel>
        <StepperPanel header="Chosen Feature">
            <template #content="{ prevCallback, nextCallback }">
                <div class="step">
                    <ChosenFeature @next-step-disabled="nextButtonStatus2 = true"
                        @next-step-enabled="nextButtonStatus2 = false" @update-feature-type="selectedFeatureType = $event"
                        @update-feature-staff="selectedFeatureStaff = $event"
                        @update-feature-description="selectedFeatureDescription = $event" />
                </div>
                <div class="bothbuttons">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                    <Button label="Next" :disabled="nextButtonStatus2" icon="pi pi-arrow-right" iconPos="right"
                        @click="nextCallback" />
                </div>
            </template>
        </StepperPanel>
        <StepperPanel header="Complete Form">
            <template #content="{ prevCallback, nextCallback }">
                <div class="step">
                    <CompleteForm @next-step-disabled="nextButtonStatus3 = true"
                        @next-step-enabled="nextButtonStatus3 = false" @update-first-name="selectedFirstName = $event" @update-last-name="selectedLastName = $event" @update-phone-number="selectedPhoneNumber = $event" @update-email="selectedEmail = $event" @update-event-title="selectedEventTitle = $event" @update-organization="selectedOrganization = $event" @update-on-campus="selectedOnCampus = $event" @update-address="selectedAddress = $event" @update-special-instructions="selectedSpecialInstructions = $event" @update-expenses-benefits="selectedExpensesBenefits = $event" @update-other-organizations="selectedOtherOrganizations = $event" />
                </div>
                <div class="bothbuttons">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                    <Button label="Next" :disabled="nextButtonStatus3" icon="pi pi-arrow-right" iconPos="right"
                        @click="nextCallback" />
                </div>
            </template>
        </StepperPanel>
        <StepperPanel header="Policy Agreement">
            <template #content="{ prevCallback, nextCallback }">
                <div class="step">
                    <PolicyAgreement @next-step-disabled="nextButtonStatus4=true" @next-step-enabled="nextButtonStatus4=false" @update-policy-agreement="selectedPolicyAgreement=$event" />
                </div>
                <div class="bothbuttons">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
                    <Button label="Next" :disabled="nextButtonStatus4" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
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
    gap: 2rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
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
