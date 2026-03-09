import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthorForm from "../app/components/AuthorForm";

describe("AuthorForm", () => {

  test("renderiza los campos del formulario", () => {
    render(<AuthorForm onAddAuthor={jest.fn()} />);

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de nacimiento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/URL de imagen/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Crear Autor/i })).toBeInTheDocument();
  });

  test("muestra errores si el formulario está vacío", async () => {
    const user = userEvent.setup();

    render(<AuthorForm onAddAuthor={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /Crear Autor/i }));

    expect(await screen.findByText(/El nombre es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/La fecha es obligatoria/i)).toBeInTheDocument();
    expect(await screen.findByText(/La descripción es obligatoria/i)).toBeInTheDocument();
    expect(await screen.findByText(/La imagen es obligatoria/i)).toBeInTheDocument();
  });

  test("envía el formulario correctamente", async () => {
    const user = userEvent.setup();
    const mockAddAuthor = jest.fn();

    render(<AuthorForm onAddAuthor={mockAddAuthor} />);

    await user.type(screen.getByLabelText(/Nombre/i), "Gabriel García Márquez");
    await user.type(screen.getByLabelText(/Descripción/i), "Escritor colombiano");
    await user.type(screen.getByLabelText(/URL de imagen/i), "https://foto.com/gabo.jpg");
    await user.type(screen.getByLabelText(/Fecha de nacimiento/i), "1927-03-06");

    await user.click(screen.getByRole("button", { name: /Crear Autor/i }));

    expect(mockAddAuthor).toHaveBeenCalledTimes(1);
  });

});