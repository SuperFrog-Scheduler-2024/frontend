<template>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="!loading" id="manage-id">
        <h1>Manage Request</h1>
        <div class="group">
            <FloatLabel>
                <InputText id="id" v-model="selectedId" :disabled="!isLoggedIn" @update:model-value="updateSelectedId"
                    style="width: 24rem;" />
                <label for="id">ID</label>
            </FloatLabel>
        </div>
        <div class="group">
            <FloatLabel>
                <InputText id="status" v-model="selectedStatus" :disabled="!isLoggedIn" @update:model-value="updateSelectedStatus" />
                <label for="status">Status</label>
            </FloatLabel>
            <ToggleButton v-model="selectedPaid" :disabled="!isLoggedIn" onLabel="Paid" offLabel="Not Paid"
                @update:model-value="updateSelectedPaid" />
        </div>
        <div class="group">
            <FloatLabel>
                <Calendar id="starttime" v-model="selectedStartTime" :disabled="isCancelled" @update:model-value="updateSelectedStartTime" />
                <label for="starttime">Start Time</label>
            </FloatLabel>
            <FloatLabel>
                <InputNumber v-model="selectedDuration" :disabled="isCancelled" inputId="minmax-buttons" mode="decimal" showButtons :step="30"
                    :min="0" :max="180" @update:model-value="updateSelectedDuration" />
                <label for="duration">Duration</label>
            </FloatLabel>
        </div>
        <div class="group">
            <FloatLabel>
                <InputText id="firstname" v-model="selectedFirstName" :disabled="isCancelled" @update:model-value="updateSelectedFirstName" />
                <label for="firstname">First Name</label>
            </FloatLabel>
            <FloatLabel>
                <InputText id="lastname" v-model="selectedLastName" :disabled="isCancelled" @update:model-value="updateSelectedLastName" />
                <label for="lastname">Last Name</label>
            </FloatLabel>
        </div>
        <div class="group">
            <FloatLabel>
                <InputMask id="phonenumber" mask="(999) 999-9999" v-model="selectedPhoneNumber" :disabled="isCancelled"
                    @update:model-value="updateSelectedPhoneNumber" />
                <label for="phonenumber">Phone Number</label>
            </FloatLabel>
            <FloatLabel>
                <InputText id="email" v-model="selectedEmail" :disabled="isCancelled" @update:model-value="updateSelectedEmail"
                    @focusout="checkErrors" />
                <label for="email">Email</label>
            </FloatLabel>
        </div>
        <h2>Event Information</h2>
        <div class="group">
            <FloatLabel>
                <InputText id="eventtitle" v-model="selectedEventTitle" :disabled="isCancelled"
                    @update:model-value="updateSelectedEventTitle" />
                <label for="eventtitle">Event Title</label>
            </FloatLabel>
            <FloatLabel>
                <InputText id="organization" v-model="selectedOrganization" :disabled="isCancelled"
                    @update:model-value="updateSelectedOrganization" />
                <label for="organization">Organization</label>
            </FloatLabel>
        </div>
        <div class="group">
            <FloatLabel>
                <Textarea id="eventdescription" v-model="selectedEventDescription" :disabled="isCancelled"
                    @update:model-value="updateSelectedEventDescription" />
                <label for="eventdescription">Event Description</label>
            </FloatLabel>
        </div>
        <div class="group">
            <FloatLabel>
                <Dropdown v-model="selectedEventType" :disabled="isCancelled" :options="eventOptions" optionLabel="name"
                    @update:model-value="updateSelectedEventType" placeholder="Select Feature Type" class="" />
                <label for="eventtype">Event Type</label>
            </FloatLabel>
        </div>
        <div class="group">
            <ToggleButton v-model="selectedOnCampus" :disabled="isCancelled" onLabel="On Campus" offLabel="Off Campus"
                @update:model-value="updateSelectedOnCampus" />
        </div>
        <div class="group">
            <FloatLabel>
                <InputText id="address" v-model="selectedAddress" :disabled="isCancelled" @update:model-value="updateSelectedAddress" />
                <label for="address">Address</label>
            </FloatLabel>
        </div>
        <div class="group">
            <FloatLabel>
                <Textarea id="specialinstructions" v-model="selectedSpecialInstructions" :disabled="isCancelled"
                    @update:model-value="updateSelectedSpecialInstructions" />
                <label for="specialinstructions">Special Instructions</label>
            </FloatLabel>
            <FloatLabel>
                <Textarea id="expensesbenefits" v-model="selectedExpensesBenefits" :disabled="isCancelled"
                    @update:model-value="updateSelectedExpensesBenefits" />
                <label for="expensesbenefits">Expenses/Benefits</label>
            </FloatLabel>
        </div>
        <div class="group">
            <FloatLabel>
                <Textarea id="otherorganizations" v-model="selectedOtherOrganizations" :disabled="isCancelled"
                    @update:model-value="updateSelectedOtherOrganizations" />
                <label for="otherorganizations">Other Organizations</label>
            </FloatLabel>
        </div>
        <div class="group">
            <Button label="Update" :disabled="isCancelled" @click="handleUpdate" />
            <Button label="Cancel" :disabled="isCancelled" @click="handleCancel" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import FloatLabel from 'primevue/floatlabel';
import ToggleButton from 'primevue/togglebutton';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";
import router from '@/router';
import { useAuthStore } from '../stores/auth';

const toast = useToast();
const confirm = useConfirm();

const route = useRoute();

const authStore = useAuthStore();

const requests = ref<any[]>([]);
const isLoggedIn = ref(authStore.isLoggedIn);
const userName = ref(authStore.userName);
const userEmail = ref(authStore.userEmail);
const isLoading = ref(true);

onMounted(async () => {
    // await authStore.getUser();
    isLoggedIn.value = authStore.isLoggedIn;
    userName.value = authStore.userName;
    userEmail.value = authStore.userEmail;
    isLoading.value = false;
});

watch(() => {
    return authStore.isLoggedIn;
}, () => {
    isLoggedIn.value = authStore.isLoggedIn;
    userName.value = authStore.userName;
    userEmail.value = authStore.userEmail;
});

const eventOptions = [
    { name: 'TCU' },
    { name: 'Public School/Non-Profit' },
    { name: 'Private/Residential' }
];

const request = ref<any>({});
const loading = ref(false)
const error = ref(null)

const selectedId = ref('');
const selectedStatus = ref('');
const selectedPaid = ref(false);
const selectedStartTime = ref(new Date());
const selectedDuration = ref(0);
const selectedFirstName = ref('');
const selectedLastName = ref('');
const selectedPhoneNumber = ref('');
const selectedEmail = ref('');
const selectedEventTitle = ref('');
const selectedEventType = ref({ name: '' });
const selectedEventDescription = ref('');
const selectedOrganization = ref('');
const selectedOnCampus = ref(false);
const selectedAddress = ref('');
const selectedSpecialInstructions = ref('');
const selectedExpensesBenefits = ref('');
const selectedOtherOrganizations = ref('');

const isCancelled = ref(false);

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id: any) {
    error.value = request.value = null
    loading.value = true

    // replace `getPost` with your data fetching util / API wrapper
    axios.get(`${import.meta.env.VITE_API_URL}/requests/${id}`).then((response) => {
        request.value = response.data.data;
        selectedId.value = request.value.id;
        selectedStatus.value = request.value.status;
        selectedPaid.value = request.value.paid;
        selectedStartTime.value = new Date(request.value.startTime);
        selectedDuration.value = request.value.duration as number;
        selectedFirstName.value = request.value.customerFirstName;
        selectedLastName.value = request.value.customerLastName;
        selectedPhoneNumber.value = request.value.phoneNumber;
        selectedEmail.value = request.value.email;
        selectedEventTitle.value = request.value.eventTitle;
        selectedEventType.value.name = request.value.eventType;
        selectedEventDescription.value = request.value.eventDescription;
        selectedOrganization.value = request.value.organizationName;
        selectedOnCampus.value = request.value.onCampus;
        selectedAddress.value = request.value.eventAddress;
        selectedSpecialInstructions.value = request.value.specialInstructions;
        selectedExpensesBenefits.value = request.value.expensesAndBenefitsToSpiritTeam;
        selectedOtherOrganizations.value = request.value.otherOutsideOrganizations;
        isCancelled.value = request.value.status === 'cancelled';
    }).catch((error: Error) => {
        toast.add({ severity: 'error', summary: error.name, detail: error.message, life: 3000 });
        router.push({ name: 'manage' });
    }).finally(() => {
        loading.value = false;
    });
}


const updateSelectedId = (value: string) => {
    selectedId.value = value;
};

const updateSelectedStatus = (value: string) => {
    selectedStatus.value = value;
};

const updateSelectedPaid = (value: boolean) => {
    selectedPaid.value = value;
};

const updateSelectedStartTime = (value: Date) => {
    selectedStartTime.value = value;
};

const updateSelectedDuration = (value: number) => {
    selectedDuration.value = value;
};

const updateSelectedFirstName = (value: string) => {
    selectedFirstName.value = value;
};

const updateSelectedLastName = (value: string) => {
    selectedLastName.value = value;
};

const updateSelectedPhoneNumber = (value: string) => {
    selectedPhoneNumber.value = value;
};

const updateSelectedEmail = (value: string) => {
    selectedEmail.value = value;
};

const updateSelectedEventTitle = (value: string) => {
    selectedEventTitle.value = value;
};

const updateSelectedOrganization = (value: string) => {
    selectedOrganization.value = value;
};

const updateSelectedEventDescription = (value: string) => {
    selectedEventDescription.value = value;
};

const updateSelectedEventType = (value: {name : string}) => {
    selectedEventType.value = value;
};

const updateSelectedOnCampus = (value: boolean) => {
    selectedOnCampus.value = value;
};

const updateSelectedAddress = (value: string) => {
    selectedAddress.value = value;
};

const updateSelectedSpecialInstructions = (value: string) => {
    selectedSpecialInstructions.value = value;
};

const updateSelectedExpensesBenefits = (value: string) => {
    selectedExpensesBenefits.value = value;
};

const updateSelectedOtherOrganizations = (value: string) => {
    selectedOtherOrganizations.value = value;
};

const checkErrors = () => {
    if (!selectedEmail.value.includes('@')) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid email address', life: 3000 });
    }
};

const handleUpdate = () => {
    const requestData = {
        customerFirstName: selectedFirstName.value,
        customerLastName: selectedLastName.value,
        phoneNumber: selectedPhoneNumber.value,
        email: selectedEmail.value,
        startTime: selectedStartTime.value.toISOString(),
        duration: selectedDuration.value,
        eventTitle: selectedEventTitle.value,
        organizationName: selectedOrganization.value,
        eventDescription: selectedEventDescription.value,
        eventType: selectedEventType.value.name,
        eventAddress: selectedAddress.value,
        onCampus: selectedOnCampus.value,
        specialInstructions: selectedSpecialInstructions.value,
        expensesAndBenefitsToSpiritTeam: selectedExpensesBenefits.value,
        otherOutsideOrganizations: selectedOtherOrganizations.value,
        status: selectedStatus.value,
        approved: request.value.approved,
        paid: selectedPaid.value,
        amount: request.value.amount
    };

    axios.put(`${import.meta.env.VITE_API_URL}/requests/${selectedId.value}`, requestData)
        .then((response) => {
            toast.add({ severity: 'success', summary: response.data.message, detail: 'Request updated', life: 3000 });
        })
        .catch((error: Error) => {
            toast.add({ severity: 'error', summary: error.name, detail: error.message, life: 3000 });
        });
};

const handleCancel = () => {
    if (!['Pending', 'Approved', 'Assigned'].includes(selectedStatus.value)) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'A request with this status cannot be cancelled', life: 3000 });
        return;
    }
    const requestData = {
        customerFirstName: selectedFirstName.value,
        customerLastName: selectedLastName.value,
        phoneNumber: selectedPhoneNumber.value,
        email: selectedEmail.value,
        startTime: selectedStartTime.value.toISOString(),
        duration: selectedDuration.value,
        eventTitle: selectedEventTitle.value,
        organizationName: selectedOrganization.value,
        eventDescription: selectedEventDescription.value,
        eventType: selectedEventType.value.name,
        eventAddress: selectedAddress.value,
        onCampus: selectedOnCampus.value,
        specialInstructions: selectedSpecialInstructions.value,
        expensesAndBenefitsToSpiritTeam: selectedExpensesBenefits.value,
        otherOutsideOrganizations: selectedOtherOrganizations.value,
        status: 'Cancelled by the customer',
        approved: request.value.approved,
        paid: selectedPaid.value,
        amount: request.value.amount
    };
    confirm.require({
        message: 'Are you sure you want to cancel this request?',
        accept: () => {
            axios.put(`${import.meta.env.VITE_API_URL}/requests/${selectedId.value}`, requestData)
                .then((response) => {
                    toast.add({ severity: 'success', summary: response.data.message, detail: 'Request cancelled', life: 3000 });
                })
                .catch((error: Error) => {
                    toast.add({ severity: 'error', summary: error.name, detail: error.message, life: 3000 });
                }).finally(() => {
                    router.push({ name: 'home' });
                });
        }
    });
};

</script>

<style scoped>
#manage-id {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    align-items: center;
}

.group {
    display: flex;
    gap: 1rem;
}
</style>