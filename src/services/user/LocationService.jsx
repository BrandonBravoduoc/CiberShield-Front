import api from "../api";

const locationService = {

  getRegions: async () => {
    const response = await api.get("/locations/regions");
    return response.data;
  },

  getCommunesByRegion: async (regionId) => {
    const response = await api.get("/locations/communes", {
      params: { regionId },
    });
    return response.data;
  }

};

export default locationService;
