<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar :options='calendarOptions' />
    </div>
  </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrRulePlugin from '@fullcalendar/rrule';

const calendarEvents = ref([]);

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, rrRulePlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  allDaySlot: false,
  slotDuration: '01:00:00',
  expandRows: true,
  height: 'auto',
  events: calendarEvents
});

// Helper function to convert day names to rrule week day constants
function dayNameToRRuleDay(dayName) {
  const dayMap = {
    'MONDAY': 'MO',
    'TUESDAY': 'TU',
    'WEDNESDAY': 'WE',
    'THURSDAY': 'TH',
    'FRIDAY': 'FR',
    'SATURDAY': 'SA',
    'SUNDAY': 'SU'
  };
  return dayMap[dayName];
}

onMounted(async () => {
  await fetchStudentCalendarData();
});

async function fetchStudentCalendarData() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`);
    if (response.data.flag && response.data.code === 200) {
      const events = response.data.data.flatMap(student => student.calendar.map(entry => ({
        title: `${student.firstName} ${student.lastName}`,
        rrule: {
          freq: 'weekly',
          interval: 1,
          byweekday: [dayNameToRRuleDay(entry.day)],
          dtstart: `2024-05-01T${entry.time}:00`,
          until: '2024-12-31'
        }
      })));
      calendarEvents.value = events;
      console.log("Set events to calendar:", events);
    }
  } catch (error) {
    console.error('Failed to fetch calendar data:', error);
  }
}
</script>
