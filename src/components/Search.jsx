import { useState } from 'react';
import { useNavigate } from "react-router";

export default function Search({ categories, setSelectedSubcategory }) {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const searchCategories = categories.filter(each => each.parent_category_id !== null);

    // Function to handle search button click
    const handleSearch = (event) => {
        event.preventDefault();
        const selectedCategory = searchCategories.find(category => category.name === inputValue);
        if (selectedCategory) {
            setSelectedSubcategory(selectedCategory);
            navigate(`/${subcat.name}`);
            setInputValue("");
        } else {
            console.log("No matching category found.");
        }
    }

    return (
        <div id="search" className="d-flex justify-content-end align-items-center pt-4">
            {/* Input field with autocomplete (datalist) for subcategory names */}
            <input
                type="text"
                list="itemList"
                id="searchOption"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="form-control d-inline w-auto me-2"
            />

            {/* Autocomplete options rendered from subcategories */}
            <datalist id="itemList">
                {searchCategories.map((category) => (
                    <option key={category._id} value={category.name} />
                ))}
            </datalist>
            
            <button id="searchButton" onClick={handleSearch} className="btn btn-warning text-white">
                Search
            </button>
        </div>
    );
}
