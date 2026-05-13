import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(form);
      setMessage(data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al registrar"
      );
    }
  };

  return (
    <div className="container">
      <div className="register-card">

        {/* LEFT SIDE */}
        <div className="left-panel">
          <h1>Vibes Ecuador</h1>

          <p>
            Plataforma web para una persona freelance
            que vende programas de viajes nacionales
            e internacionales.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">
          <h2>Crear cuenta</h2>

          <form onSubmit={handleSubmit}>
            <label>Nombre completo</label>
            <input
              type="text"
              name="name"
              placeholder="Ingresa tu nombre"
              value={form.name}
              onChange={handleChange}
            />

            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={form.email}
              onChange={handleChange}
            />

            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit">
              Registrarse
            </button>
          </form>

          {message && (
            <p className="message">{message}</p>
          )}

          <p className="login-text">
            ¿Ya tienes cuenta?
            <span> Inicia sesión</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
