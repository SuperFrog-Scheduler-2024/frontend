<template>
    <div class='demo-app'>
      <div class='demo-app-sidebar'>
        <div class='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div class='demo-app-sidebar-section'>
          <h2>All Events ({{ currentEvents.length }})</h2>
          <ul>
            <li v-for='event in currentEvents' :key='event.id'>
              <b>{{ event.startStr }}</b>
              <i>{{ event.title }}</i>
            </li>
          </ul>
        </div>
      </div>
      <div class='demo-app-main'>
        <FullCalendar
          class='demo-app-calendar'
          :options='calendarOptions'
        />
      </div>
    </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import { ref, onMounted, nextTick } from 'vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

let eventGuid = 0;

const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialView: 'timeGridWeek',
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  events: [
  
  ],
  eventClick: function(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  },
  dateClick: function(info) {
    let title = prompt('Please enter a new title for your event:');
    if (title) {
      info.calendar.addEvent({
        id: createEventId(),
        title,
        start: info.date,
        allDay: info.allDay
      });
    }
  }
});

const currentEvents = ref([]);

// Use onMounted to ensure FullCalendar is initialized after the component is fully mounted
onMounted(() => {
  nextTick(() => {
    // Ensures that the DOM is fully updated before accessing or manipulating it
    // Any further initialization that requires the updated DOM should go here
  });
});

function handleEvents(events) {
  currentEvents.value = events;
}

// Helper function to generate event IDs
function createEventId() {
  return String(eventGuid++);
}
</script>

<style lang="css">
/* Your CSS styles here */
</style>
