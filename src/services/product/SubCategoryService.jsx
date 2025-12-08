import api from '../api';

const BASE_URL = '/subcategorys';

class SubCategoryService {

    getAllSubCategories() {
        return api.get(BASE_URL);
    }

    getSubCategoryById(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createSubCategory(subCategory) {
        return api.post(BASE_URL, subCategory);
    }

    updateSubCategory(id, subCategory) {
        return api.put(`${BASE_URL}/${id}`, subCategory);
    }

    deleteSubCategory(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new SubCategoryService();