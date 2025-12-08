import api from '../api';

const BASE_URL = '/order-details';

class OrderDetailService {

    getAllOrderDetails() {
        return api.get(BASE_URL);
    }

    getOrderDetailById(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    deleteOrderDetail(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }

}

export default new OrderDetailService();
