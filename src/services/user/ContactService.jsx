import api from "../api";

const contactService = {
  create: async (data) => {
    const res = await api.post("/users/contact", data);
    return res.data;
  },

  update: async (data) => {
    const res = await api.patch("/users/update", data);
    return res.data;
  }
};

export default contactService;
