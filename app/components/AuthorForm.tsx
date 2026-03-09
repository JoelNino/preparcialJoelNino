"use client";

import { useState, useEffect } from "react";

export type Author = {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
};

interface Props {
  onAddAuthor: (author: Author) => void;
  initialAuthor?: Author;
}

export default function AuthorForm({ onAddAuthor, initialAuthor }: Props) {
  const [name, setName] = useState(initialAuthor?.name || "");
  const [birthDate, setBirthDate] = useState(initialAuthor?.birthDate || "");
  const [description, setDescription] = useState(initialAuthor?.description || "");
  const [image, setImage] = useState(initialAuthor?.image || "");

  const [errorName, setErrorName] = useState("");
  const [errorBirthDate, setErrorBirthDate] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (initialAuthor) {
      setName(initialAuthor.name);
      setBirthDate(initialAuthor.birthDate);
      setDescription(initialAuthor.description);
      setImage(initialAuthor.image);
    }
  }, [initialAuthor]);

  function validate() {
    let valid = true;
    if (!name.trim()) { setErrorName("El nombre es obligatorio"); valid = false; }
    else setErrorName("");
    if (!birthDate) { setErrorBirthDate("La fecha es obligatoria"); valid = false; }
    else setErrorBirthDate("");
    if (!description.trim()) { setErrorDescription("La descripción es obligatoria"); valid = false; }
    else setErrorDescription("");
    if (!image.trim()) { setErrorImage("La imagen es obligatoria"); valid = false; }
    else setErrorImage("");
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const newAuthor: Author = {
      id: initialAuthor?.id || Date.now(),
      name,
      birthDate,
      description,
      image,
    };

    onAddAuthor(newAuthor);

    if (!initialAuthor) {
      setName("");
      setBirthDate("");
      setDescription("");
      setImage("");
    }

    setSuccessMessage(
      initialAuthor ? "Autor actualizado correctamente" : "Autor creado correctamente"
    );
    setTimeout(() => setSuccessMessage(""), 3000);
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} noValidate>
        {successMessage && (
          <div className="alert alert-success-custom p-3 mb-4" role="status" aria-live="polite">
            {successMessage}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            id="name"
            className={`form-control ${errorName ? "is-invalid" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby={errorName ? "errorName" : undefined}
            aria-invalid={!!errorName}
            placeholder="Ej: Gabriel García Márquez"
          />
          {errorName && (
            <div id="errorName" className="invalid-feedback" role="alert">
              {errorName}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">Fecha de nacimiento</label>
          <input
            type="date"
            id="birthDate"
            className={`form-control ${errorBirthDate ? "is-invalid" : ""}`}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            aria-describedby={errorBirthDate ? "errorBirthDate" : undefined}
            aria-invalid={!!errorBirthDate}
          />
          {errorBirthDate && (
            <div id="errorBirthDate" className="invalid-feedback" role="alert">
              {errorBirthDate}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            id="description"
            className={`form-control ${errorDescription ? "is-invalid" : ""}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-describedby={errorDescription ? "errorDescription" : undefined}
            aria-invalid={!!errorDescription}
            placeholder="Breve biografía del autor..."
            rows={4}
          />
          {errorDescription && (
            <div id="errorDescription" className="invalid-feedback" role="alert">
              {errorDescription}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="form-label">URL de imagen</label>
          <input
            id="image"
            className={`form-control ${errorImage ? "is-invalid" : ""}`}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            aria-describedby={errorImage ? "errorImage" : undefined}
            aria-invalid={!!errorImage}
            placeholder="https://ejemplo.com/foto.jpg"
          />
          {errorImage && (
            <div id="errorImage" className="invalid-feedback" role="alert">
              {errorImage}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-submit w-100">
          {initialAuthor ? "Guardar Cambios" : "Crear Autor"}
        </button>
      </form>
    </div>
  );
}