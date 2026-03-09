"use client";

import Link from "next/link";
import { AuthorsProvider } from "./context/AuthorsContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f8f5f0;
          }
          h1, h2, h3, .navbar-brand {
            font-family: 'Lora', serif;
          }
          .navbar {
            background-color: #1e1b16 !important;
            box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          }
          .navbar-brand {
            font-size: 1.4rem;
            font-weight: 700;
            color: #e8c98a !important;
            letter-spacing: 0.01em;
          }
          .nav-link {
            color: #d4c5a9 !important;
            font-weight: 500;
            font-size: 0.92rem;
            transition: color 0.2s;
          }
          .nav-link:hover {
            color: #e8c98a !important;
          }
          .author-card {
            border: none;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 16px rgba(0,0,0,0.08);
            transition: transform 0.2s, box-shadow 0.2s;
            background: #fff;
          }
          .author-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          }
          .author-card img {
            width: 100%;
            height: 220px;
            object-fit: contain;
            background-color: #f0ebe3;
            padding: 8px;
          }
          .author-card .img-placeholder {
            width: 100%;
            height: 220px;
            background: linear-gradient(135deg, #e8e0d4, #d4c5a9);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8a7968;
            font-size: 0.9rem;
            font-weight: 500;
          }
          .author-card .card-title {
            font-family: 'Lora', serif;
            font-size: 1.15rem;
            font-weight: 700;
            color: #1e1b16;
          }
          .author-card .card-subtitle {
            font-size: 0.78rem;
            color: #8a7968;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            font-weight: 500;
          }
          .author-card .card-text {
            font-size: 0.88rem;
            color: #5a4a3a;
            line-height: 1.65;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .btn-edit {
            background: #f0ebe3;
            color: #3d2b1f;
            border: none;
            font-size: 0.82rem;
            font-weight: 600;
          }
          .btn-edit:hover {
            background: #e0d5c5;
            color: #1e1b16;
          }
          .btn-delete {
            background: #fdecea;
            color: #c0392b;
            border: none;
            font-size: 0.82rem;
            font-weight: 600;
          }
          .btn-delete:hover {
            background: #f5c6c2;
            color: #922b21;
          }
          .form-wrapper {
            background: #fff;
            border-radius: 14px;
            padding: 2.5rem;
            box-shadow: 0 2px 20px rgba(0,0,0,0.08);
            max-width: 540px;
          }
          .form-label {
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            color: #3d2b1f;
          }
          .form-control:focus {
            border-color: #c9822a;
            box-shadow: 0 0 0 3px rgba(201,130,42,0.15);
          }
          .btn-submit {
            background-color: #c9822a;
            color: #fff;
            border: none;
            font-weight: 600;
            font-size: 0.95rem;
            padding: 0.7rem 2rem;
            border-radius: 8px;
            transition: background 0.2s;
          }
          .btn-submit:hover {
            background-color: #a8691f;
            color: #fff;
          }
          .page-title {
            font-size: 2.2rem;
            font-weight: 700;
            color: #1e1b16;
            margin-bottom: 1.8rem;
          }
          .alert-success-custom {
            background: #d8f3dc;
            color: #2d6a4f;
            border: 1px solid #b7e4c7;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
          }
        `}</style>
      </head>
      <body>
        <nav className="navbar navbar-expand-lg px-4">
          <Link href="/" className="navbar-brand">Bookstore</Link>
          <div className="d-flex gap-3 ms-auto">
            <Link href="/authors" className="nav-link">Autores</Link>
            <Link href="/crear" className="nav-link">Crear Autor</Link>
          </div>
        </nav>
        <AuthorsProvider>
          <div className="container py-5">
            {children}
          </div>
        </AuthorsProvider>
      </body>
    </html>
  );
}