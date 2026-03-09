
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthorForm from "../app/components/AuthorForm";

describe("AuthorForm", () => {
  test("renderiza los campos por label y el botón inicia deshabilitado", () => {
    render(<AuthorForm onAddAuthor={jest.fn()} />);

    const nameInput = screen.getByLabelText(/nombre/i);
    const birthDateInput = screen.getByLabelText(/fecha de nacimiento/i);
    const descriptionInput = screen.getByLabelText(/descripción/i);
    const imageInput = screen.getByLabelText(/url de imagen/i);
    const submitButton = screen.getByRole("button", { name: /crear autor/i });

    expect(nameInput).toBeInTheDocument();
    expect(birthDateInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test("deshabilita el botón con datos inválidos y errores en campos", async () => {
    const user = userEvent.setup();
    render(<AuthorForm onAddAuthor={jest.fn()} />);

    const nameInput = screen.getByLabelText(/nombre/i);
    const descriptionInput = screen.getByLabelText(/descripción/i);
    const imageInput = screen.getByLabelText(/url de imagen/i);
    const submitButton = screen.getByRole("button", { name: /crear autor/i });

    await user.type(nameInput, "ab");
    await user.tab();

    await user.type(descriptionInput, "corto");
    await user.tab();

    await user.type(imageInput, "foto");
    await user.tab();

    expect(screen.getByRole("alert", { name: /mínimo 3 caracteres/i })).toBeInTheDocument();
    expect(screen.getByRole("alert", { name: /mínimo 10 caracteres/i })).toBeInTheDocument();
    expect(screen.getByRole("alert", { name: /debe ser una url válida/i })).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test("quita errores y habilita el botón con datos válidos", async () => {
    const user = userEvent.setup();
    render(<AuthorForm onAddAuthor={jest.fn()} />);

    const nameInput = screen.getByLabelText(/nombre/i);
    const birthDateInput = screen.getByLabelText(/fecha de nacimiento/i);
    const descriptionInput = screen.getByLabelText(/descripción/i);
    const imageInput = screen.getByLabelText(/url de imagen/i);
    const submitButton = screen.getByRole("button", { name: /crear autor/i });

    await user.type(nameInput, "e");
    await user.tab();
    await user.type(descriptionInput, "jeje");
    await user.tab();
    await user.type(imageInput, "x");
    await user.tab();

    expect(screen.getByRole("alert", { name: /mínimo 3 caracteres/i })).toBeInTheDocument();
    expect(screen.getByRole("alert", { name: /mínimo 10 caracteres/i })).toBeInTheDocument();
    expect(screen.getByRole("alert", { name: /debe ser una url válida/i })).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await user.clear(nameInput);
    await user.type(nameInput, "Shakira");

    await user.type(birthDateInput, "1920-02-03");

    await user.clear(descriptionInput);
    await user.type(descriptionInput, "Autora colombiana muy famosa");

    await user.clear(imageInput);
    await user.type(imageInput, "https://shakira.com/jajaja.jpg");

    expect(screen.queryByRole("alert", { name: /mínimo 3 caracteres/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("alert", { name: /mínimo 10 caracteres/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("alert", { name: /debe ser una url válida/i })).not.toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });
});