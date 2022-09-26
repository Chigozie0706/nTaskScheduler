import React, { useEffect, useState, useCallback } from "react";
// import { toast } from "react-toastify";
import AddProduct from "./AddProduct";
import Product from "./Products";
import { Row } from "react-bootstrap";
import {
  getProducts as getProductList,
  createProduct,
} from "../simple";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setProducts(await getProductList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  console.log(products)



const addProduct = async (data) => {
  try {
    setLoading(true);
    createProduct(data).then((resp) => {
       console.log(resp)
      // getProducts();
    });
    // toast(<NotificationSuccess text="Product added successfully." />);
  } catch (error) {
    console.log({ error });
    // toast(<NotificationError text="Failed to create a product." />);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getProducts();
}, []);


return (
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Street Food</h1>
            <AddProduct save={addProduct} />
          </div>
          )
}

export default Products;