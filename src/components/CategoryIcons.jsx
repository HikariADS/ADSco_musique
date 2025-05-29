import React from 'react';
import './CategoryIcons.css';
import guitar from '../assets/guitar1.webp';
import piano from '../assets/piano1.webp';
import drum from '../assets/drum1.webp';
import toy from '../assets/toy1.webp';

const categories = [
  { id: 1, name: 'Guitar & Bass', icon: guitar },
  { id: 2, name: 'Keyboard & Piano', icon: piano },
  { id: 3, name: 'Drums', icon: drum },
  { id: 4, name: 'Toys', icon: toy },
  { id: 5, name: 'Phụ Kiện', icon: toy },
  { id: 6, name: 'Microphone', icon: toy },
  { id: 7, name: 'DJ & Studio', icon: toy },
  { id: 8, name: 'Brand', icon: toy },
];

function CategoryIcons() {
  return (
    <section className="category-icons-block py-4">
      <div className="container">
        <div className="category-icons-row">
          {categories.map(cat => (
            <div key={cat.id} className="category-icon-item text-center">
              <div className="category-icon-img-wrap">
                <img src={cat.icon} alt={cat.name} className="category-icon-img" />
              </div>
              <div className="category-icon-name mt-2">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryIcons; 