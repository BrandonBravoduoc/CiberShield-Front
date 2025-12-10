import React, { useEffect, useState } from "react";
import locationService from "../../services/user/LocationService";

const Selector = ({ regionValue = "", communeValue = "", onChange }) => {
  const [regions, setRegions] = useState([]);
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    const loadRegions = async () => {
      const data = await locationService.getRegions();
      setRegions(data);
    };
    loadRegions();
  }, []);

  useEffect(() => {
    if (!regionValue) {
      setCommunes([]);
      return;
    }
    const loadCommunes = async () => {
      const data = await locationService.getCommunesByRegion(regionValue);
      setCommunes(data);
    };
    loadCommunes();
  }, [regionValue]);

  return (
    <div className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-100 mb-1">
          Región
        </label>
        <select
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 p-2 rounded-md"
          value={regionValue || ""}
          onChange={(e) =>
            onChange({
              regionId: e.target.value,
              communeId: ""
            })
          }
        >
          <option value="">Seleccione una región</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>{r.regionName}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-100 mb-1">
          Comuna
        </label>
        <select
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 p-2 rounded-md"
          value={communeValue || ""}
          disabled={!regionValue}
          onChange={(e) =>
            onChange({
              communeId: e.target.value
            })
          }
        >
          <option value="">Seleccione una comuna</option>
          {communes.map((c) => (
            <option key={c.id} value={c.id}>{c.nameCommunity}</option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default Selector;
