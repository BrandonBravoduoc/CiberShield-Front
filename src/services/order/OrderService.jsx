import api from '../api';

const BASE_URL = '/orders';

class OrderService {

    getAllOrders() {
        return api.get(BASE_URL);
    }

    getOrderById(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createOrder(order) {
        return api.post(BASE_URL, order);
    }

    patchOrderStatus(id, statusDto) {
        return api.patch(`${BASE_URL}/${id}/status`, statusDto);
    }

    deleteOrder(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new OrderService();
