import { ref, computed } from 'vue';

import { defineStore } from 'pinia';

const backendApiUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        user: JSON.parse(localStorage.getItem('currentUser') || '{}'),
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
        userName: (state) => state.user.name,
        userEmail: (state) => state.user.email,
    },
    actions: {
        async getToken() {
            
        },
        async getUser() {

        },
        login(username: string, password: string){
            
            const user = btoa(username);
            const pass = btoa(password);
            // console.log(user);
            if ('c3Bpcml0' === user && 'cGFzc3dvcmQ=' === pass){ //user: spirit // password: password
                this.user = "spiritdirector";
                this.token = '1';
                
            }
            if ("c3VwZXJmcm9n" === user && "cGFzc3dvcmQ=" === pass){ //user:superfrog // password: password
                this.user = "superfrog";
                this.token = '2';
                
            }
        },
        logout() {
            this.user = '{}';
            this.token = '';
            localStorage.removeItem('user');
        }
    }
});
