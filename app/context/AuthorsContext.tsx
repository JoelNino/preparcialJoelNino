"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Author = {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
};

type AuthorsContextType = {
  authors: Author[];
  addAuthor: (author: Author) => void;
  updateAuthor: (author: Author) => void;
  deleteAuthor: (id: number) => void;
};

const AuthorsContext = createContext<AuthorsContextType | null>(null);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/api/authors");
        const data = await res.json();
        setAuthors(data);
      } catch (err) {
        console.error("Error al cargar autores:", err);
      }
    };
    fetchAuthors();
  }, []);

  function addAuthor(author: Author) {
    setAuthors((prev) => [...prev, author]);
  }

  function updateAuthor(updatedAuthor: Author) {
    setAuthors((prev) =>
      prev.map((a) => (a.id === updatedAuthor.id ? updatedAuthor : a))
    );
  }

  function deleteAuthor(id: number) {
    setAuthors((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <AuthorsContext.Provider value={{ authors, addAuthor, updateAuthor, deleteAuthor }}>
      {children}
    </AuthorsContext.Provider>
  );
}

export function useAuthors() {
  const context = useContext(AuthorsContext);
  if (!context) throw new Error("useAuthors must be used inside AuthorsProvider");
  return context;
}