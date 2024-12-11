import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Header} from "./components/common/Header/Header.tsx";
import {Home} from "./pages/Home/Home.tsx";
import {Footer} from "./components/common/Footer/Footer.tsx";
import {Shop} from "./pages/Shop/Shop.tsx";
import {Contact} from "./pages/Contact/Contact.tsx";
import {Login} from "./pages/Login/Login.tsx";
import {Profile} from "./pages/Profile/Profile.tsx";
import AdminPage from "./pages/Admin/AdminPage.tsx";
import {Settings} from "./pages/Profile/Settings/Settings.tsx";
import {Orders} from "./pages/Profile/Orders/Orders.tsx";
import {Repairs} from "./pages/Profile/Repairs/Repairs.tsx";
import {ProductPage} from "./pages/Product/ProductPage.tsx";

function App() {

  return (
      <>
          <Router>
              <Header/>
              <main>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Login />} />
                      <Route path="/profile/*" element={<Profile />}>
                          <Route path="settings" element={<Settings />} />
                          <Route path="orders" element={<Orders />} />
                          <Route path="repairs" element={<Repairs />} />
                      </Route>
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="/products/:id" element={<ProductPage />} />
                  </Routes>
              </main>
              <Footer/>
          </Router>
      </>
  )
}

export default App
