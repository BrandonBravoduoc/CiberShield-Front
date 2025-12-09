import api from "../api";

const userService = {
  getProfile: async () => {
    const res = await api.get("/users/profile");
    return res.data;
  },

  updateUser: async (data, imageFile) => {
    const form = new FormData();

    if (imageFile) {
        form.append("imageUser", imageFile);
    }

    form.append("dto", new Blob([JSON.stringify(data)], { type: "application/json" }));

    const res = await api.patch("/users/me", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
    },

  deleteUser: async (id) => {
    return await api.delete(`/users/delete?id=${id}`);
  },

};

export default userService;
