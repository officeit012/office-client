// Backend server URL obtained from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Get all categories
export const getCategories = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!res.ok) {
      throw new Error("Failed to create category");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Update an existing category
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!res.ok) {
      throw new Error("Failed to update category");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories/${categoryId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete category");
    }
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
