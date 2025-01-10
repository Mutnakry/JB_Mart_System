// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const addItem = (item) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

//       if (existingItem) {
//         const newQuantity = existingItem.quantity + 1;

//         // Check for stock availability
//         if (newQuantity > item.qty) {
//           toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
//             position: "top-right",
//             autoClose: 1000,
//           });
//           return prevCart; // Return current cart if out of stock
//         }

//         // Add to cart if stock is available
//         toast.success(`${item.pro_names} បានបញ្ចូលទៅក្នុងកន្រ្តក!`, {
//           position: "top-right",
//           autoClose: 1000,
//         });
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
//         );
//       } else {
//         // New item
//         if (item.quantity > item.qty) {
//           toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
//             position: "top-right",
//             autoClose: 1000,
//           });
//           return prevCart; // Return current cart if out of stock
//         }

//         // Add to cart if stock is available
//         toast.success(`${item.pro_names} បានបញ្ចូលទៅក្នុងកន្រ្តក!`, {
//           position: "top-right",
//           autoClose: 1000,
//         });
//         return [...prevCart, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   const updateQuantity = (id, quantity) => {
//     setCart((prevCart) => {
//         const item = prevCart.find((item) => item.id === id);
//         if (item) {
//             if (quantity > item.qty) {
//                 toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
//                     position: "top-right",
//                     autoClose: 1000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                 });
//                 return prevCart;
//             } else if (quantity <= 0) {
//                 return prevCart.filter((item) => item.id !== id);
//             } else {
//                 return prevCart.map((item) =>
//                     item.id === id ? { ...item, quantity } : item
//                 );
//             }
//         }
//         return prevCart;
//     });
// };


//   const removeItem = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//   return (
//     <CartContext.Provider value={{ cart, addItem, updateQuantity, removeItem, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };








import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [heldOrders, setHeldOrders] = useState([]); // Add state to hold held orders

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedOrders = localStorage.getItem('heldOrders');
    if (savedOrders) {
      setHeldOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart and held orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('heldOrders', JSON.stringify(heldOrders));
  }, [heldOrders]);

  const addItem = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;

        // Check for stock availability
        if (newQuantity > item.qty) {
          toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
            position: "top-right",
            autoClose: 1000,
          });
          return prevCart; // Return current cart if out of stock
        }

        toast.success(`${item.pro_names} បានបញ្ចូលទៅក្នុងកន្រ្តក!`, {
          position: "top-right",
          autoClose: 1000,
        });
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
        );
      } else {
        if (item.quantity > item.qty) {
          toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
            position: "top-right",
            autoClose: 1000,
          });
          return prevCart; // Return current cart if out of stock
        }

        toast.success(`${item.pro_names} បានបញ្ចូលទៅក្នុងកន្រ្តក!`, {
          position: "top-right",
          autoClose: 1000,
        });
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id);
      if (item) {
        if (quantity > item.qty) {
          toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return prevCart;
        } else if (quantity <= 0) {
          return prevCart.filter((item) => item.id !== id);
        } else {
          return prevCart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
        }
      }
      return prevCart;
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const restoreHeldOrder = (order) => {
    setCart(order.cartItems);
    setHeldOrders((prevHeldOrders) =>
      prevHeldOrders.filter((o) => o.id !== order.id)
    );
  };

  const holdOrder1 = () => {
    if (cart.length === 0) {
      toast.error('No items in cart to hold!');
      return;
    }

    // Save the current cart as a held order
    const orderToHold = {
      id: new Date().getTime(),
      cartItems: cart,
      date: new Date().toLocaleString()
    };

    setHeldOrders([...heldOrders, orderToHold]);
    clearCart(); // Clear the cart after holding the order
    toast.success('Order held successfully!');
  };

  // CartContext.js

  const holdOrder = () => {
    if (cart.length === 0) {
      toast.error('No items in cart to hold!', {
        position: "top-center",
        autoClose: 500,
      });
      return;
    }

    const orderToHold = {
      id: new Date().getTime(), 
      cartItems: cart,
      date: new Date().toLocaleString()
    };

    setHeldOrders((prevHeldOrders) => [...prevHeldOrders, orderToHold]);
    clearCart();
    toast.success('Order held successfully!', {
      position: "top-center",
      autoClose: 1000,
    });
  };

  // CartContext.js

  const ClearHold = () => {
    setHeldOrders([]); // Clears all held orders
    toast.success('All held orders have been cleared!', {
      position: "top-center",
      autoClose: 1000,
    });
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        heldOrders,
        ClearHold,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        holdOrder,
        restoreHeldOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
