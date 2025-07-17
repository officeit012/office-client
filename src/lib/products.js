// Backend server URL obtained from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Get all products
export const getProducts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products/${productId}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      throw new Error("Failed to create product");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (productId, productData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) {
      throw new Error("Failed to update product");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products/${productId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete product");
    }
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async () => {
  try {
    const products = await getProducts();
    return products.filter((product) => product.featured === true);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};
