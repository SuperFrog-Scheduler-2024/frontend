<template>
    <div id="datetime">
        <div id="request-datetime">
            <div>
                <FloatLabel>
                    <Calendar v-model="selectedDate" inputId="event_date" :minDate="minSelectableDate"
                        @input="updateSelectedDate" />
                    <label for="event_date">Event Date</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel>
                    <Calendar v-model="selectedStartTime" timeOnly inputId="event_start_time" :stepMinute="30"
                        hourFormat="24" @input="updateSelectedStartTime" />
                    <label for="event_start_time">Event Start Time</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel>
                    <Calendar v-model="selectedEndTime" timeOnly inputId="event_end_time" :stepMinute="30"
                        hourFormat="24" @input="updateSelectedEndTime" />
                    <label for="event_end_time">Event End Time</label>
                </FloatLabel>
            </div>
        </div>
        <Button label="Save" :disabled="isNextDisabled" @click="handleNextClick" />
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineEmits } from 'vue';
import Calendar from 'primevue/calendar';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';

const selectedDate = ref<Date | null>(null);
const selectedStartTime = ref<Date | null>(null);
const selectedEndTime = ref<Date | null>(null);

const minSelectableDate = new Date();
minSelectableDate.setDate(minSelectableDate.getDate() + 14);

const isNextDisabled = ref(true);
watchEffect(() => {
    isNextDisabled.value = !selectedDate.value || !selectedStartTime.value || !selectedEndTime.value;
});

const handleNextClick = () => {
    if (!selectedDate.value || !selectedStartTime.value || !selectedEndTime.value) {
        // Ensure all fields are selected
        return;
    }

    // Get the selected date
    const selectedDateValue = selectedDate.value;

    // Get the selected start time and end time
    const selectedStartTimeValue = selectedStartTime.value;
    const selectedEndTimeValue = selectedEndTime.value;

    // Adjust the start time and end time to match the selected date
    const adjustedStartTime = setTimeToDate(selectedDateValue, selectedStartTimeValue);
    const adjustedEndTime = setTimeToDate(selectedDateValue, selectedEndTimeValue);

    // Log the adjusted values
    console.log("Selected Date:", selectedDateValue);
    console.log("Selected Start Time:", adjustedStartTime);
    console.log("Selected End Time:", adjustedEndTime);
};

// Function to set the time of a date to match another date
const setTimeToDate = (dateToMatch: Date, timeToSet: Date) => {
    const newDate = new Date(dateToMatch);
    newDate.setHours(timeToSet.getHours());
    newDate.setMinutes(timeToSet.getMinutes());
    return newDate;
};

// Update selectedDate value
const updateSelectedDate = (event: Event) => {
    const target = event.target as HTMLInputElement;
    selectedDate.value = new Date(target.value);
};

// Update selectedStartTime value
const updateSelectedStartTime = (event: Event) => {
    const target = event.target as HTMLInputElement;
    selectedStartTime.value = new Date(target.value);
};

// Update selectedEndTime value
const updateSelectedEndTime = (event: Event) => {
    const target = event.target as HTMLInputElement;
    selectedEndTime.value = new Date(target.value);
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
