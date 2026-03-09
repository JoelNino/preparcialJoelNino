"use client";

import { useEffect, useState } from "react";

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

  function validateName(value: string) {
    if (!value.trim()) return "El nombre es obligatorio";
    if (value.trim().length < 3) return "Mínimo 3 caracteres";
    return "";
  }

  function validateBirthDate(value: string) {
    if (!value) return "La fecha es obligatoria";
    return "";
  }

  function validateDescription(value: string) {
    if (!value.trim()) return "La descripción es obligatoria";
    if (value.trim().length < 10) return "Mínimo 10 caracteres";
    return "";
  }

  function validateImage(value: string) {
    if (!value.trim()) return "La imagen es obligatoria";
    if (!value.startsWith("http")) return "Debe ser una URL válida";
    return "";
  }

  function validate() {
    const nameError = validateName(name);
    const birthDateError = validateBirthDate(birthDate);
    const descriptionError = validateDescription(description);
    const imageError = validateImage(image);

    setErrorName(nameError);
    setErrorBirthDate(birthDateError);
    setErrorDescription(descriptionError);
    setErrorImage(imageError);

    return !nameError && !birthDateError && !descriptionError && !imageError;
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
      setErrorName("");
      setErrorBirthDate("");
      setErrorDescription("");
      setErrorImage("");
    }

    setSuccessMessage(
      initialAuthor ? "Autor actualizado correctamente" : "Autor creado correctamente"
    );

    setTimeout(() => setSuccessMessage(""), 3000);
  }

  const isFormValid =
    validateName(name) === "" &&
    validateBirthDate(birthDate) === "" &&
    validateDescription(description) === "" &&
    validateImage(image) === "";

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
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              setErrorName(validateName(value));
            }}
            onBlur={() => setErrorName(validateName(name))}
            aria-describedby={errorName ? "errorName" : undefined}
            aria-invalid={!!errorName}
            placeholder="Ej: Gabriel García Márquez"
          />
          <small className="text-muted">Mínimo 3 caracteres</small>
          {errorName && (
            <div id="errorName" className="invalid-feedback" role="alert" aria-label={errorName}>
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
            onChange={(e) => {
              const value = e.target.value;
              setBirthDate(value);
              setErrorBirthDate(validateBirthDate(value));
            }}
            onBlur={() => setErrorBirthDate(validateBirthDate(birthDate))}
            aria-describedby={errorBirthDate ? "errorBirthDate" : undefined}
            aria-invalid={!!errorBirthDate}
          />
          <small className="text-muted">Campo obligatorio</small>
          {errorBirthDate && (
            <div id="errorBirthDate" className="invalid-feedback" role="alert" aria-label={errorBirthDate}>
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
            onChange={(e) => {
              const value = e.target.value;
              setDescription(value);
              setErrorDescription(validateDescription(value));
            }}
            onBlur={() => setErrorDescription(validateDescription(description))}
            aria-describedby={errorDescription ? "errorDescription" : undefined}
            aria-invalid={!!errorDescription}
            placeholder="Breve biografía del autor..."
            rows={4}
          />
          <small className="text-muted">Mínimo 10 caracteres</small>
          {errorDescription && (
            <div id="errorDescription" className="invalid-feedback" role="alert" aria-label={errorDescription}>
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
            onChange={(e) => {
              const value = e.target.value;
              setImage(value);
              setErrorImage(validateImage(value));
            }}
            onBlur={() => setErrorImage(validateImage(image))}
            aria-describedby={errorImage ? "errorImage" : undefined}
            aria-invalid={!!errorImage}
            placeholder="https://ejemplo.com/foto.jpg"
          />
          <small className="text-muted">Debe comenzar con http o https</small>
          {errorImage && (
            <div id="errorImage" className="invalid-feedback" role="alert" aria-label={errorImage}>
              {errorImage}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-submit w-100"
          disabled={!isFormValid}
        >
          {initialAuthor ? "Guardar Cambios" : "Crear Autor"}
        </button>
      </form>
    </div>
  );
}