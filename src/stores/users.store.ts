
// // https://vitejs.dev/config/
// export default defineConfig(({ command, mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')

//   return ({
//     plugins: [
//         httpAuth([{
//           username: env.VITE_AUTH_USERNAME_1,
//           password: env.VITE_AUTH_PASSWORD_1
//         },{
//           username: env.VITE_AUTH_USERNAME_2,
//           password: env.VITE_AUTH_PASSWORD_2
//         }], {
//             realm: env.VITE_AUTH_REALM,
//             useInServer: true,   // True by default
//             useInPreview: true,  // True by default
//         })
//     ]
//   })
// })