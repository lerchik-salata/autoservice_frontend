import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Header} from "./components/Header/Header.tsx";
import {Home} from "./pages/Home/Home.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {Shop} from "./pages/Shop/Shop.tsx";
import {Contact} from "./pages/Contact/Contact.tsx";

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
                  </Routes>
              </main>
              <Footer/>
          </Router>
      </>
  )
}

export default App