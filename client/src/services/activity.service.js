import api from "./api";
const API_URL = import.meta.env.VITE_ACTIVITIES_API;

const createActivity = async (data) => {
  return await api.post(API_URL + "/", data);
};

const getAllActivities = async () => {
  return await api.get(API_URL + "/");
};

const getActivitiesById = async (id) => {
  return await api.get(API_URL + id);
};

const UpdateActivities = async (id, activity) => {
  return await api.put(API_URL + id, activity);
};

const DeleteActivities = async (id) => {
  return await api.delete(API_URL + id);
};

const ActivitiesService = {
  createActivity,
  getAllActivities,
  getActivitiesById,
  UpdateActivities,
  DeleteActivities,
};

export default ActivitiesService;