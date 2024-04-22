<template>
    <div id="completeform">
        <div id="request-completeform">
            <h2>Personal Information</h2>
            <div class="group">
                <FloatLabel>
                    <InputText id="firstname" v-model="selectedFirstName" @update:model-value="updateSelectedFirstName" />
                    <label for="firstname">First Name</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id="lastname" v-model="selectedLastName" @update:model-value="updateSelectedLastName" />
                    <label for="lastname">last Name</label>
                </FloatLabel>
            </div>
            <div class="group">
                <FloatLabel>
                    <InputMask id="phonenumber" mask="(999) 999-9999" v-model="selectedPhoneNumber" @update:model-value="updateSelectedPhoneNumber" />
                    <label for="phonenumber">Phone Number</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id="email" v-model="selectedEmail" @update:model-value="updateSelectedEmail" />
                    <label for="email">Email</label>
                </FloatLabel>
            </div>
            <h2>Event Information</h2>
            <div class="group">
                <FloatLabel>
                    <InputText id="eventtitle" v-model="selectedEventTitle" @update:model-value="updateSelectedEventTitle" />
                    <label for="eventtitle">Event Title</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id="organization" v-model="selectedOrganization" @update:model-value="updateSelectedOrganization" />
                    <label for="organization">Organization</label>
                </FloatLabel>
            </div>
            <div class="group">
                <ToggleButton v-model="selectedOnCampus" onLabel="On Campus" offLabel="Off Campus" @update:model-value="updateSelectedOnCampus" />
            </div>
            <div class="group">
                <FloatLabel>
                    <InputText id="address" v-model="selectedAddress" @update:model-value="updateSelectedAddress" />
                    <label for="address">Address</label>
                </FloatLabel>
            </div>
            <div class="group">
                <FloatLabel>
                    <Textarea id="specialinstructions" v-model="selectedSpecialInstructions" @update:model-value="updateSelectedSpecialInstructions" />
                    <label for="specialinstructions">Special Instructions</label>
                </FloatLabel>
                <FloatLabel>
                    <Textarea id="expensesbenefits" v-model="selectedExpensesBenefits" @update:model-value="updateSelectedExpensesBenefits" />
                    <label for="expensesbenefits">Expenses/Benefits</label>
                </FloatLabel>
            </div>
            <div class="group">
                <FloatLabel>
                    <InputText id="otherorganizations" v-model="selectedOtherOrganizations" @update:model-value="updateSelectedOtherOrganizations" />
                    <label for="otherorganizations">Other Organizations</label>
                </FloatLabel>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import ToggleButton from 'primevue/togglebutton';
import Textarea from 'primevue/textarea';

const emits = defineEmits(['next-step-disabled', 'next-step-enabled', 'update-first-name', 'update-last-name', 'update-phone-number', 'update-email', 'update-event-title', 'update-organization', 'update-on-campus', 'update-address', 'update-special-instructions', 'update-expenses-benefits', 'update-other-organizations']);

emits('next-step-disabled');

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

const updateSelectedFirstName = (value: string) => {
    // selectedFirstName.value = value;
};

const updateSelectedLastName = (value: string) => {
    // selectedLastName.value = value;
};

const updateSelectedPhoneNumber = (value: string) => {
    // selectedPhoneNumber.value = value;
};

const updateSelectedEmail = (value: string) => {
    // selectedEmail.value = value;
};

const updateSelectedEventTitle = (value: string) => {
    // selectedEventTitle.value = value;
};

const updateSelectedOrganization = (value: string) => {
    // selectedOrganization.value = value;
};

const updateSelectedOnCampus = (value: boolean) => {
    // selectedOnCampus.value = value;
};

const updateSelectedAddress = (value: string) => {
    // selectedAddress.value = value;
};

const updateSelectedSpecialInstructions = (value: string) => {
    // selectedSpecialInstructions.value = value;
};

const updateSelectedExpensesBenefits = (value: string) => {
    // selectedExpensesBenefits.value = value;
};

const updateSelectedOtherOrganizations = (value: string) => {
    // selectedOtherOrganizations.value = value;
    if (selectedFirstName.value && selectedLastName.value && selectedPhoneNumber.value && selectedEmail.value && selectedEventTitle.value && selectedOrganization.value && selectedAddress.value && selectedSpecialInstructions.value && selectedExpensesBenefits.value && selectedOtherOrganizations.value) {
        emits('next-step-enabled');
        emits('update-first-name', selectedFirstName.value);
        emits('update-last-name', selectedLastName.value);
        emits('update-phone-number', selectedPhoneNumber.value);
        emits('update-email', selectedEmail.value);
        emits('update-event-title', selectedEventTitle.value);
        emits('update-organization', selectedOrganization.value);
        emits('update-on-campus', selectedOnCampus.value);
        emits('update-address', selectedAddress.value);
        emits('update-special-instructions', selectedSpecialInstructions.value);
        emits('update-expenses-benefits', selectedExpensesBenefits.value);
        emits('update-other-organizations', selectedOtherOrganizations.value);
    }
};
</script>

<style scoped>
#completeform {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

#request-completeform {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
}

.group {
    display: flex;
    flex-direction: row;
    gap: 2rem;
}
</style>