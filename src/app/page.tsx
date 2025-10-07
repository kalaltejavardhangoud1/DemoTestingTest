'use client';

import { useState, useEffect } from 'react';

// Product type
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Cart item type
interface CartItem extends Product {
  quantity: number;
}

// Mock products data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Sauce Labs Backpack',
    price: 29.99,
    image: '🎒',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
  },
  {
    id: 2,
    name: 'Sauce Labs Bike Light',
    price: 9.99,
    image: '🚴',
    description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night.'
  },
  {
    id: 3,
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
    image: '👕',
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt.'
  },
  {
    id: 4,
    name: 'Sauce Labs Fleece Jacket',
    price: 49.99,
    image: '🧥',
    description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything.'
  },
  {
    id: 5,
    name: 'Sauce Labs Onesie',
    price: 7.99,
    image: '👶',
    description: 'Rib snap infant onesie for the junior automation engineer in development.'
  },
  {
    id: 6,
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: 15.99,
    image: '👔',
    description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests.'
  }
];

export default function EcommerceSite() {
  const [page, setPage] = useState<'login' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'complete'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortOrder, setSortOrder] = useState('name-asc');
  
  // Checkout form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Get sorted products
  const getSortedProducts = () => {
    const sorted = [...PRODUCTS];
    switch (sortOrder) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  // Login handler
  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setPage('products');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage('login');
    setCart([]);
    setUsername('');
    setPassword('');
  };

  // Add to cart
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Complete checkout
  const handleCheckout = () => {
    if (firstName && lastName && zipCode) {
      setPage('complete');
    }
  };

  // Header Component
  const Header = () => (
    <header className="bg-white border-b-2 border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {isLoggedIn && page !== 'login' && (
              <button
                onClick={() => setPage('products')}
                className="text-2xl hover:opacity-70 transition"
              >
                ☰
              </button>
            )}
            <h1 className="text-3xl font-bold text-gray-800">Test Metiuclous DEMo</h1>
          </div>
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPage('cart')}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition"
              >
                🛒
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );

  // Login Page
  if (page === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="standard_user"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="secret_sauce"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 font-semibold mb-2">Accepted usernames:</p>
              <p className="text-xs text-gray-600">Teja</p>
              <p className="text-xs text-gray-600">Tester</p>
              <p className="text-xs text-gray-600">TesterTesting</p>
              <p className="text-xs text-gray-600 mt-2"><strong>Password:</strong>Teja@Test</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Products Page (PLP)
  if (page === 'products') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="name-asc">Name (A to Z)</option>
              <option value="name-desc">Name (Z to A)</option>
              <option value="price-asc">Price (low to high)</option>
              <option value="price-desc">Price (high to low)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getSortedProducts().map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setPage('product-detail');
                }}
              >
                <div className="p-6 text-center bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="text-8xl mb-4">{product.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                    <div className="space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Product Detail Page (PDP)
  if (page === 'product-detail' && selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => setPage('products')}
            className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            ← Back to Products
          </button>
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-12 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-9xl">{selectedProduct.image}</div>
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedProduct.name}</h1>
                <p className="text-gray-600 mb-6 leading-relaxed">{selectedProduct.description}</p>
                <div className="text-4xl font-bold text-gray-800 mb-8">${selectedProduct.price.toFixed(2)}</div>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setPage('products');
                  }}
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cart Page
  if (page === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => setPage('products')}
            className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            ← Continue Shopping
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h2>
          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-xl text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-6">
                      <div className="text-6xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                        <p className="text-xl font-semibold text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t-2 pt-2 mt-2">
                      <div className="flex justify-between text-xl font-bold text-gray-800">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPage('checkout')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Checkout Page
  if (page === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => setPage('cart')}
            className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            ← Back to Cart
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Checkout: Your Information</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip/Postal Code
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="12345"
                  required
                />
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-600">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t-2 pt-2 mt-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-800 mt-2">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Order Complete Page
  if (page === 'complete') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-12 text-center">
            <div className="text-8xl mb-6">✅</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Thank you for your order!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Your order has been dispatched, and will arrive just as fast as the pony can get there!
            </p>
            <button
              onClick={() => {
                setCart([]);
                setPage('products');
                setFirstName('');
                setLastName('');
                setZipCode('');
              }}
              className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}