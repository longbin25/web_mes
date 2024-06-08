import axiosClient from "./axiosClient"

const CMMSMaterialAPi = {
    material: {
        getMaterials: async (materialInforId) => await axiosClient.get(`/MaterialInfors/${materialInforId}/Materials`),
        createMaterial: async (data, materialInforId) =>
            await axiosClient.post(`/MaterialInfors/${materialInforId}/Materials`, data),
        updateMaterial: async (data, materialInforId, materialId) =>
            await axiosClient.put(`/MaterialInfors/${materialInforId}/Materials/${materialId}`, data),
        deleteMaterial: async (materialInforId, materialId) =>
            await axiosClient.delete(`/MaterialInfors/${materialInforId}/Materials/${materialId}`),

        getMaterialsById: async (materialInforId, materialId) =>
            await axiosClient.get(`/MaterialInfors/${materialInforId}/Materials/${materialId}`), //Lấy 1 vật tư theo Id
        getMaterialsBySku: async (materialInforId, sku) =>
            await axiosClient.get(`/MaterialInfors/${materialInforId}/Materials/Sku/${sku}`), //Lấy 1 vật tư theo Sku
    },
    materialInfor: {
        getMaterialInfors: async () =>
            await axiosClient.get("/MaterialInfors?IdStartedWith=&PageIndex=1&PageSize=1000"),
        createMaterialInfor: async (data) => await axiosClient.post("/MaterialInfors", data),
        updateMaterialInfor: async (data, id) => await axiosClient.put(`/MaterialInfors/${id}`, data),
        deleteMaterialInfor: async (id) => await axiosClient.delete(`/MaterialInfors/${id}`),

        getMaterialInforsById: async (id) => await axiosClient.get(`/MaterialInfors/${id}`), //Lấy 1 thông tin vật tư theo Id
    },
    materialHistoryCard: {
        getMaterialHistoryCards: async (materialInforId) =>
            await axiosClient.get(`/MaterialInfors/${materialInforId}/MaterialHistoryCards`), //Lấy toàn bộ thẻ vật tư trong 1 materialInfor
        createMaterialHistoryCard: async (data, materialInforId) =>
            await axiosClient.post(`/MaterialInfors/${materialInforId}/MaterialHistoryCards`, data),
        updateMaterialHistoryCard: async (data, materialInforId, materialHistoryCardId) =>
            await axiosClient.put(
                `/MaterialInfors/${materialInforId}/MaterialHistoryCards/${materialHistoryCardId}`,
                data,
            ),
        deleteMaterialHistoryCard: async (materialInforId, materialHistoryCardId) =>
            await axiosClient.delete(
                `/MaterialInfors/${materialInforId}/MaterialHistoryCards/${materialHistoryCardId}`,
            ),

        getMaterialHistoryCardById: async (materialHistoryCardId) =>
            await axiosClient.get(`/MaterialInfors/MaterialHistoryCards/${materialHistoryCardId}`), //Lấy 1 thẻ vật tư trong 1 materialInfor
    },
    materialRequest: {
        getMaterialRequests: async (materialInforId) =>
            await axiosClient.get(`/MaterialInfors/${materialInforId}/MaterialRequests`), //Lấy toàn bộ yêu cầu vật tư
        createMaterialRequest: async (data, materialInforId) =>
            await axiosClient.post(`/MaterialInfors/${materialInforId}/MaterialRequests`, data),
        updateMaterialRequest: async (data, materialInforId, materialRequestId) =>
            await axiosClient.put(`/MaterialInfors/${materialInforId}/MaterialRequests/${materialRequestId}`, data),
        deleteMaterialRequest: async (materialInforId, materialRequestId) =>
            await axiosClient.delete(`/MaterialInfors/${materialInforId}/MaterialRequests/${materialRequestId}`),

        getMaterialRequestById: async (materialInforId, materialRequestId) =>
            await axiosClient.get(`/MaterialInfors/${materialInforId}/MaterialRequests/${materialRequestId}`), //Lấy 1 yêu cầu vật tư theo Id
    },
}
export default CMMSMaterialAPi
