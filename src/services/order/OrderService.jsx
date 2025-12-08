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

    patchOrder(id, order) {
        return api.patch(`${BASE_URL}/${id}`, order);
    }

    deleteOrder(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new OrderService();
