"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthors } from "../context/AuthorsContext";

export default function AuthorList() {
  const { authors, deleteAuthor } = useAuthors();
  const [search, setSearch] = useState("");

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(search.toLowerCase())
  );

  if (authors.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <p className="fs-5">No hay autores registrados aún.</p>
      </div>
    );
  }

  return (
    <div>

      <input
        type="text"
        placeholder="Buscar autor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-4"
      />

      {filteredAuthors.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <p className="fs-5">NO SE ENCONTRARON AUTORES.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {filteredAuthors.map((author) => (
            <div className="col" key={author.id}>
              <div className="card h-100 author-card">
                {author.image ? (
                  <img src={author.image} alt={author.name} />
                ) : (
                  <div className="img-placeholder">Sin imagen</div>
                )}
                <div className="card-body d-flex flex-column gap-2">
                  <h5 className="card-title mb-0">{author.name}</h5>
                  <p className="card-subtitle">
                    Nacimiento: {author.birthDate}
                  </p>
                  <p className="card-text flex-grow-1">{author.description}</p>
                  <div className="d-flex gap-2 mt-2">
                    <button
                      type="button"
                      className="btn btn-delete btn-sm rounded-pill px-3"
                      onClick={() => deleteAuthor(author.id)}
                    >
                      Eliminar
                    </button>
                    <Link
                      href={`/editar/${author.id}`}
                      className="btn btn-edit btn-sm rounded-pill px-3"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

