import { useEffect, useState } from "react";
import userService from "../../services/user/UserService";
import passwordService from "../../services/auth/PasswordService";
import contactService from "../../services/user/ContactService";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // FORMULARIOS LOCALES
  const [userForm, setUserForm] = useState({
    userName: "",
    email: "",
  });

  const [contactForm, setContactForm] = useState({
    name: "",
    lastName: "",
    phone: "",
    street: "",
    number: "",
    communeId: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await userService.getProfile();
      setProfile(data);

      // Llenar forms con valores actuales
      setUserForm({
        userName: data.user.userName,
        email: data.user.email,
      });

      if (data.contact) {
        setContactForm({
          name: data.contact.name,
          lastName: data.contact.lastName,
          phone: data.contact.phone,
          street: data.contact.street,
          number: data.contact.number,
          communeId: data.contact.communeId || "",
        });
      }

    } catch (err) {
      console.error("Error cargando perfil", err);
      setErrors({ general: "Error al cargar tu perfil" });
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdate = async () => {
    try {
      await userService.updateUser(userForm);
      loadProfile();
    } catch (err) {
      setErrors({ user: err.response?.data?.error });
    }
  };

  const handleContactUpdate = async () => {
    try {
      await contactService.update(contactForm);
      loadProfile();
    } catch (err) {
      setErrors({ contact: err.response?.data?.error });
    }
  };

  const handlePasswordChange = async () => {
    try {
      await passwordService.change(passwordForm);
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setErrors({ password: err.response?.data?.error });
    }
  };

  if (loading) return <p className="text-white text-center mt-10">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-6 text-white">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* FOTO Y NOMBRE */}
        <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 shadow-xl flex items-center gap-6">
          <img
            src={profile.user.imageUser}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-indigo-500 shadow-lg object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{profile.user.userName}</h1>
            <p className="text-gray-400">{profile.user.email}</p>
          </div>
        </div>

        {/* INFORMACIÓN DE USUARIO */}
        <section className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-indigo-400">Información de la cuenta</h2>

          {errors.user && <p className="text-red-500">{errors.user}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="text-gray-300">Nombre de usuario</label>
              <input
                className="input-field"
                value={userForm.userName}
                onChange={(e) => setUserForm({ ...userForm, userName: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300">Email</label>
              <input
                className="input-field"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              />
            </div>

          </div>

          <button
            onClick={handleUserUpdate}
            className="btn-indigo mt-4"
          >
            Guardar cambios
          </button>
        </section>

        {/* CONTACTO */}
        <section className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-indigo-400">Información de contacto</h2>

          {errors.contact && <p className="text-red-500">{errors.contact}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="text-gray-300">Nombre</label>
              <input
                className="input-field"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300">Apellido</label>
              <input
                className="input-field"
                value={contactForm.lastName}
                onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300">Teléfono</label>
              <input
                className="input-field"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300">Calle</label>
              <input
                className="input-field"
                value={contactForm.street}
                onChange={(e) => setContactForm({ ...contactForm, street: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300">Número</label>
              <input
                className="input-field"
                value={contactForm.number}
                onChange={(e) => setContactForm({ ...contactForm, number: e.target.value })}
              />
            </div>

          </div>

          <button
            onClick={handleContactUpdate}
            className="btn-indigo mt-4"
          >
            Guardar contacto
          </button>
        </section>

        {/* CONTRASEÑA */}
        <section className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800 shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-red-400">Cambiar contraseña</h2>

          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div>
              <label className="text-gray-300">Contraseña actual</label>
              <input
                type="password"
                className="input-field"
                value={passwordForm.oldPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300">Nueva contraseña</label>
              <input
                type="password"
                className="input-field"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300">Confirmar contraseña</label>
              <input
                type="password"
                className="input-field"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              />
            </div>

          </div>

          <button
            onClick={handlePasswordChange}
            className="btn-red mt-4"
          >
            Cambiar contraseña
          </button>

        </section>
      </div>
    </div>
  );
}
