import api from "../api";

const passwordService = {
  change: async (data) => {
    const res = await api.patch("/users/me/change-password", data);
    return res.data;
  }
};

export default passwordService;
