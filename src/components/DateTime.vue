<template>
    <div id="datetime">
        <div id="request-datetime">
            <div>
                <FloatLabel>
                    <Calendar v-model="selectedDate" inputId="event_date" :minDate="new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000))"
                        @update:modelValue="updateSelectedDate" />
                    <label for="event_date">Event Date</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel>
                    <Calendar v-model="selectedStartTime" timeOnly inputId="event_start_time" :stepMinute="30"
                        hourFormat="12" @update:modelValue="updateSelectedStartTime" :manualInput="false" />
                    <label for="event_start_time">Event Start Time</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel>
                    <Calendar v-model="selectedEndTime" timeOnly inputId="event_end_time" :stepMinute="30"
                        hourFormat="12" @update:modelValue="updateSelectedEndTime" :manualInput="false" />
                    <label for="event_end_time">Event End Time</label>
                </FloatLabel>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import Calendar from 'primevue/calendar';
import FloatLabel from 'primevue/floatlabel';

const emits = defineEmits(['next-step-disabled', 'next-step-enabled', 'update-start-time', 'update-time-length']);

emits('next-step-disabled');

const selectedDate = ref<Date | null>(null);
const selectedStartTime = ref<Date | null>(null);
const selectedEndTime = ref<Date | null>(null);

// Function to set the time of a date to match another date
const setTimeToDate = (dateToMatch: Date, timeToSet: Date) => {
    const newDate = new Date(dateToMatch);
    newDate.setUTCHours(timeToSet.getUTCHours());
    newDate.setUTCMinutes(timeToSet.getUTCMinutes());
    return newDate;
};

// Update selectedDate value
const updateSelectedDate = (value: Date | Date[] | (Date | null)[] | null | undefined) => {
    if (selectedDate) selectedDate.value = value as Date;
    checkAndEmits();
};

// Update selectedStartTime value
const updateSelectedStartTime = (value: Date | Date[] | (Date | null)[] | null | undefined) => {
    checkAndEmits();
};

// Update selectedEndTime value
const updateSelectedEndTime = (value: Date | Date[] | (Date | null)[] | null | undefined) => {
    checkAndEmits();
};

const checkAndEmits = () => {
    if (selectedDate.value && selectedStartTime.value && selectedEndTime.value) {
        setTimeToDate(selectedDate.value, selectedStartTime.value);
        setTimeToDate(selectedDate.value, selectedEndTime.value);
        selectedStartTime.value.setMinutes(Math.round(selectedStartTime.value.getMinutes() / 30) * 30);
        selectedEndTime.value.setMinutes(Math.round(selectedEndTime.value.getMinutes() / 30) * 30);
        selectedStartTime.value.setSeconds(0);
        selectedEndTime.value.setSeconds(0);
        emits('next-step-enabled');
        let timeLength = Math.round((selectedEndTime.value.getTime() - selectedStartTime.value.getTime()) / 60000 * 100) / 100;
        emits('update-start-time', selectedStartTime.value);
        emits('update-time-length', timeLength);
    }
};
</script>

<style scoped>
#request-datetime {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
}

#datetime {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}
</style>
