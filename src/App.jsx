import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";

import "./App.css";

function FilterableProductTable() {
  const products = [
    {
      category: "Sporting Goods",
      price: "$49.99",
      stocked: true,
      name: "Football",
    },
    {
      category: "Sporting Goods",
      price: "$9.99",
      stocked: true,
      name: "Baseball",
    },
    {
      category: "Sporting Goods",
      price: "$29.99",
      stocked: false,
      name: "Basketball",
    },
    {
      category: "Electronics",
      price: "$99.99",
      stocked: true,
      name: "iPod Touch",
    },
    {
      category: "Electronics",
      price: "$399.99",
      stocked: false,
      name: "iPhone 5",
    },
    {
      category: "Electronics",
      price: "$199.99",
      stocked: true,
      name: "Nexus 7",
    },
  ];

  const set = new Set();
  products.forEach((item) => set.add(item.category));

  const category = Array.from(set);

  const [inStocked, setStocked] = useState(true);
  const [seachString, setseachString] = useState("");

  function seachInProducts(e) {
    setseachString(e.target.value);
  }

  function toggleInStock() {
    setStocked(!inStocked);
  }

  function filterProducts() {
    if (seachString === "") {
      let [...filteredProducts] = products;
      return filteredProducts;
    } else {
      let filteredProducts = [];
      products.forEach((product) => {
        if (product.name.indexOf(seachString) > -1) {
          filteredProducts.push(product);
        }
      });
      return filteredProducts;
    }
  }

  return (
    <div className="filterableProductTable">
      <SeachBar isChecked={toggleInStock} onSeach={seachInProducts} />
      <ProductTable
        category={category}
        products={filterProducts()}
        inStocked={inStocked}
      />
    </div>
  );
}

function SeachBar(props) {
  function handleChange(e) {
    props.onSeach(e);
  }

  function handleCheck() {
    props.isChecked();
  }
  return (
    <div className="seachBar">
      <form className="seachBar-form">
        <div className="seachBar-input">
          <input type="text" placeholder="Seach..." onChange={handleChange} />
        </div>
        <div className="seachBar-input">
          <label>
            <input type="checkbox" onClick={handleCheck} />
            Only show products in stock
          </label>
        </div>
      </form>
    </div>
  );
}

function ProductTable(props) {
  return (
    <div className="productTable">
      <div className="productTable-header">
        <div className="productTable-header-cell">Name</div>
        <div className="productTable-header-cell">Price</div>
      </div>
      <ProductCategoryRow
        category={props.category}
        products={props.products}
        inStocked={props.inStocked}
      />
    </div>
  );
}

function ProductCategoryRow(props) {
  const categoryRow = props.category.map((item, index) => {
    return (
      <Fragment key={index}>
        <div className="productCategoryRow-row">{item}</div>
        <ProductRow
          category={item}
          products={props.products}
          inStocked={props.inStocked}
        />
      </Fragment>
    );
  });
  return <div className="productCategoryRow">{categoryRow}</div>;
}

function ProductRow(props) {
  let isStocked = "";
  let inStocked = "";
  const prodactRow = props.products.map((item, index) => {
    if (props.category === item.category) {
      if (item.stocked) {
        isStocked = "";
        inStocked = "";
      } else {
        isStocked = " noStocked";
        inStocked = props.inStocked ? "" : " inStocked";
      }
      return (
        <div className={`productRow${isStocked}${inStocked}`} key={index}>
          <div className={"productRow-cell"}>{item.name}</div>
          <div className={"productRow-cell"}>{item.price}</div>
        </div>
      );
    }
    return null;
  });
  return <Fragment>{prodactRow}</Fragment>;
}

function App() {
  return (
    <div className="App">
      <FilterableProductTable />
    </div>
  );
}

export default App;
