import axiosClient from "./axiosClient"
// import { handleDeviceID } from '@/ultils'

const testApi2 = {
    getMemberName: async () => await axiosClient.get("/data"),
    createMemberName: async (data) => await axiosClient.post("/data", data),
    updateMemberName: async (data, id) => await axiosClient.put(`/data/${id}`, data),
    deleteMemberName: async (id) => await axiosClient.delete(`/data/${id}`),
}
export default testApi2
