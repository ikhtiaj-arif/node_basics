import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.types";
import { parseBody } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const products = readProduct();

  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  //   console.log("Request", req);

  //get all product
  if (url === "/products" && method === "GET") {
    try {
      return sendResponse(res, 200, true, "Products retrieved successfully", {
        count: products.length,
        result: products,
      });
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  } else if (id !== null && method === "GET") {
    // get single product
    // const products = readProduct();

    const product = products.find((p: IProduct) => p.id === id);
    if (!product) {
      return sendResponse(res, 404, false, "Product not found!");
    }

    try {
      return sendResponse(
        res,
        200,
        true,
        "Product retrieved successfully",
        product,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    products.push(newProduct);
    insertProduct(products);
    try {
      return sendResponse(
        res,
        200,
        true,
        "Products created successfully",
        newProduct,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const index = products.findIndex((p: IProduct) => p.id === id);
    //    console.log(index);
    if (index < 0) {
      return sendResponse(res, 404, false, "Product not found!");
    }

    products[index] = { id: products[index].id, ...body };

    insertProduct(products);

    try {
      return sendResponse(
        res,
        201,
        true,
        "Products updated successfully",
        products[index],
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  } else if (method === "DELETE" && id !== null) {
    const index = products.find((p: IProduct) => p.id === id);
    if (index < 0) {
      return sendResponse(res, 404, false, "Product not found!");
    }
    products.splice(index, 1);
    insertProduct(products);

    try {
      return sendResponse(res, 200, true, "Product deleted successfully");
    } catch (error) {
      return sendResponse(res, 500, false, "Something went wrong", error);
    }
  }
};
