import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Table from './components/Table';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {   
    const getCategory = async () => {
      let response = await fetch( 
        "https://grocery-price-checker.onrender.com/admin/category/api"
      );
      let data = await response.json();
      setCategories(data);
    }
    getCategory();
  }, []);


  return (
    <BrowserRouter>
      <Header categories={categories} setSelectedSubcategory={setSelectedSubcategory}/>
      <main className="container-fluid text-center p-4">
        <Search categories={categories} setSelectedSubcategory={setSelectedSubcategory} />
        <Routes>
          <Route
            index element={<Welcome />}
          />
          <Route
            path=":categoryName"
            element={ 
              <Table
                categories={categories}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
