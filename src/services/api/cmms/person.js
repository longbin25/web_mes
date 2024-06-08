import axiosClient from "./axiosClient"

const CMMSPersonAPi = {
    person: {
        getPersons: async () => await axiosClient.get("/Persons"),
        createPerson: async (data) => await axiosClient.post("/Persons", data),
        updatePerson: async (data, id) => await axiosClient.put(`/Persons/${id}`, data),
        deletePerson: async (id) => await axiosClient.delete(`/Persons/${id}`),

        getPersonById: async (id) => await axiosClient.get(`/Persons/${id}`),
    },
    workingTime: {
        getAllWorkingTimes: async () => await axiosClient.get(`/WorkingTimes`),
        getWorkingTimesByPerson: async (PersonId) => await axiosClient.get(`/WorkingTimes?PersonId=${PersonId}`),
        getWorkingTimes: async (PersonId, EquipmentId) =>
            await axiosClient.get(`/WorkingTimes?PersonId=${PersonId}&EquipmentId=${EquipmentId}`),
    },
}
export default CMMSPersonAPi
