import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.types";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  console.log(id);

  //get all product
  if (url === "/products" && method === "GET") {
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrieved successfully",
        data: products,
      }),
    );
  } else if (id !== null && method === "GET") { // get single product
    const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });

    const product = products.find((p: IProduct) => p.id === id);
    // console.log(product);
    res.end(
      JSON.stringify({
        message: "Product retrieved successfully",
        data: product,
      }),
    );
  }
  //get one /product/1
};
