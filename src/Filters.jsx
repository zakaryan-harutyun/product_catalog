import React from "react";

const Filters = ({ setFilters }) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="filters">
            <h2>Filters</h2>
            <label>
                Category:
                <select name="category" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Clothing">Clothing</option>
                </select>
            </label>
            <label>
                Brand:
                <select name="brand" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Brand A">Brand A</option>
                    <option value="Brand B">Brand B</option>
                    <option value="Brand C">Brand C</option>
                    <option value="Brand D">Brand D</option>
                    <option value="Brand E">Brand E</option>
                </select>
            </label>
            <label>
                Price Range:
                <input
                    type="range"
                    min="0"
                    max="500"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            priceRange: [0, e.target.value],
                        }))
                    }
                />
            </label>
            <label>
                Rating:
                <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            rating: e.target.value,
                        }))
                    }
                />
            </label>
        </div>
    );
};

export default Filters;
