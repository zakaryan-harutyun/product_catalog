import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("Product Catalog", () => {
  test("renders product catalog title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Product Catalog/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("shows no products found message when filters yield no results", async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Category:/i), {
      target: { value: "Clothing" },
    });
    await waitFor(() => {
      expect(screen.getByText(/No products found/i)).toBeInTheDocument();
    });
  });

  test("filters products by category", async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Category:/i), {
      target: { value: "Electronics" },
    });
    await waitFor(() => {
      const productsDisplayed = screen.getAllByText(/Wireless Headphones|Bluetooth Speaker|Smartphone/i);
      expect(productsDisplayed).toHaveLength(3);
    });
  });

  test("filters products by brand", async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Brand:/i), {
      target: { value: "Brand A" },
    });
    await waitFor(() => {
      expect(screen.getByText(/Wireless Headphones/i)).toBeInTheDocument();
      expect(screen.queryByText(/Bluetooth Speaker/i)).toBeNull();
    });
  });

  test("filters products by price range", async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Price Range:/i), {
      target: { value: "100" },
    });
    await waitFor(() => {
      expect(screen.getByText(/Wireless Headphones/i)).toBeInTheDocument();
    });
  });

  test("shows loading spinner while filtering", async () => {
    jest.useFakeTimers();
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Category:/i), {
      target: { value: "Electronics" },
    });
    jest.advanceTimersByTime(300);
    expect(screen.queryByText(/Loading/i)).toBeInTheDocument();
    jest.runAllTimers();
  });
});
