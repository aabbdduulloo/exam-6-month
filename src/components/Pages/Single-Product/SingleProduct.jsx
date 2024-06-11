import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleProduct.css";

function SingleProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [pro, setPro] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setPro(res.data));
  }, [id]);

  return (
    <>
      <div className="product">
        <div className="image">
          {" "}
          <img src={pro?.image} alt="" />
        </div>
        <div className="text">
          <h4>{pro?.title}</h4>
          <p>{pro?.price}</p>
          <p>{pro?.category}</p>
          <p>{pro?.description}</p>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
