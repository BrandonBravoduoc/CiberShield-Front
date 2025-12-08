import api from '../api';

const BASE_URL = '/trademarks';

class TradeMarkService {

    getAllTradeMarks() {
        return api.get(BASE_URL);
    }

    getTradeMarkById(id) {
        return api.get(`${BASE_URL}/${id}`);
    }

    createTradeMark(tradeMark) {
        return api.post(BASE_URL, tradeMark);
    }

    updateTradeMark(id, tradeMark) {
        return api.put(`${BASE_URL}/${id}`, tradeMark);
    }

    deleteTradeMark(id) {
        return api.delete(`${BASE_URL}/${id}`);
    }
}

export default new TradeMarkService();