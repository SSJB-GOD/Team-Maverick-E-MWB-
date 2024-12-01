import React from "react";

const categories = [
  "Self help",
  "Reducing stress",
  "Anxiety",
  "Panic attacks",
  "Breathing exercises",
  "Stretching",
  "Calm music",
  "Meditation",
];
function Categories({ onCategoryClick }) {
  return (
    <div className="body">
      <div id="categories" className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className="category-button"
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
