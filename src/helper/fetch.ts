// import { useAuthStore } from '../stores/auth';

// // Define a type for the HTTP method
// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// interface RequestOptions {
//     method: string;
//     headers: HeadersInit;
//     body?: string;
// }

// function fetch(method: HttpMethod) {
//     return (url: HttpMethod, body?: any): Promise<Response> => {
//         const requestOptions: RequestOptions = {
//             method: method,
//             headers: authHeader(url)
//         };

//         if (body) {
//             requestOptions.headers['Content-Type'] = 'application/json';
//             requestOptions.body = JSON.stringify(body);
//         }

//         return fetch(url).then(handleResponse);
//     }
// }

// function authHeader(url: string) {
//     // return auth header with basic auth credentials if user is logged in and request is to the api url
//     const { user } = useAuthStore();
//     const isLoggedIn: boolean = !!user?.authdata;
//     const isApiUrl: boolean = url.startsWith(import.meta.env.VITE_API_URL);
//     if (isLoggedIn && isApiUrl) {
//         return { Authorization: `Basic ${user.authdata}` };
//     } else {
//         return {};
//     }
// }

