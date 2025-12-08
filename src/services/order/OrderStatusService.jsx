import api from '../api';

const BASE_URL = '/order-status';

class OrderStatusService {

    getAllOrderStatus() {
        return api.get(BASE_URL);
    }

    getOrderStatusById(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    deleteOrderStatus(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }

    createOrderStatus(orderStatus) {
        return api.post(BASE_URL, orderStatus);
    }

    patchOrderStatus(id, orderStatus) {
        return api.patch(`${BASE_URL}/${id}`, orderStatus);
    }

}
