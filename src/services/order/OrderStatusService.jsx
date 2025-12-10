import api from '../api';

const BASE_URL = '/order-status';

class OrderStatusService {

    getAllOrderStatus() {
        return api.get(BASE_URL);
    }

    getOrderStatusById(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createOrderStatus(dto) {
        return api.post(BASE_URL, dto);
    }

    patchOrderStatus(id, dto) {
        return api.patch(`${BASE_URL}/${id}`, dto);
    }

    deleteOrderStatus(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new OrderStatusService();
