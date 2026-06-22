import React, { useState } from 'react';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: 'Wireless Headphones', price: 99 },
    { id: 2, name: 'Smart Watch', price: 149 },
    { id: 3, name: 'Mechanical Keyboard', price: 89 }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
        <h2>⚡ SwiftStore</h2>
        <h4>🛒 Cart: {cartCount} items</h4>
      </header>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => setCartCount(cartCount + 1)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
