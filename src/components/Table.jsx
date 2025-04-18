import { useState, useEffect } from 'react';
import { useParams } from "react-router";


export default function Table({ categories, selectedSubcategory, setSelectedSubcategory, }) {
    const { categoryName } = useParams();
    const [groceries, setGroceries] = useState([]);

    // Fetch grocery data from backend API once when component mounts
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

    // Filter groceries by selected subcategory and sort by price per unit (ascending)
    const filteredGroceries = selectedSubcategory 
      ? groceries.filter((item) => item.category_id === selectedSubcategory._id).sort((a, b) => a.price_per_unit - b.price_per_unit)
        : [];
    
    const [acceptablePrice, setAcceptablePrice] = useState(null);

    // When category name from URL changes, update the selected subcategory
    useEffect(() => {
        if (
        categoryName &&
        (!selectedSubcategory || selectedSubcategory.name !== categoryName)
        ) {
        const found = categories.find((c) => c.name === categoryName);
        found && setSelectedSubcategory(found);
        }
    }, [categoryName, categories, selectedSubcategory, setSelectedSubcategory]);
  
    // Set the acceptable price as the highest price in the filtered groceries
    useEffect(() => {
        if (filteredGroceries.length > 0) {
            setAcceptablePrice(filteredGroceries[filteredGroceries.length - 1].price_per_unit);
        } else {
            setAcceptablePrice(null);
        }
    }, [filteredGroceries]);

    // States and logic for price per lb input
    const [pricelb, setPricelb] = useState("");
    const [unitlb, setUnitlb] = useState("");
    const computedPricePerUnitLb =
        pricelb && unitlb ? (parseFloat(pricelb) / parseFloat(unitlb)).toFixed(4) : "";
    const lbBgClass =
        computedPricePerUnitLb !== "" &&
        parseFloat(computedPricePerUnitLb) <= acceptablePrice
        ? "bg-success-subtle"
        : computedPricePerUnitLb > acceptablePrice
        ? "bg-danger-subtle"
        : "bg-info-subtle";
    
    // States and logic for price per kg input (converted to lb)
    const [pricekg, setPricekg] = useState("");
    const [unitkg, setUnitkg] = useState("");
    const computedPricePerUnitKg =
        pricekg && unitkg ? (parseFloat(pricekg) / (parseFloat(unitkg) * 2.2046)).toFixed(4) : "";  
    const kgBgClass =
        computedPricePerUnitKg !== "" &&
        parseFloat(computedPricePerUnitKg) <= acceptablePrice
        ? "bg-success-subtle"
        : computedPricePerUnitKg > acceptablePrice
        ? "bg-danger-subtle"
        : "bg-info-subtle";

    return (
        <>
            {selectedSubcategory && (
                <div className="container">
                    <h1 className="my-4">{selectedSubcategory.name.charAt(0).toUpperCase() + selectedSubcategory.name.slice(1)}</h1>
                    
                    {/* Grocery items table */}
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

                    {/* Price Calculation Section */}
                    <section className="container">
                        <h2 className="my-4 pt-2">Price Calculation</h2>

                        {/* Price Per Pound (lb) Calculator */}
                        <div className="my-4">
                            <h3>Price Per Pound (lb) / Individual Item:</h3>
                            <div className="input-group mb-3 flex-nowrap justify-content-center mx-auto">
                            <span className="input-group-text">Price</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="price"
                                aria-label="pricelb"
                                value={pricelb}
                                onChange={(e) => setPricelb(e.target.value)}
                            />

                            <span className="input-group-text">Unit</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="unit"
                                aria-label="unitlb"
                                value={unitlb}
                                onChange={(e) => setUnitlb(e.target.value)}
                            />
                            
                            <span className={`input-group-text text-center ${lbBgClass}`} id="priceperunitlb" style={{ width: "85px" }}>
                                ${computedPricePerUnitLb}
                            </span>
                            </div>
                        </div>

                        {/* Price Per Kilogram (converted to lb) Calculator */}
                        <div className="my-4">
                            <h3>Price per Kilogram (kg) – Converted to Pounds:</h3>
                            <div className="input-group mb-3 flex-nowrap justify-content-center mx-auto">
                            <span className="input-group-text">Price</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="price"
                                aria-label="pricekg"
                                value={pricekg}
                                onChange={(e) => setPricekg(e.target.value)}
                            />

                            <span className="input-group-text">Unit</span>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="unit"
                                aria-label="unitkg"
                                value={unitkg}
                                onChange={(e) => setUnitkg(e.target.value)}
                            />
                            
                            <span className={`input-group-text text-center ${kgBgClass}`} id="priceperunitkg" style={{ width: "85px" }}>
                                ${computedPricePerUnitKg}
                            </span>
                            </div>
                        </div>

                        {/* Price Meaning Legend */}
                        <div class="form-text d-flex justify-content-center">
                            <div className="d-inline-block text-start">
                                <p className="mb-0"><span className="bg-danger-subtle">$(price per unit)</span> means the price is unacceptable.</p>
                                <p><span className="bg-success-subtle">$(price per unit)</span> means the price is acceptable.</p>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    )
}