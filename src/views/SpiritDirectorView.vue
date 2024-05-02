<template>
    <div>
        <h1>Spirit Director</h1>
        <div v-if="isLoading">Loading...</div>
        <div id="spiritdirector-view" v-else-if="isLoggedIn">
            <TabView v-model:activeIndex="activeTab">
                <TabPanel header="View Students">
                    <div id="student-tab">
                        <h3>SuperFrog Students</h3>
                        <div class="group">
                            <Button label="Fetch Students" @click="fetchStudents" />
                        </div>
                        <DataTable scrollable :value="students" tableStyle="min-width: 50rem">
                            <Column field="id" header="ID" style="min-width: 24rem"></Column>
                            <Column field="firstName" header="First Name" style="min-width: 24rem"></Column>
                            <Column field="lastName" header="Last Name" style="min-width: 24rem"></Column>
                            <Column field="email" header="Email" style="min-width: 24rem"></Column>
                            <Column field="phoneNumber" header="Phone Number" style="min-width: 12rem"></Column>
                            <Column field="availability" header="Availability" style="min-width: 24rem"></Column>
                        </DataTable>
                    </div>
                </TabPanel>
                
                <TabPanel header="View Requests">
                    <div id="request-tab">
                        <h3>Requests</h3>
                        <div class="group">
                            <Button label="Fetch New Requests" @click="fetchRequests" />
                            <Button label="Add a Request" @click="router.push({ name: 'request' })" />
                        </div>
                        <div id="request-table">
                            <DataTable :value="requests" tableStyle="min-width: 50rem">
                                <Column field="id" header="ID"></Column>
                                <Column field="eventTitle" header="Title"></Column>
                                <Column field="status" header="Status" style="min-width: 18rem">
                                    <template #body="{data: rowData}">
                                        <Tag v-if="rowData.status === 'Approved'" severity="success" value="Approved">
                                        </Tag>
                                        <Tag v-else-if="rowData.status === 'Rejected'" severity="danger"
                                            value="Rejected"></Tag>
                                        <Tag v-else-if="rowData.status === 'Pending'" severity="info" value="Pending"></Tag>
                                        <Tag v-else-if="rowData.status.includes('Cancelled')" severity="warning"
                                            :value="rowData.status"></Tag>
                                    </template>
                                </Column>
                                <Column header="Actions">
                                    <template #body="{ data: rowData }">
                                        <div class="button-group">
                                            <Button label="Approve" :disabled="rowData.status=='Approved'" @click="approveRequest(rowData)" />
                                            <Button label="Reject" :disabled="rowData.status=='Rejected'" @click="rejectRequest(rowData)" />
                                            <Button label="Edit" @click="router.push({ name: 'manage-id', params: { id: rowData.id } });" />
                                            <Button label="Cancel" :disabled="rowData.status.includes('Cancelled')" @click="openCancelDialog(rowData)" />
                                            <Dialog :visible="isCancelDialogOpen(rowData)" @hide="closeCancelDialog(rowData)" header="Cancel Request" modal>
                                                <p>Are you sure you want to cancel this request?</p>
                                                <div class="button-group">
                                                    <Button label="Cancel" @click="cancelRequest(rowData, 'Cancelled by the Spirit Director')" />
                                                    <Button label="Cancel due to no payment" @click="cancelRequest(rowData, 'Cancelled due to no payment')" />
                                                </div>
                                            </Dialog>
                                        </div>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Calendar">
                    <p>Content for Calendar tab goes here</p>
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
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const router = useRouter();

const authStore = useAuthStore();

const toast = useToast();

const requests = ref<any[]>([]);
const students = ref<any[]>([]);

const isLoggedIn = ref(authStore.isLoggedIn);
const userName = ref(authStore.userName);
const userEmail = ref(authStore.userEmail);
const isLoading = ref(true);

const activeTab = ref(0);
const cancelDialogOpen = ref<{ [key: string]: boolean }>({});

function openCancelDialog(rowData: any) {
        cancelDialogOpen.value[rowData.id] = true;
    }

    function closeCancelDialog(rowData: any) {
        cancelDialogOpen.value[rowData.id] = false;
    }

    function isCancelDialogOpen(rowData: any) {
        return cancelDialogOpen.value[rowData.id] || false;
    }

onMounted(async () => {
    await authStore.getUser();
    // Update reactive variables after getting user data
    isLoggedIn.value = authStore.isLoggedIn;
    userName.value = authStore.userName;
    userEmail.value = authStore.userEmail;
    isLoading.value = false;
});

const fetchRequests = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/requests`);
        requests.value = response.data.data;
        toast.add({ severity: 'success', summary: 'Success', detail: 'Requests fetched successfully', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error fetching requests', life: 3000 });
    }
};

const fetchStudents = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/students`);
        students.value = response.data.data;
        console.log()
        toast.add({ severity: 'success', summary: 'Success', detail: 'Students fetched successfully', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: "Error fetching students", life: 3000 });
    }
};



watch(fetchRequests, () => {})

const approveRequest = async (request: any) => {
    const oldStatus = request.status;
    try {
        request.status = 'Approved';
        await axios.put(`${import.meta.env.VITE_API_URL}/requests/${request.id}`, request);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Request approved successfully', life: 3000 });
    } catch (error) {
        request.status = oldStatus;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error approving request', life: 3000 });
    }
};

const rejectRequest = async (request: any) => {
    const oldStatus = request.status;
    try {
        request.status = 'Rejected';
        await axios.put(`${import.meta.env.VITE_API_URL}/requests/${request.id}`, request);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Request rejected successfully', life: 3000 });
    } catch (error) {
        request.status = oldStatus;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error rejecting request', life: 3000 });
    }
};

const cancelRequest = async (request: any, message: string) => {
    const oldStatus = request.status;
    try {
        request.status = message;
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/requests/${request.id}`, request);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Request cancelled successfully', life: 3000 });
    } catch (error) {
        request.status = oldStatus;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error cancelling request', life: 3000 });
    } finally {
        closeCancelDialog(request);
    }
}

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
