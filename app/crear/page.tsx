"use client";

import AuthorForm from "../components/AuthorForm";
import { useAuthors } from "../context/AuthorsContext";

export default function CrearAutorPage() {
  const { addAuthor } = useAuthors();

  return (
    <div>
      <h1>Crear Autor</h1>
      <AuthorForm onAddAuthor={addAuthor} />
    </div>
  );
}