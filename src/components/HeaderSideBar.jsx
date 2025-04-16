export default function HeaderSideBar({ setSelectedSubcategory, categories }) {
  const menuCategories = categories.filter(each => each.parent_category_id === null);
  const subCategoryMap = categories.reduce((acc, category) => {
    if (category.parent_category_id) {
      if (!acc[category.parent_category_id]) {
        acc[category.parent_category_id] = [];
      }
      acc[category.parent_category_id].push(category);
    }
    return acc;
  }, {});

  const handleDropdownItemClick = (subcat) => {
    setSelectedSubcategory(subcat);
    const navCollapse = document.getElementById("navbarNavDropdown");
    // Get the collapse instance from Bootstrap
    const bsCollapse = window.bootstrap?.Collapse.getInstance(navCollapse);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-sm px-1 py-2 bg-light shadow">
        <div className="container-fluid flex-nowrap">
          <a
            className="navbar-brand fs-3 textcolor fw-semibold"
            href="#"
            onClick={() => setSelectedSubcategory(null)}
          >
            Tommie's Grocery Price Checker
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul className="navbar-nav ms-auto">
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
                    <ul className="dropdown-menu">
                      {(subCategoryMap[category._id] || []).map((subcat) => (
                        <li key={subcat._id}>
                          <a
                            className="dropdown-item textcolor fw-medium"
                            href="#"
                            onClick={() => handleDropdownItemClick(subcat)}
                          >
                            {subcat.name.charAt(0).toUpperCase() +
                              subcat.name.slice(1)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="d-flex">
            <a
              className="btn btn-warning text-white"
              href="https://grocery-price-checker.onrender.com/"
              role="button"
            >
              Admin
            </a>
          </div>
          
        </div>
      </nav>
    </header>
  );
}
