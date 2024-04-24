import { ref, computed } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

const backendApiUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        user: {} as any,
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
        userName: (state) => state.user.name,
        userEmail: (state) => state.user.email,
    },
    actions: {
        async getToken() {
            // Simulate token retrieval
            const data = { data: { token: '123' } };
            this.token = data.data.token;
        },
        async getUser() {
            this.getToken(); // Assuming synchronous token retrieval
            // Simulate user retrieval
            const data = { data: { user: { name: 'John Doe', email: 'lemon@john.com' } } };
            this.user = data.data.user;
        }
    }
});
