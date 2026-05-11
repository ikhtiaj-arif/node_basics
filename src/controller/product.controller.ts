import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.types";
import { parseBody } from "../utils/parseBody";

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
    // const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrieved successfully",
        data: { count: products.length, result: products },
      }),
    );
  } else if (id !== null && method === "GET") {
    // get single product
    // const products = readProduct();
    res.writeHead(200, { "content-type": "application/json" });

    const product = products.find((p: IProduct) => p.id === id);
    // console.log(product);
    res.end(
      JSON.stringify({
        message: "Product retrieved successfully",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    products.push(newProduct);
    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products created successfully",
        data: newProduct,
      }),
    );
  }
  //get one /product/1
};
