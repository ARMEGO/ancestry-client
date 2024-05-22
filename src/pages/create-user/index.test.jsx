import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store"; // replace with mock store
import { AuthProvider } from "../../custom-hooks/useAuth";
import { render, screen } from '@testing-library/react';
import CreateUser from ".";

describe("CreateUser", () => {
    test("renders CreateUser", () => {
        render(<BrowserRouter><Provider store={store}><AuthProvider><CreateUser /></AuthProvider></Provider></BrowserRouter>);
        expect(screen.getByText("Create user")).toBeDefined();
        // we could write more test cases. This is just an example
    });
});