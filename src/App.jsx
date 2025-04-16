import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Table from './components/Table';
import Search from './components/Search';
import { useState, useEffect } from 'react';

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
    <>
      <Header categories={categories} setSelectedSubcategory={setSelectedSubcategory}/>
      <main className="container-fluid text-center">
        <Search categories={categories} setSelectedSubcategory={setSelectedSubcategory}/>
        {!selectedSubcategory && <Welcome />}
        <Table selectedSubcategory={selectedSubcategory}/>
      </main>
      <Footer />
    </>
  )
}

export default App;
