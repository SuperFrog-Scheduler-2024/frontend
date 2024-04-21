<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

interface Link {
    name: string;
    url: string;
    info: string;
}
// Array of link names and their corresponding URLs
const links: Link[] = [
    { name: 'Pricing', url: '/pricing', info: 'ALL appearances are paid. Prices are based on a 1 hour appearance; additional fees may apply if more than one hour. SuperFrog, Showgirls, and Cheerleaders are individually priced. Payment must be made after receiving an appearance request approval email, and a minimum of 24 hours prior to the event or it will be canceled.' },
    { name: 'Range', url: '/range', info: 'We only service requests that are within 100 mile radius from Amon G. Carter Stadium.' },
    { name: 'Request', url: '/request', info: 'Request TCU Spirit from a calendar of available dates. Requests must be submitted at least 14 days prior to event date to be considered. Submission of a request does not guarantee the event will be accepted. TCU Spirit has until 5 days prior the date of the event to accept or decline a request.' },
    { name: 'Manage', url: '/manage', info: 'Manage your Request' }
];
const hoveredLink = ref<Link | null>(null);

function handleLinkHover(link: Link) {
    hoveredLink.value = link;
}
</script>

<template>
    <main>
        <div class="video-container">
            <video autoplay muted loop>
                <source src="/superfrog.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div class="overlay">
                <div class="links">
                    <div v-for="link in links" :key="link.name" class="link-box" @mouseover="handleLinkHover(link)"
                        @mouseleave="hoveredLink = null">
                        <RouterLink :to="link.url">{{ link.name }}</RouterLink>
                    </div>
                </div>
                <div class="info-box">
                    <p v-if="hoveredLink">{{ hoveredLink.info }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-grow: 1;
}

.video-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 41rem;
    z-index: 0;
}

.video-container video {
    object-fit: cover;
}

.overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40%;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.links {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}

.link-box {
    width: 120px;
    height: 80px;
    border-radius: var(--border-radius);
    background-color: var(--purple-800);
    display: flex;
    justify-content: center;
    align-items: center;
}

.link-box a {
    color: var(--white);
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 900;
}

.link-box a:hover {
    background-color: transparent;
}

.info-box {
    width: 80%;
    height: 50%;
    padding: 1rem;
    background-color: var(--highlight-bg);
    opacity: 1;
    color: white;
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
}

.info-box p {
    text-align: center;
    font-size: 1rem;
    font-weight: 900;
}
</style>
