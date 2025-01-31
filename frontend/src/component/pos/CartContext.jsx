
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [heldOrders, setHeldOrders] = useState([]); // Add state to hold held orders

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }

//     const savedOrders = localStorage.getItem('heldOrders');
//     if (savedOrders) {
//       setHeldOrders(JSON.parse(savedOrders));
//     }
//   }, []);

//   // Save cart and held orders to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   useEffect(() => {
//     localStorage.setItem('heldOrders', JSON.stringify(heldOrders));
//   }, [heldOrders]);

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

//         toast.success(`${item.pro_names} បានបញ្ចូលទៅក្នុងកន្រ្តក!`, {
//           position: "top-right",
//           autoClose: 1000,
//         });
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
//         );
//       } else {
//         if (item.quantity > item.qty) {
//           toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
//             position: "top-right",
//             autoClose: 1000,
//           });
//           return prevCart; // Return current cart if out of stock
//         }

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
//       const item = prevCart.find((item) => item.id === id);
//       if (item) {
//         if (quantity > item.qty) {
//           toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
//             position: "top-right",
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//           return prevCart;
//         } else if (quantity <= 0) {
//           return prevCart.filter((item) => item.id !== id);
//         } else {
//           return prevCart.map((item) =>
//             item.id === id ? { ...item, quantity } : item
//           );
//         }
//       }
//       return prevCart;
//     });
//   };

//   const removeItem = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//   const restoreHeldOrder = (order) => {
//     setCart(order.cartItems);
//     setHeldOrders((prevHeldOrders) =>
//       prevHeldOrders.filter((o) => o.id !== order.id)
//     );
//   };

 

//   // CartContext.js
//   const holdOrder = () => {
//     if (cart.length === 0) {
//       toast.error('No items in cart to hold!', {
//         position: "top-center",
//         autoClose: 500,
//       });
//       return;
//     }

//     const orderToHold = {
//       id: new Date().getTime(), 
//       cartItems: cart,
//       date: new Date().toLocaleString()
//     };

//     setHeldOrders((prevHeldOrders) => [...prevHeldOrders, orderToHold]);
//     clearCart();
//     toast.success('ការរក្សាទុក្ខដោយជោគជ័យ!', {
//       position: "top-center",
//       autoClose: 1000,
//     });
//   };

//   // CartContext.js

//   const ClearHold = () => {
//     setHeldOrders([]); 
//     toast.success('រាល់ការបញ្ជាទិញដែលបានរក្សាទុកត្រូវបានជម្រះ!', {
//       position: "top-center",
//       autoClose: 1000,
//     });
//   };


//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         heldOrders,
//         ClearHold,
//         addItem,
//         updateQuantity,
//         removeItem,
//         clearCart,
//         holdOrder,
//         restoreHeldOrder,
//       }}
//     >
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
  
      // If stock management is enabled, check the stock quantity
      if (item.mg_stock === "enable") {
        if (item.qty <= 0) {
          toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
            position: "top-right",
            autoClose: 1000,
          });
          return prevCart;
        }
  
        if (existingItem) {
          const newQuantity = existingItem.quantity + 1;
          if (newQuantity > item.qty) {
            toast.error(`Sorry, only ${item.qty} items are available in stock.`, {
              position: "top-center",
              timeout: 2000,
            });
            return prevCart;
          }
  
          toast.success(`${item.pro_names} added more to the cart!`, {
            position: "top-right",
            timeout: 2000,
          });
          return prevCart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
          );
        } else {
          toast.success(`${item.pro_names} added to the cart!`, {
            position: "top-right",
            timeout: 2000,
          });
          return [...prevCart, { ...item, quantity: 1 }];
        }
      } else if (item.mg_stock === "disable") {
        if (existingItem) {
          const newQuantity = existingItem.quantity + 1;
          toast.success(`${item.pro_names} added more to the cart!`, {
            position: "top-right",
            timeout: 2000,
          });
          return prevCart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
          );
        } else {
          toast.success(`${item.pro_names} added to the cart!`, {
            position: "top-right",
            timeout: 2000,
          });
          return [...prevCart, { ...item, quantity: 1 }];
        }
      }
    });
  };
  
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id);
      if (item) {
        if (item.mg_stock === "enable") {
          if (quantity > item.qty) {
            toast.error('ចំនួនក្នុងស្តុកបានអស់ហើយ​​​ !', {
              position: "top-right",
              autoClose: 1000,
            });
            return prevCart; 
          }
        }
  
        // If quantity is less than or equal to 0, remove the item from the cart
        if (quantity <= 0) {
          return prevCart.filter((item) => item.id !== id);
        } else {
          // If stock management is disabled, update quantity automatically
          return prevCart.map((cartItem) =>
            cartItem.id === id ? { ...cartItem, quantity } : cartItem
          );
        }
      }
      
      return prevCart; // Return unchanged cart if no item is found
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
    toast.success('ការរក្សាទុក្ខដោយជោគជ័យ!', {
      position: "top-center",
      autoClose: 1000,
    });
  };

  // CartContext.js

  const ClearHold = () => {
    setHeldOrders([]); 
    toast.success('រាល់ការបញ្ជាទិញដែលបានរក្សាទុកត្រូវបានជម្រះ!', {
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
