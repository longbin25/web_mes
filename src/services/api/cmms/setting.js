import axiosClient from "./axiosClient"

const CMMSSettingApi = {
    causes: {
        getCauses: async () => await axiosClient.get("/Causes"),
        createCause: async (data) => await axiosClient.post("/Causes", data),
        updateCause: async (data, id) => await axiosClient.put(`/Causes/${id}`, data),
        deleteCause: async (id) => await axiosClient.delete(`/Causes/${id}`),
    },
    corrections: {
        getCorrections: async () => await axiosClient.get("/Corrections"),
        createCorrection: async (data) => await axiosClient.post("/Corrections", data),
        updateCorrection: async (data, id) => await axiosClient.put(`/Corrections/${id}`, data),
        deleteCorrection: async (id) => await axiosClient.delete(`/Corrections/${id}`),
    },
}
export default CMMSSettingApi
