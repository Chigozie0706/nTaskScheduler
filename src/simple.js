// import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createProduct(product) {
  product.id = "2";
  product.price = parseNearAmount(product.price + "");
  return window.contract.setProduct({ product }); // set_product for the Rust contract
}

export function getProducts() {
  return window.contract.getProducts(); // get_products for the Rust contract
}