import { useNavigate } from "react-router";

export default function Header({ setSelectedSubcategory, categories }) {
  const navigate = useNavigate();

  const menuCategories = categories.filter(each => each.parent_category_id === null);

  // Create a map of parent category ID to its subcategories
  const subCategoryMap = categories.reduce((acc, category) => {
    if (category.parent_category_id) {
      (acc[category.parent_category_id] ||= []).push(category);
    }
    return acc;
  }, {});

  // Handle user click on a subcategory from the dropdown
  const handleDropdownItemClick = (subcat) => {
    setSelectedSubcategory(subcat);
    navigate(`/${subcat.name}`);

    // Close the Bootstrap offcanvas menu (if open)
    const navOffcanvas = document.getElementById("offcanvasNavbar");
    window.bootstrap?.Offcanvas.getInstance(navOffcanvas)?.hide();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg py-2 bg-light shadow">
        <div className="container-fluid flex-nowrap">
          {/* Brand Name (Click resets subcategory and navigates home) */}
          <a
            className="navbar-brand fs-3 textcolor fw-semibold"
            href="/"
            onClick={() => { setSelectedSubcategory(null); navigate('/'); }}
          >
            Tommie's Grocery Price Checker
          </a>

          {/* Admin link button (leads to backend admin panel) */}
          <div className="d-flex">
            <a
              className="btn btn-warning text-white btn-responsive"
              href="https://grocery-price-checker.onrender.com/"
              role="button"
            >
              Admin
            </a>
          </div>

          {/* Toggle button for mobile navbar (Bootstrap offcanvas) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Offcanvas menu for smaller screens */}
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                {/* Loop through top-level categories */}
                {menuCategories.map((category) => (
                  <li key={category._id} className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle textcolor fw-semibold"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {category.name.charAt(0).toUpperCase() +
                        category.name.slice(1)}
                    </a>

                    {/* Dropdown list of subcategories */}
                    <ul className="dropdown-menu">
                      {(subCategoryMap[category._id] || []).map((subcat) => (
                        <li key={subcat._id}>
                          <button
                            className="dropdown-item textcolor fw-medium"
                            onClick={() => handleDropdownItemClick(subcat)}
                          >
                            {subcat.name.charAt(0).toUpperCase() +
                              subcat.name.slice(1)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
