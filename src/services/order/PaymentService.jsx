import api from "../api";

const BASE_URL = "/payments";

class PaymentService {

    getAllPayments() {
        return api.get(BASE_URL);
    }

    getPayment(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createPayment(payment) {
        return api.post(`${BASE_URL}/`, payment);
    }

    deletePayment(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }

    patchPayment(id, payment) {
        return api.patch(`${BASE_URL}/${id}`, payment);
    }

}

export default new PaymentService();
