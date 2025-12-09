import api from '../api';

const BASE_URL = '/auth';

const authService = {

    login: async (formData) => {
        const response = await api.post(`${BASE_URL}/signin`, formData);
    
    const token = response.data.token;
    localStorage.setItem('authToken', token);

    return response.data;
    },

    logout: () => {
        localStorage.removeItem('authToken');
    },

    register: async (formDataObject) => {
        const formData = new FormData();

        formData.append('userName', formDataObject.userName);
        formData.append('email', formDataObject.email);
        formData.append('password', formDataObject.password);
        formData.append('confirmPassword', formDataObject.confirmPassword);

        if(formDataObject.imageUser) {
            formData.append('imageUser', formDataObject.imageUser);
        }

       const response = await axios.post(`${API_URL}/register`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
};

export default authService;