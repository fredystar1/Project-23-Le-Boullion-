import { useState } from "react";
import Navbar from "./components/Navbar";
import ShopGrid from "./components/ShopGrid";

function App() {
  return (
    <>
      <Navbar />
      <h1 className="flex justify-center text-5xl">Hero Text!</h1>
      <ShopGrid />
    </>
  );
}

export default App;
