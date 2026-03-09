"use client";

import { useParams } from "next/navigation";
import { useAuthors } from "../../context/AuthorsContext";
import AuthorForm from "../../components/AuthorForm";

export default function EditAuthorPage() {
  const { id } = useParams();
  const { authors, updateAuthor } = useAuthors();

  const author = authors.find((a) => a.id === Number(id));

  if (!author) {
    return <p>Autor no encontrado</p>;
  }

  return (
    <div>
      <h1>Editar Autor</h1>
      <AuthorForm
        initialAuthor={author}
        onAddAuthor={(updated) => updateAuthor({ ...updated, id: author.id })}
      />
    </div>
  );
}