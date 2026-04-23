import { screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Category from "../category.component";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    category: 'mens',
  }),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Category tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("It should render a Spinner if isLoading is true", () => {
    useSelector
      .mockReturnValueOnce({})
      .mockReturnValueOnce(true);

    renderWithProviders(<Category />);

    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });


  test("It should render products if isLoading is false and there are items present", () => {
    useSelector
      .mockReturnValueOnce({
        mens: [
          { id: 1, name: "Product 1", imageUrl: "test1", price: 10 },
          { id: 2, name: "Product 2", imageUrl: "test2", price: 20 },
        ]
      })
      .mockReturnValueOnce(false);

    renderWithProviders(<Category />);

    const spinnerElement = screen.queryByTestId("spinner");
    expect(spinnerElement).toBeNull();

    const product1Element = screen.getByText(/product 1/i);
    expect(product1Element).toBeInTheDocument();
  });
  
});