import { TProduct } from "@/types/TProduct";
import client from "./client";

export const productsAPI = {
  fetchProducts: async (category: "male" | "female"): Promise<TProduct[]> => {
    try {
      const categories =
        category === "male"
          ? ["mens-shirts", "mens-shoes", "mens-watches"]
          : ["womens-bags", "womens-dresses", "womens-jewellery"];

      const results = await Promise.allSettled(
        categories.map(async (category) => {
          const response = await client({
            method: "get",
            url: `/products/category/${category}`,
          });
          return response.products;
        })
      );

      const allProducts = results
        .filter((result) => result.status === "fulfilled")
        .flatMap((result) => result.value);

      return allProducts;
    } catch (e) {
      console.log("Erro inesperado ao buscar produtos masculinos", e);
      throw new Error(String(e));
    }
  },
  findProductById: async (productId: number) => {
    return client({
      method: "get",
      url: `/products/${productId}`,
    });
  },
  createProduct: async (data: Partial<TProduct>): Promise<TProduct> => {
    return client({
      method: "post",
      url: "/products/add",
      data,
    });
  },
  updateProduct: async (data: Partial<TProduct>): Promise<TProduct> => {
    return client({
      method: "put",
      url: `/products/${data.id}`,
      data,
    });
  },
  deleteProduct: async (idProduct: number): Promise<TProduct> => {
    return client({
      method: "delete",
      url: `/products/${idProduct}`,
    });
  },
};
