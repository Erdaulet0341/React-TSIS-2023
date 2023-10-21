import "./App.css";
import Top from "./components/header/Top";
import { Route, Routes } from "react-router-dom";
import NewProducts from "./components/products/newProducts/NewProducts";
import TopProducts from "./components/products/topProducts/TopProducts";
import Categories from "./components/products/categories/Categories";
import Welcome from "./components/welcomePage/Welcome";
import Footer from "./components/footer/Footer";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import AllProducts from "./components/products/listOfProducts/AllProducts";


function App() {
  return (
    <div className="App">
      <Top />
      <div className="container">
        <Routes>
          <Route path="/" element = {<Welcome/>} index={true}/>
          <Route path="/new-products" element = {<NewProducts/>}/>
          <Route path="/top-products" element = {<TopProducts/>}/>
          <Route path="/categories" element = {<Categories/>}/>
          <Route path="/seller-registration" element = {<Registration type="Seller" regType="company_name" labell="Company name" placee="Freedom Mobile"/>}/>
          <Route path="/client-registration" element = {<Registration type="Client" regType="city" labell="City" placee="Almaty"/>}/>
          <Route path="/login-client" element = {<Login type="client" />}/>
          <Route path="/login-seller" element = {<Login type="seller" />}/>
          <Route path="/list-of-products" element = {<AllProducts/>}/>

        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
