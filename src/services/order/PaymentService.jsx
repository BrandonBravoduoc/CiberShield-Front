import api from '../api';

const BASE_URL = '/payments';

class PaymentService {

    getAllPayments() {
        return api.get(BASE_URL);
    }

    getPayment(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createPayment(dto) {
        return api.post(BASE_URL, dto);
    }

    patchPayment(id, dto) {
        return api.patch(`${BASE_URL}/${id}`, dto);
    }

    deletePayment(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new PaymentService();
