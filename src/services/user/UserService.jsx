import api from "../api";

const userService = {
  getProfile: async () => {
    const res = await api.get("/users/profile");
    return res.data;
  },

  updateUser: async (data) => {
    const res = await api.patch("/users/me", data);
    return res.data;
  },

  deleteUser: async (id) => {
    return await api.delete(`/users/delete?id=${id}`);
  },
};

export default userService;
