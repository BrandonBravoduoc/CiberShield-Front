import api from '../api';

const BASE_URL = '/payment-methods';

class PaymentMethodService {

    getAllPaymentMethods() {
        return api.get(BASE_URL);
    }

    getPaymentMethod(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createPaymentMethod(dto) {
        return api.post(BASE_URL, dto);
    }

    patchPaymentMethod(id, dto) {
        return api.patch(`${BASE_URL}/${id}`, dto);
    }

    deletePaymentMethod(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new PaymentMethodService();
