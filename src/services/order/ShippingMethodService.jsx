import api from '../api';

const BASE_URL = '/shipping-methods';

class ShippingMethodService {

    getAllShippingMethods() {
        return api.get(BASE_URL);
    }

    getShippingMethod(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createShippingMethod(shippingMethod) {
        return api.post(`${BASE_URL}/`, shippingMethod);
    }

    patchShippingMethod(shippingMethod) {
        return api.patch(`${BASE_URL}/${shippingMethod.id}`, shippingMethod);
    }

    deleteShippingMethod(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }

}

export default new ShippingMethodService();
