import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import DynamicForm from "../organisms/DynamicForm";
import userService from "../../services/user/UserService";
import contactService from "../../services/user/ContactService";
import locationService from "../../services/user/LocationService";
import { isAdmin } from "../../utils/JwtUtil";

const UserCard = ({ profile, fields, reloadProfile }) => {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [regionName, setRegionName] = useState(null);

  const [preview, setPreview] = useState(profile?.imageUser);

  const hasContact = profile.contact && profile.contact.id;

  useEffect(() => {
    if (hasContact && profile.contact.addressInfo) {
      const loadRegion = async () => {
        try {
          const communeName = profile.contact.addressInfo.split(",")[1]?.trim();
          if (!communeName) return;

          const regions = await locationService.getRegions();
          
          for (const region of regions) {
            const communes = await locationService.getCommunesByRegion(region.id);
            const found = communes.find(c => c.nameCommunity === communeName);
            if (found) {
              setRegionName(region.regionName);
              break;
            }
          }
        } catch (err) {
          console.error("Error cargando región:", err);
        }
      };

      loadRegion();
    }
  }, [hasContact, profile.contact?.addressInfo]);

  // Crear initialValues incluyendo región y comuna
  const initialValues = {
    userName: profile.userName,
    email: profile.email,
    imageUser: null,

    name: hasContact ? profile.contact.name : "",
    lastName: hasContact ? profile.contact.lastName : "",
    phone: hasContact ? profile.contact.phone : "",

    street: hasContact ? profile.contact.addressInfo?.split(" ")[0] || "" : "",
    number: hasContact ? profile.contact.addressInfo?.split(" ")[1] || "" : "",

    regionId: hasContact ? profile.contact.region?.id || "" : "",
    communeId: hasContact ? profile.contact.commune?.id || "" : ""
  };

  const formatErrors = (err) => {
    const data = err?.response?.data;
    if (!data) return ["Error desconocido"];
    if (typeof data === "string") return [data];
    if (data.error) return [data.error];
    if (data.message) return [data.message];
    if (data.errors) return Object.values(data.errors);
    return ["Error desconocido"];
  };



  const handleSubmit = async (form) => {
    try {
      setServerErrors(null);
      await userService.updateUser(
        {
          newUserName: form.userName,
          newEmail: form.email
        },
        form.imageUser
      );

      if (!hasContact) {
        await contactService.create({
          name: form.name,
          lastName: form.lastName,
          phone: form.phone,
          street: form.street,
          number: form.number,
          regionId: form.regionId,
          communeId: form.communeId
        });
      } else {
        await contactService.update({
          id: profile.contact.id,
          name: form.name,
          lastName: form.lastName,
          phone: form.phone,
          street: form.street,
          number: form.number,
          regionId: form.regionId,
          communeId: form.communeId
        });
      }

      reloadProfile();
      setEditMode(false);

    } catch (err) {
      setServerErrors(formatErrors(err));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">

        <div className="flex flex-col items-center">
          <Image
            src={preview || "/default-avatar.png"}
            alt="User Avatar"
            className="h-28 w-28 rounded-full object-cover border border-gray-700 shadow-md"
          />
        </div>

        <div className="my-6 border-t border-gray-800"></div>

        {serverErrors && (
          <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-lg">
            {serverErrors.map((err, i) => (
              <p key={i} className="text-red-300 text-sm">{err}</p>
            ))}
          </div>
        )}

        {!editMode && (
          <div className="text-gray-300 space-y-1">
            <p><span className="font-semibold text-white">Usuario: </span>{profile.userName}</p>
            <p><span className="font-semibold text-white">Email: </span>{profile.email}</p>

            {hasContact ? (
               <>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Nombre</p>
                    <p className="text-white font-medium">{profile.contact.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Apellido</p>
                    <p className="text-white font-medium">{profile.contact.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Teléfono</p>
                    <p className="text-white font-medium">{profile.contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Dirección</p>
                    <p className="text-white font-medium">{profile.contact.addressInfo?.split(",")[0]}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Comuna</p>
                    <p className="text-white font-medium">
                      {profile.contact.addressInfo?.split(",")[1]?.trim() || "No especificada"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide">Región</p>
                    <p className="text-white font-medium">
                      {regionName || "Cargando..."}
                    </p>
                  </div>
                </div>
               </>
             ) : (
               <p className="text-gray-400 italic">
                 No tienes contacto registrado. Crea uno desde el botón "Editar información".
               </p>
             )}

            <div className="flex flex-col gap-2 mt-3">
              <Button className="w-full" onClick={() => setEditMode(true)}>
                Editar información
              </Button>

              {isAdmin() && (
                <Button 
                  className="w-full bg-gray-700 hover:bg-gray-600" 
                  onClick={() => navigate("/admin")}
                >
                  Panel de Administración
                </Button>
              )}
            </div>
          </div>
        )}

        {editMode && (
          <>
            <DynamicForm
              fields={fields}
              initialValues={initialValues}
              buttonText={hasContact ? "Actualizar datos" : "Crear contacto"}
              onSubmit={handleSubmit}
              serverErrors={serverErrors}
              onCancel={() => setEditMode(false)}  
            />
          </>
        )}

      </div>
    </div>
  );
};

export default UserCard;
