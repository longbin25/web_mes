import axiosClient from "./axiosClient"

const workOrderApi = {
    getWorkOrders: async () => axiosClient.get("/workOrders?pageSize=1000"),
    createWorkOrder: async (data) => axiosClient.post("/workOrders", data),
    schedulingWorkOrder: async (data, id) => axiosClient.patch(`/workOrders/${id}/schedule`, data),
    startWorkOrder: async (id) => axiosClient.patch(`/workOrders/${id}/start`, new Date().toISOString()),
    closeWorkOrder: async (id) => axiosClient.patch(`/workOrders/${id}/close`, new Date().toISOString()),
    deleteWorkOrder: async (id) => axiosClient.delete(`/workOrders/${id}`),
    autoScheduling: {
        createAutoScheduling: async (data) => await axiosClient.post("/ManufacturingOrders/workorders/schedule", data),
        autoScheduling: async (data) => await axiosClient.post("/Scheduling/schedulesinglesegmentworkorders", data),
    },
}

export default workOrderApi
