import Home from "./pages/Home"
import './App.css';
import FarmerSignup from "./Components/FarmerSignup"

import CustomerSignup from "./Components/CustomerSignup"

import Navbar from "./Components/Navbar"
import HomeSection from "./Components/HomeSection"
import Footer from './Components/Footer'
import AddProduct from './Components/AddProduct'
import FarmerHomePage from './Components/FarmerHomePage'
import ProductDetails from './Components/ProductDetails'
import CustomerHomePage from './Components/CustomerHomePage'
import Cart from './Components/Cart'
import AddReview from "./Components/AddReview";
import UploadImages from "./Components/image-upload";



import { 
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FarmerAddress from "./Components/FarmerAddress";
import CustomerAddress from "./Components/CustomerAddress";
import AdminHomePage from "./Components/AdminHomePage";
import List from "./Components/List";
import About from "./Components/About";
import { useEffect } from "react";


 const App = () => {
  var cartId = sessionStorage.getItem("cartId");
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
      "type",
      "text/javascript"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    // <div className="App">
    //     <Home/>
    // </div>

    <BrowserRouter>
      
          {/* <ProductList/> */}
          <Navbar/>
    

          <Routes>
          {/* home page */}

            <Route exact path="/" element={<HomeSection/>} />

          {/* farmer */}
            {/* home page button -Link to farmer register */}
            <Route path="/farmer/register" element={<FarmerSignup/>}/>
            {/* after submitting register form - navigate to homesection - no Link */}
            <Route path="/farmer/register/submit" element={<HomeSection/>} />
            {/* after log in - navigate to FarmerHomepage - no Link */}
            <Route path="/farmer/farmerHome" element={<FarmerHomePage/>} />
            {/* add product button - Link to add product*/}
            <Route path="/farmer/farmerHome/addproduct" element={<AddProduct/>}/>
            {/* after adding product - navigate to farmer home page - no Link */}
            <Route path="/farmer/addproduct/submit" element={<FarmerHomePage/>} />
            {/* after clicking logout - navigate to homesection - no link */}
            <Route path="/farmer/farmerHome/logout" element={<HomeSection/>}/>

            <Route path="/farmer/products/:id" element={<FarmerHomePage/>} />

            <Route path="/product/update/:id" element={<AddProduct/>} />

            <Route path="/product/upload/" element={<UploadImages/>} />

            <Route path="/farmer/register/address" element={<FarmerAddress/>} />

            <Route path="/admin/login/" element={<AdminHomePage/>} />

            <Route path="/order/add/:product" element={<List/>} />




          {/* customer */}
            {/* home page button - customer register */}
            <Route path="/customer/register" element={<CustomerSignup/>} />
            {/* after submitting register form - navigate to homesection - no Link */}
            <Route path="/customer/register/submit" element={<HomeSection/>} />
            {/* after log in - navigate to FarmerHomepage - no Link */}
            <Route path="/customer/customerHome" element={<CustomerHomePage/>} />
            {/* after clicking on view product - link to product details */}
            <Route path="/product/get/:id" element={<ProductDetails/>} />
            {/* after add to cart - msg  */}
            {/* after clicking on cart - Link to cart */}

            <Route path="/customer/customerHome/cart" element={<Cart cartId={cartId}/>} />
            
            <Route path="/customer/register/address" element={<CustomerAddress/>} />

            <Route path="/product/:id" element={<AddReview/>} />

            <Route path="/about" element={<About/>} />


            

            
            
            
            
            {/* <Route path="/customer/" element={<CustomerSignup/>} />
            <Route path="/customer" element={<ProductDetails/>} /> */}
            {/* <Route path="/farmer/login" element={<FarmerSignup/>} /> */}
            {/* <Route path="/customer/register" element={<CustomerSignup/>} /> */}



          </Routes>
          
          <Footer />
  
    </BrowserRouter>



  );
}

export default App;
