import { render, screen } from '@testing-library/react';
import Image from "./Image";

describe("Image", () => {
    test("renders Image", () => {
        render(<Image path="abc" />);
        expect(screen.getByAltText("abc")).toBeDefined();
    });
});