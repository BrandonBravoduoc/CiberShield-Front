import api from '../api';

const BASE_URL = '/auth';

const authService = {

   login: async (formData) => {
    const response = await api.post(`${BASE_URL}/signin`, formData);
    return response.data;
    },

  
    register: async (formDataObject) => {
        const formData = new FormData();

        formData.append('userName', formDataObject.username);
        formData.append('email', formDataObject.email);
        formData.append('password', formDataObject.password);
        formData.append('confirmPassword', formDataObject.confirmPassword);

        if(formDataObject.imageUser) {
            formData.append('imageUser', formDataObject.imageUser);
        }

       const response = await api.post(`${BASE_URL}/register`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    changePassword: async (formData) => {
        const response = await api.patch(`/auth/me/change-password`, formData);
        return response.data;
    }




};

export default authService;