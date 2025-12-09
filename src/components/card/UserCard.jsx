import React, { useRef, useState } from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import DynamicForm from "../organisms/DynamicForm";
import userService from "../../services/user/UserService";
import contactService from "../../services/user/ContactService";

const UserCard = ({ profile, fields, reloadProfile }) => {

  const [editMode, setEditMode] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);

  const [preview, setPreview] = useState(profile?.imageUser);
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef();

  const hasContact = profile.contact && profile.contact.id;

  const initialValues = hasContact
    ? {
        userName: profile.userName,
        email: profile.email,
        name: profile.contact.name,
        lastName: profile.contact.lastName,
        phone: profile.contact.phone,
        street: profile.contact.addressInfo?.split(" ")[0] || "",
        number: profile.contact.addressInfo?.split(" ")[1] || "",
        communeId: "" 
      }
    : {
        userName: profile.userName,
        email: profile.email,
        name: "",
        lastName: "",
        phone: "",
        street: "",
        number: "",
        communeId: ""
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setSelectedImage(file);
  };

  const handleSubmit = async (form) => {
    try {
      setServerErrors(null);
      await userService.updateUser(
        {
          newUserName: form.userName,
          newEmail: form.email
        },
        selectedImage
      );

      if (!hasContact) {
        await contactService.create({
          name: form.name,
          lastName: form.lastName,
          phone: form.phone,
          street: form.street,
          number: form.number,
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

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          <div className="flex gap-4 mt-4">
            <Button onClick={() => fileInputRef.current.click()}>
              Cambiar imagen
            </Button>
          </div>
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
                <p><span className="font-semibold text-white">Nombre: </span>{profile.contact.name}</p>
                <p><span className="font-semibold text-white">Apellido: </span>{profile.contact.lastName}</p>
                <p><span className="font-semibold text-white">Teléfono: </span>{profile.contact.phone}</p>
                <p><span className="font-semibold text-white">Dirección: </span>{profile.contact.addressInfo}</p>
              </>
            ) : (
              <p className="text-gray-400 italic">
                No tienes contacto registrado. Crea uno desde el botón "Editar información".
              </p>
            )}

            <Button className="mt-3 w-full" onClick={() => setEditMode(true)}>
              Editar información
            </Button>
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
            />
          </>
        )}

      </div>
    </div>
  );
};

export default UserCard;
