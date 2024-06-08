import axiosClient from "./axiosClient"

const authorizationApi = {
    user: {
        getUser: async () => axiosClient.get("/Users"), // get all user
        getUserById: async (id) => axiosClient.get(`/Users/${id}`),
        getUserInfo: async () => axiosClient.get("/Users/myInfor"), // get current user info

        createUser: async (data) => await axiosClient.post("/Users", data),
        updateUserRole: async (data, id) => await axiosClient.patch(`/Users/${id}`, data),
        deleteUser: async (id) => await axiosClient.delete(`/Users/${id}`),
    },
    role: {
        getRole: async () => axiosClient.get("/Roles"), // get all Role
        createRole: async (data) => await axiosClient.post("/Roles", data),
        updateRole: async (data, id) => await axiosClient.put(`/Roles/${id}`, data),
        deleteRole: async (id) => await axiosClient.delete(`/Roles/${id}`),
    },

    logOut: {
        logout: async () => axiosClient.get("/Account/Logout"),
    },
}
export default authorizationApi
