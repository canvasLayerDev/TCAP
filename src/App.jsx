
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './Pages/About/About';
import Home from './Pages/Home/Home'
import Header from './Component/Header';
import Product from './Pages/Product/Product';
import Partner from './Pages/Partner/Partner';
import Contact from './Pages/Contact/Contact';
import Footer from './Component/Footer';
import Disclosure from './Component/Disclosure';
import Disclaimer from './Component/Disclaimer';
import Scroll_top from './Component/Scroll_top';
import Scroll_two from './Component/Scroll_two';
import Career from './Pages/Careers/Career';
import Loader from './Component/Loader';
import { useEffect, useState } from 'react';
import Chat_main from './Pages/Chat_boat/Chat_main';
// import Blog from './Pages/Blog/Blog';
import Chat_boat from './Pages/Chat_boat/Chat_boat';
import Chat_boat2 from './Pages/Chat_boat/Chat_boat2';
// import Consult_button from './Pages/Consultaion/Consult_button';
// import Consult_form from './Pages/Consultaion/Consult_form';
import Consult_main from './Pages/Consultaion/Consult_main';
import Blog_main from './Pages/Blog/Blog_main';
import BlogDetail from './Pages/Blog/Blog_detail';
import { HelmetProvider } from 'react-helmet-async';


// import Footer from './Component/Footer';



function App() {
    const [loading, setLoading] = useState(true);
    const [chatOpen, setChatOpen] = useState(false);
    const [consultOpen, setConsultOpen] = useState(false);

  useEffect(() => {
    // Show loader for 2.5 seconds
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Show loader first
    return <Loader />;
  }

  return (
    <>
    <HelmetProvider>
      <BrowserRouter>
      <Scroll_top/>
      <Scroll_two/>
      {/* <Consult_button/> */}
      {/* <Consult_form/> */}
      <Consult_main/>
      <Chat_main/>
        <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
             <Route path="/product" element={<Product/>}/>
             <Route path="/partner" element={<Partner/>}/>
             <Route path="/contact" element={<Contact/>}/>
             <Route path="/disclosure" element={<Disclosure/>}/>
             <Route path="/disclaimer" element={<Disclaimer/>}/>
             <Route path="/career" element={<Career/>}/>
             <Route path="/blog" element={<Blog_main/>}/>
             <Route path="/blog-detail/:id" element={<BlogDetail />} />
        </Routes>
         <Footer/>
      </BrowserRouter>
</HelmetProvider>
    {/* <Chat_boat onOpen={()=> setChatOpen(!chatOpen)} popupOpen={chatOpen}/>
      <Chat_boat2 open={chatOpen} setOpen={setChatOpen}/> */}

    {/* <ConsultationButton onOpen={() => setConsultOpen(true)}/>
      <ChatConsultation open={consultOpen} setOpen={setConsultOpen}/> */}

    </>
  );
}

export default App;
