import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store"; // replace with mock store
import { AuthProvider } from "../../custom-hooks/useAuth";
import { render, screen } from '@testing-library/react';
import Login from ".";

describe("Login", () => {
    test("renders Login", () => {
        render(<BrowserRouter><Provider store={store}><AuthProvider><Login /></AuthProvider></Provider></BrowserRouter>);
        expect(screen.getByText("Log in")).toBeDefined();
        // we could write more test cases. This is just an example
    });
});