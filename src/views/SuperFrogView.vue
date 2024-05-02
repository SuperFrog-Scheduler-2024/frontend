<template>
    <div>
        <h1>SuperFrog</h1>
        <div v-if="isLoading">Loading...</div>
        <div id="spiritdirector-view" v-else-if="isLoggedIn">
            <TabView v-model:activeIndex="activeTab">
                <TabPanel header="View Requests">
                    <div id="request-tab">
                        <h3>Requests</h3>
                        <div class="group">
                            <Button label="Fetch New Requests" @click="fetchRequests" />
                        </div>
                        <div id="request-table">
                            <DataTable scrollable :value="requests" tableStyle="min-width: 50rem">
                                <Column field="id" header="ID" style="min-width: 24rem"></Column>
                                <Column field="eventTitle" header="Title" style="min-width: 12rem"></Column>
                                <Column field="status" header="Status" style="min-width: 18rem">
                                    <template #body="{data: rowData}">
                                        <Tag v-if="rowData.status === 'Approved'" severity="primary" value="Approved">
                                        </Tag>
                                        <Tag v-else-if="rowData.status === 'Rejected'" severity="danger"
                                            value="Rejected"></Tag>
                                        <Tag v-else-if="rowData.status === 'Pending'" severity="info" value="Pending"></Tag>
                                        <Tag v-else-if="rowData.status.includes('Cancelled')" severity="warning"
                                            :value="rowData.status"></Tag>
                                    </template>
                                </Column>
                                <Column field="startTime" header="Start Time" style="min-width: 24rem"></Column>
                                <Column field="duration" header="Duration" style="min-width: 6rem"></Column>
                                <Column field="eventAddress" header="Location" style="min-width: 24rem"></Column>
                                <Column field="eventDescription" header="Description" style="min-width: 24rem"></Column>
                                <Column field="customerFirstName" header="First Name" style="min-width: 12rem"></Column>
                                <Column field="customerLastName" header="Last Name" style="min-width: 12rem"></Column>
                                <Column field="email" header="Email" style="min-width: 24rem"></Column>
                                <Column field="phoneNumber" header="Phone Number" style="min-width: 12rem"></Column>
                                <Column field="specialInstructions" header="Special Instructions" style="min-width: 12rem"></Column>
                                <Column field="expensesAndBenefitsToSpiritTeam" header="Expenses and Benefits to Spirit Team" style="min-width: 24rem"></Column>
                            </DataTable>
                        </div>
                    </div>
                </TabPanel>
                    <TabPanel header="Calendar">
                         <FullCalendar />
                </TabPanel>
                <TabPanel header="Reports">
                    <p>Content for Reports tab goes here</p>
                </TabPanel>
            </TabView>
        </div>
        <div v-else>
            <p>Please wait...</p>
        </div>
    </div>
</template>

<script setup lang="ts">

// import FullCalendar from '@fullcalendar/vue3'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import timeGridPlugin from '@fullcalendar/timegrid'


import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import FullCalendar from '@/components/FullCalendar.vue';

const router = useRouter();

const authStore = useAuthStore();

const toast = useToast();

const requests = ref<any[]>([]);
const isLoggedIn = ref(authStore.isLoggedIn);
const userName = ref(authStore.userName);
const userEmail = ref(authStore.userEmail);
const isLoading = ref(true);

const activeTab = ref(0);
const cancelDialogOpen = ref(false);
// const calendarOptions = ref({
//   plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
//   initialView: 'dayGridMonth',
//   headerToolbar: {
//     left: 'prev,next today',
//     center: 'title',
//     right: 'dayGridMonth,dayGridWeek,dayGridDay'
//   },
//   events: [
//     { title: 'Event 1', date: '2024-05-10' },
//     { title: 'Event 2', date: '2024-05-15' }
//   ],
//   editable: true,
//   selectable: true
// });

onMounted(async () => {
    await authStore.getUser();
    isLoggedIn.value = authStore.isLoggedIn;
    userName.value = authStore.userName;
    userEmail.value = authStore.userEmail;
    isLoading.value = false;
});

const fetchRequests = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/requests`);
        requests.value = response.data.data;
        requests.value.filter((request: any) => request.status === 'Approved');
        toast.add({ severity: 'success', summary: 'Success', detail: 'Requests fetched successfully', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error fetching requests', life: 3000 });
    }
};

watch(fetchRequests, () => { })
</script>
<style scoped>
.p-tabview {
    width: 100%;
}

.p-tabview-header {
    margin-right: 1rem;
}

#spiritdirector-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
}

.group {
    display: flex;
    width: 100%;
    padding: 1rem;
    justify-content: center;
    gap: 2rem;
}

.button-group {
    display: flex;
    gap: 1rem;
}


</style>
