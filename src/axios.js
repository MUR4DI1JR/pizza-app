import axios from "axios";

let base = axios.create({
    baseURL: "https://60f54d102208920017f39ff9.mockapi.io",
    headers: {
        'Content-Type': 'application/json',
    }
})

export default base;

// export default {
//     getAllUsers: () => base.get("/users"),
// };