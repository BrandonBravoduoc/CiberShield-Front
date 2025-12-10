export const contactData = [
  { name: "userName", label: "Usuario", type: "text", placeholder: "Ej: Brandon123" },
  { name: "email", label: "Email", type: "email", placeholder: "correo@ejemplo.com" },
  { name: "imageUser", label: "Foto de Perfil", type: "file", placeholder: "Sube tu foto de perfil" },

  {
    name: "regionCommune",
    label: "Ubicación",
    type: "region-commune"
  },

  { name: "name", label: "Nombre", type: "text", placeholder: "Ej: Brandon" },
  { name: "lastName", label: "Apellido", type: "text", placeholder: "Ej: Bravo" },
  { name: "phone", label: "Teléfono", type: "text", placeholder: "+56 9 12345678" },
  { name: "street", label: "Calle", type: "text", placeholder: "Av. Siempre Viva" },
  { name: "number", label: "Número", type: "text", placeholder: "742" }
];


export const passwordData = [
  { name: "currentPassword", label: "Contraseña actual", type: "password" },
  { name: "newPassword", label: "Nueva contraseña", type: "password" },
  { name: "confirmNewPassword", label: "Confirmar nueva contraseña", type: "password" }
];
