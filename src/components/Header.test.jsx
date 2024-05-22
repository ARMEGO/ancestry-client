import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../custom-hooks/useAuth";
import { render, screen } from '@testing-library/react';
import Header from "./Header";

describe("Header", () => {
    test("renders Header", () => {
        render(<BrowserRouter><AuthProvider><Header /></AuthProvider></BrowserRouter>);
        expect(screen.getByText("Ancestry")).toBeDefined();
    });
});