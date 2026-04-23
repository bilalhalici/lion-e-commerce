import { screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { renderWithProviders } from "../../../utils/test/test.utils";
import Navigation from "../navigation.component";
import { signOutStart } from "../../../store/user/user.action";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Navigation tests", () => {
  test('It should render a Sing in link and Sing out link if there is no currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    const navigationElement = screen.getByText(/sign in/i);
    expect(navigationElement).toBeInTheDocument();

    const signOutElement = screen.queryByText(/sign out/i);
    expect(signOutElement).toBeNull();
  });

  test('It should render Sing out link and not Sing in link if there is a currentUser', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {}
        },
      },
    });

    const signOutElement = screen.getByText(/sign out/i);
    expect(signOutElement).toBeInTheDocument();

    const signInElement = screen.queryByText(/sign in/i);
    expect(signInElement).toBeNull();
  });

  test('it should render a cart dropdown if isCartOpen is false', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: []
        },
      },
    });

    const dropdownTextElement = screen.queryByText(/your cart is empty!/i);
    expect(dropdownTextElement).toBeNull();
  });

  test('it should render a cart dropdown if isCartOpen is true', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: []
        },
      },
    });

    const dropdownTextElement = screen.queryByText(/your cart is empty!/i);
    expect(dropdownTextElement).toBeInTheDocument();
  });

  test('it should dispatch signOutStart action when clicking on the Sign Out link', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {}
        },
      },
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();
    fireEvent.click(signOutLinkElement);

    expect(mockDispatch).toHaveBeenCalled();
    const signOutAction = signOutStart();
    expect(mockDispatch).toHaveBeenCalledWith(signOutAction);

    mockDispatch.mockClear();
  });
});