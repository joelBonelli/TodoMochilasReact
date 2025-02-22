import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    mensaje: "",
    foto: null,
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    mensaje: "",
    foto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, foto: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = { ...errors };

    // Validación de nombre
    if (!formData.nombre || /\d/.test(formData.nombre)) {
      formErrors.nombre = "El nombre no puede estar vacío ni contener números.";
    } else {
      formErrors.nombre = "";
    }

    // Validación de apellido
    if (!formData.apellido || /\d/.test(formData.apellido)) {
      formErrors.apellido = "El apellido no puede estar vacío ni contener números.";
    } else {
      formErrors.apellido = "";
    }

    // Validación de teléfono
    if (!formData.telefono || !/^\d{8,}$/.test(formData.telefono)) {
      formErrors.telefono = "El teléfono debe contener solo números y tener al menos 8 dígitos.";
    } else {
      formErrors.telefono = "";
    }

    // Validación de email
    if (!formData.email) {
      formErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "El correo electrónico no tiene un formato válido.";
    } else {
      formErrors.email = "";
    }

    // Validación de mensaje
    if (!formData.mensaje) {
      formErrors.mensaje = "El mensaje no puede estar vacío.";
    } else {
      formErrors.mensaje = "";
    }

    // Validación de foto (si se sube archivo, que sea de formato adecuado)
    if (formData.foto && !/\.(jpg|jpeg|png)$/i.test(formData.foto.name)) {
      formErrors.foto = "El archivo debe ser una imagen .jpg, .jpeg o .png.";
    } else {
      formErrors.foto = "";
    }

    setErrors(formErrors);

    // Si no hay errores, enviar el formulario
    const isValid = Object.values(formErrors).every((error) => error === "");
    if (isValid) {
      // Aquí iría la lógica para enviar el formulario
      alert("Formulario enviado correctamente!");
    }
  };

  return (
    <div>
      <Header />
      <main className="contenedor">
        <h2 className="subtitulo">Contacto</h2>

        <form method="POST" action="#" className="formulario">
          <fieldset>
            <legend>Información de contacto</legend>

            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" placeholder="Ingrese su nombre" />

            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              placeholder="Ingrese su apellido"
            />

            <label htmlFor="telefono">Teléfono</label>
            <input
              type="number"
              id="telefono"
              placeholder="Número de contacto"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Correo electrónico de contacto"
            />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje"></textarea>
          </fieldset>

          <fieldset className="sublimado">
            <legend>Sublimados</legend>

            <label htmlFor="mochila">Talle de mochila</label>
            <select name="mochila" id="mochila">
              <option value="S">Talle S</option>
              <option value="M">Talle M</option>
              <option value="L">Talle L</option>
              <option value="XL">Talle XL</option>
            </select>

            <label htmlFor="foto">Foto</label>
            <p>Cargue el archivo para sublimado</p>
            <input type="file" name="foto" id="foto" />

            <p>En caso de que la imagen enviada no se pueda cargar</p>

            <div className="similitud">
              <label htmlFor="igual">Adaptarla</label>
              <input type="radio" name="similitud" value="adaptar" id="igual" />

              <label htmlFor="buscar">Buscar otra</label>
              <input type="radio" name="similitud" value="buscar" id="buscar" />
            </div>
          </fieldset>

          <input type="submit" className="boton-amarillo" value="ENVIAR" />
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;