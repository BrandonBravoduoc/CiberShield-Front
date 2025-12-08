import api from '../api';

const BASE_URL = '/categories';

class CategoryService {

    getAllCategories() {
        return api.get(BASE_URL);
    }

    getCategoryById(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createCategory(category) {
        return api.post(BASE_URL, category);
    }

    updateCategory(id, category) {
        return api.put(`${BASE_URL}/${id}`, category);
    }

    deleteCategory(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new CategoryService();