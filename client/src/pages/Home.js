import React from "react";

import Cart from "../components/Cart";
import Menu from "../components/Menu";

const Home = () => {
  return (
    <div className="container">
      <Menu />
      <Cart />
    </div>
  );
};

export default Home;