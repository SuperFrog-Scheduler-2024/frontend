<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from 'primevue/menu';
import Button from 'primevue/button';
</script>

<template>
    <header>
        <div id="app-name">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
            <h1>SuperFrog Scheduler</h1>
        </div>

        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <Button icon="pi pi-user" text raised rounded aria-label="User" />
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
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

nav {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 1rem;
}

nav a {
    margin-left: 1rem;
    text-decoration: none;
    text-align: center;
    color: var(--color-text);
    border-radius: 0.25rem;
    transition: background-color 0.3s;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
