import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const [filterData, setFilterData] = useState("All");


  async function getFetch() {
    const response = await axios.get("https://fakestoreapi.com/products");
    setProduct(response.data);
  }
  useEffect(() => {
    getFetch();
  }, []);
  const filter = (category) => {
    setFilterData(category);
   
  };
  const dataProducts =
    filterData === "All"
      ? product
      : product.filter((item) => item.category === filterData);
  return (
    <>
      <section>
        <div className="header_container">
          <div onClick={() => filter("All")}>All</div>
          <div onClick={() => filter("men's clothing")}>Men</div>
          <div onClick={() => filter("jewelery")}>Jewelery</div>
          <div onClick={() => filter("electronics")}>Electonics</div>
          <div onClick={() => filter("women's clothing")}>Women</div>
        </div>
      </section>
      <section className="card_container">
        {dataProducts.map((item) => (
          <div className="card" key={item.id}>
            <div className="image">
              <img src={item.image} alt="" />
            </div>
            <p>
              <span>Title: </span>
              {item.title}
            </p>
            <p>
              <span>Price: </span>
              {item.price}
            </p>
            <p>
              <span>Description: </span>
              {item.description.slice(0, 50)}
            </p>
            <h5>{item.category}</h5>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
