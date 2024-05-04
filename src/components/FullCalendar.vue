<template>
    <div class='demo-app'>
      <div class='demo-app-main'>
        <FullCalendar class='demo-app-calendar' :options='calendarOptions' />
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
  
  const allowedTimes = ref({});
  
  const calendarOptions = ref({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
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
    expandRows: true, // Make sure rows expand to fill height
    height: 'auto',
    eventDidMount: function(info) {
      if (!isTimeAllowed(info.event.start)) {
        info.el.style.backgroundColor = 'gray'; // Styling for events outside allowed times
      }
    },
    eventContent: function(arg, createElement) {
      // You can also apply custom content to indicate the slot is blocked
      if (!isTimeAllowed(arg.date)) {
        return { domNodes: [createElement('div', { style: 'color: red;' }, '<Blocked>')]}
      }
    }
  });
  
  function isTimeAllowed(date) {
    const day = date.toLocaleString('en-us', { weekday: 'long' }).toUpperCase();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const timeString = `${hour}:${minute < 10 ? '0' : ''}${minute}`;
    return allowedTimes.value[day]?.includes(timeString);
  }
  
  onMounted(async () => {
    await fetchStudentCalendar();
  });
  
  async function fetchStudentCalendar() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/students/1');
      const studentCalendar = response.data.data.calendar;
      studentCalendar.forEach((entry) => {
        const day = entry.day;
        const time = entry.time;
        if (!allowedTimes.value[day]) {
          allowedTimes.value[day] = [];
        }
        allowedTimes.value[day].push(time);
      });
    } catch (error) {
      console.error('Failed to fetch calendar data:', error);
    }
  }
  </script>
  