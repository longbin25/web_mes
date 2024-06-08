import axiosClient from "./axiosClient"

const CMMSEquipmentAPi = {
    equipment: {
        getEquipments: async () => await axiosClient.get("/Equipments?PageIndex=1&PageSize=1000"),
        createEquipment: async (data) => await axiosClient.post("/Equipments", data),
        updateEquipment: async (data, id) => await axiosClient.put(`/Equipments/${id}`, data),
        deleteEquipment: async (id) => await axiosClient.delete(`/Equipments/${id}`),

        getEquipmentById: async (id) => await axiosClient.get(`/Equipments/${id}`), //Lấy thông tin 1 thiết bị
        getEquipmentByEquipmentClassId: async (id) => await axiosClient.get(`/Equipments?EquipmentClassId=${id}`), //Lấy thông tin 1 thiết bị
    },
    equipmentClass: {
        getEquipmentClasses: async () => await axiosClient.get("/EquipmentClasses?PageIndex=1&PageSize=1000"),
        createEquipmentClass: async (data) => await axiosClient.post("/EquipmentClasses", data),
        updateEquipmentClass: async (data, classId) => await axiosClient.put(`/EquipmentClasses/${classId}`, data),
        deleteEquipmentClass: async (classId) => await axiosClient.delete(`/EquipmentClasses/${classId}`),
    },
    equipmentMaterial: {
        getAllEquipmentMaterials: async () => await axiosClient.get("/EquipmentMaterials"),

        getEquipmentMaterialsByEquipmentId: async (equipmentId) =>
            await axiosClient.get(`/EquipmentMaterials/Equipments/${equipmentId}`),
        createEquipmentMaterialByEquipmentId: async (data, equipmentId) =>
            await axiosClient.post(`/EquipmentMaterials/Equipments/${equipmentId}`, data),

        getEquipmentMaterial: async (id) => await axiosClient.get(`/EquipmentMaterials/${id}`), //Lấy thông tin 1 thiết bị
        updateEquipmentMaterial: async (data, id) => await axiosClient.put(`/EquipmentMaterials/${id}`, data),
        deleteEquipmentMaterial: async (id) => await axiosClient.delete(`/EquipmentMaterials/${id}`),
    },
}
export default CMMSEquipmentAPi
