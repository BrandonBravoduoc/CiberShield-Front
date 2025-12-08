import api from '../api';

const BASE_URL = '/payment-methods';

class PaymentMethodService {

    getAllPaymentMethods() {
        return api.get(BASE_URL);
    }

    createPaymentMethod(paymentMethod) {
        return api.post(BASE_URL, paymentMethod);
    }

    deletePaymentMethod(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }

    patchPaymentMethod(id, paymentMethod) {
        return api.patch(`${BASE_URL}/${id}`, paymentMethod);
    }

    getPaymentMethod(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

}

export default new PaymentMethodService();
