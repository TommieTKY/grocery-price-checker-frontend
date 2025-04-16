import { useState, useEffect } from 'react';

export default function Table({ selectedSubcategory }) {
    const [groceries, setGroceries] = useState([]);

    useEffect(() => {   
    const getGroceries = async () => {
      let response = await fetch( 
          "https://grocery-price-checker.onrender.com/admin/grocery/api"
      );
      let data = await response.json();
      setGroceries(data);
    }
    getGroceries();
    }, []);

    const filteredGroceries = selectedSubcategory 
      ? groceries.filter((item) => item.category_id === selectedSubcategory._id)
      : [];

    return (
        <>
            {selectedSubcategory && (
                <div className="container">
                    <h1 className="my-4">{selectedSubcategory.name.charAt(0).toUpperCase() + selectedSubcategory.name.slice(1)}</h1>
                    <table className="table table-striped table-bordered table-sm w-auto mx-auto fs-5">
                        <thead>
                        <tr>
                            <th>Store</th>
                            <th>Price</th>
                            <th>Unit(lb)</th>
                            <th>Price/Unit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredGroceries.map(item => (
                            <tr key={item._id}>
                            <td>{item.store}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>{item.unit}</td>
                            <td>${item.price_per_unit.toFixed(4)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}