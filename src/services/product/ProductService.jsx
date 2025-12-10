import api from '../api';

const BASE_URL = '/products';

class ProductService {

    getAllProducts() {
        return api.get(BASE_URL);
    }

    getProductById(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createProduct(productFormData) {
        return api.post(BASE_URL, productFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    updateProduct(id, productFormData) {
        return api.patch(`${BASE_URL}/${id}`, productFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    deleteProduct(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new ProductService();