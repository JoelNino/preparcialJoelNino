import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>CRUD Autores</h1>
      <Link href="/authors">Ver autores</Link>
    </div>
  );
}