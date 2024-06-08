import axiosClient from "./axiosClient"

const CMMSMaintenanceRequestApi = {
    maintenanceRequest: {
        getMaintenanceRequests: async () => await axiosClient.get("/MaintenanceRequests"),
        createMaintenanceRequest: async (data) => await axiosClient.post("/MaintenanceRequests", data),
        updateMaintenanceRequest: async (data, id) => await axiosClient.put(`/MaintenanceRequests/${id}`, data),
        deleteMaintenanceRequest: async (id) => await axiosClient.delete(`/MaintenanceRequests/${id}`),

        getMaintenanceRequestById: async (id) => await axiosClient.get(`/MaintenanceRequests/${id}`),
        getMaintenanceRequestsByTypeAndEquipmentClass: async (type, equipmentClassId) =>
            await axiosClient.get(`/MaintenanceRequests?EquipmentClassId=${equipmentClassId}&Type=${type}`),
        getMaintenanceRequestsByType: async (type) => await axiosClient.get(`/MaintenanceRequests?Type=${type}`),
    },
    // api tạo lịch bảo trì theo năm
    standard: {
        createMaintenanceRequest: async (data, equipmentClassId) =>
            await axiosClient.post(`/MaintenanceRequests/standard/${equipmentClassId}`, data),
        updateMaintenanceRequest: async (data, equipmentClassId) =>
            await axiosClient.put(`/MaintenanceRequests/standard/${equipmentClassId}`, data),
    },
    maintenanceResponses: {
        getMaintenanceResponses: async () => await axiosClient.get("/MaintenanceResponses"),
        createMaintenanceResponse: async (data) => await axiosClient.post("/MaintenanceResponses", data),
        updateMaintenanceResponse: async (data, id) => await axiosClient.put(`/MaintenanceResponses/${id}`, data),
        deleteMaintenanceResponse: async (id) => await axiosClient.delete(`/MaintenanceResponses/${id}`),

        deleteMaintenanceResponseByYear: async (id,year) =>
            await axiosClient.delete(`MaintenanceResponses/standard/${id}?year=${year}`),

        getMaintenanceResponseByTime: async (startDate, endDate) =>
            await axiosClient.get(`/MaintenanceResponses?StartDate=${startDate}&EndDate=${endDate}`), //Lọc bảo trì theo thời gian
        getMaintenanceResponseByType: async (type) => await axiosClient.get(`/MaintenanceResponses?Type=${type}`), //Lấy bảo trì lọc theo type
        getMaintenanceResponseByStatus: async (status) =>
            await axiosClient.get(`/MaintenanceResponses?Status=${status}`), //Lọc bảo trì theo status
        getMaintenanceResponseById: async (id) => await axiosClient.get(`/MaintenanceResponses/${id}`), //Lấy 1 yêu cầu bảo trì theo Id
    },
}
export default CMMSMaintenanceRequestApi
