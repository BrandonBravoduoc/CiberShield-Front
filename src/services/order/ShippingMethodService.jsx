import api from '../api';

const BASE_URL = '/shipping-methods';

class ShippingMethodService {

    getAllShippingMethods() {
        return api.get(BASE_URL);
    }

    getShippingMethod(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createShippingMethod(dto) {
        return api.post(BASE_URL, dto);
    }

    patchShippingMethod(id, dto) {
        return api.patch(`${BASE_URL}/${id}`, dto);
    }

    deleteShippingMethod(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new ShippingMethodService();
