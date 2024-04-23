<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { computed } from 'vue';

const props = defineProps(['selectedStartTime', 'selectedTimeLength', 'selectedFeatureType', 'selectedFeatureStaff', 'selectedFeatureDescription', 'selectedFirstName', 'selectedLastName', 'selectedPhoneNumber', 'selectedEmail', 'selectedEventTitle', 'selectedOrganization', 'selectedOnCampus', 'selectedAddress', 'selectedSpecialInstructions', 'selectedExpensesBenefits', 'selectedOtherOrganizations', 'selectedPolicyAgreement']);

const emits = defineEmits(['submit']);

const handleSubmit = () => {
    emits('submit', {
        selectedStartTime: props.selectedStartTime,
        selectedTimeLength: props.selectedTimeLength,
        selectedFeatureType: props.selectedFeatureType,
        selectedFeatureStaff: props.selectedFeatureStaff,
        selectedFeatureDescription: props.selectedFeatureDescription,
        selectedFirstName: props.selectedFirstName,
        selectedLastName: props.selectedLastName,
        selectedPhoneNumber: props.selectedPhoneNumber,
        selectedEmail: props.selectedEmail,
        selectedEventTitle: props.selectedEventTitle,
        selectedOrganization: props.selectedOrganization,
        selectedOnCampus: props.selectedOnCampus,
        selectedAddress: props.selectedAddress,
        selectedSpecialInstructions: props.selectedSpecialInstructions,
        selectedExpensesBenefits: props.selectedExpensesBenefits,
        selectedOtherOrganizations: props.selectedOtherOrganizations,
        selectedPolicyAgreement: props.selectedPolicyAgreement
    });
};

const eventData = computed(() => [
    { label: 'Date and Time', value: `${props.selectedStartTime} for ${props.selectedTimeLength} minutes` },
    { label: 'Feature Type', value: props.selectedFeatureType.name },
    { label: 'Feature Staff', value: props.selectedFeatureStaff.map((staff: { name: string }) => staff.name).join(', ') },
    { label: 'Feature Description', value: props.selectedFeatureDescription },
    { label: 'First Name', value: props.selectedFirstName },
    { label: 'Last Name', value: props.selectedLastName },
    { label: 'Phone Number', value: props.selectedPhoneNumber },
    { label: 'Email', value: props.selectedEmail },
    { label: 'Event Title', value: props.selectedEventTitle },
    { label: 'Organization', value: props.selectedOrganization },
    { label: 'On Campus', value: props.selectedOnCampus },
    { label: 'Address', value: props.selectedAddress },
    { label: 'Special Instructions', value: props.selectedSpecialInstructions },
    { label: 'Expenses/Benefits', value: props.selectedExpensesBenefits },
    { label: 'Other Organizations', value: props.selectedOtherOrganizations },
    { label: 'Policy Agreement', value: props.selectedPolicyAgreement }
]);
</script>

<template>
    <div id="review-submit">
        <h1>Review and Submit</h1>
        <div id="review">
            <DataTable :value="eventData" show-gridlines tableStyle="min-width: 50rem">
                <Column field="label" header="Field"></Column>
                <Column field="value" header="Value"></Column>
            </DataTable>
        </div>
        <Button label="Submit" @click="handleSubmit" />
    </div>
</template>

<style scoped>
#review-submit {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

#review {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}
</style>