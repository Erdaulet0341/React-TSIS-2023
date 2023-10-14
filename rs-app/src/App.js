import "./App.css";
import Top from "./components/header/Top";
import { Route, Routes } from "react-router-dom";
import NewProducts from "./components/products/new_products/NewProducts";
import TopProducts from "./components/products/top_products/TopProducts";
import Categories from "./components/products/categories/Categories";
import Welcome from "./components/welcomePage/Welcome";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Top />
      <div className="container">
        <Routes>
          <Route path="/welcome" element = {<Welcome/>}/>
          <Route path="/new-products" element = {<NewProducts/>}/>
          <Route path="/top-products" element = {<TopProducts/>}/>
          <Route path="/categories" element = {<Categories/>}/>

        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
