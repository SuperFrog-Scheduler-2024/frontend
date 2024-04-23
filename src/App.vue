<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Button from 'primevue/button';
import ScrollTop from 'primevue/scrolltop';
import Toast from 'primevue/toast';
</script>

<template>
    <header>
        <div id="app-name">
            <a href="https://www.tcu.edu">
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg"/>
            </a>
            <RouterLink to="/" class="app-title">
                SuperFrog Scheduler
            </RouterLink>
        </div>

        <div class="wrapper">
            <nav>
                <RouterLink to="/" activeClass="active">Home</RouterLink>
                <RouterLink to="/pricing" activeClass="active">Pricing</RouterLink>
                <RouterLink to="/range" activeClass="active">Range</RouterLink>
                <RouterLink to="/request" activeClass="active">Request</RouterLink>
                <RouterLink to="/manage" activeClass="active">Manage</RouterLink>
                <Button icon="pi pi-user" text raised rounded aria-label="User" />
            </nav>
        </div>
    </header>
    <RouterView />
    <ScrollTop />
    <Toast position="top-right" />
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

#app-name {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo {
    width: 100px;
    height: auto;
}

.wrapper {
    display: flex;
    align-items: center;
    margin-left: auto; /* Align the wrapper to the right */
}

nav {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 0.5rem;
}

nav a {
    text-decoration: none;
    text-align: center;
    color: var(--color-text);
}

nav a.active {
    color: var(--primary-color);
}

nav a:first-of-type {
    border: 0;
}

.app-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
}
</style>
