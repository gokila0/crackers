import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { INITIAL_CATEGORIES } from '../data/initialCategories';
import { INITIAL_OFFERS } from '../data/initialOffers';

const DataContext = createContext();

export function DataProvider({ children }) {
  // 1. Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('appProducts');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // 2. Categories State
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('appCategories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // 3. Offers State
  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('appOffers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  // 4. Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('appOrders');
    if (saved) return JSON.parse(saved);
    // Initial sample orders
    return [
      {
        id: 'ORD-2025-1001',
        customerName: 'Rajesh Kumar',
        customerEmail: 'rajesh@example.com',
        customerPhone: '9876543210',
        address: '12 Gandhi Street',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001',
        items: [
          { id: 25, name: 'Nayagar Pencil', quantity: 2, price: 140, originalPrice: 700 }
        ],
        totalAmount: 280,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending',
        orderStatus: 'Confirmed',
        orderDate: '2026-08-10 10:30 AM'
      }
    ];
  });

  // 5. Contacts State
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('appContacts');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'cnt-1',
        name: 'Suresh Raina',
        email: 'suresh@example.com',
        phone: '9840198401',
        subject: 'Bulk Booking Query for Festival',
        message: 'Looking to purchase 50 gift box bundles for corporate gifting. Please advise on shipping to Madurai.',
        date: '2026-08-11 09:15 AM',
        status: 'Unread'
      }
    ];
  });

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('appProducts', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('appCategories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('appOffers', JSON.stringify(offers)); }, [offers]);
  useEffect(() => { localStorage.setItem('appOrders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('appContacts', JSON.stringify(contacts)); }, [contacts]);

  // PRODUCT CRUD
  const addProduct = (newProd) => {
    const created = {
      id: Date.now(),
      codeNo: newProd.codeNo || String(products.length + 1),
      rating: 4.8,
      reviews: 1,
      badge: newProd.badge || 'New',
      ...newProd
    };
    setProducts(prev => [created, ...prev]);
    return created;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // CATEGORY CRUD
  const addCategory = (newCat) => {
    const created = {
      id: newCat.name.toLowerCase().replace(/\s+/g, '-'),
      itemCount: 0,
      icon: '✨',
      ...newCat
    };
    setCategories(prev => [...prev, created]);
  };

  const updateCategory = (id, updatedData) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // OFFER CRUD
  const addOffer = (newOff) => {
    const created = {
      id: 'off-' + Date.now(),
      status: 'Active',
      image: '🎉',
      ...newOff
    };
    setOffers(prev => [created, ...prev]);
  };

  const updateOffer = (id, updatedData) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updatedData } : o));
  };

  const deleteOffer = (id) => {
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  const toggleOfferStatus = (id) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: o.status === 'Active' ? 'Inactive' : 'Active' } : o));
  };

  // CONTACT MESSAGES
  const addContactMessage = (msgData) => {
    const created = {
      id: 'cnt-' + Date.now(),
      date: new Date().toLocaleString(),
      status: 'Unread',
      ...msgData
    };
    setContacts(prev => [created, ...prev]);
  };

  const markContactRead = (id) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'Unread' ? 'Read' : 'Unread' } : c));
  };

  const deleteContactMessage = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  // ORDER MANAGEMENT
  const placeOrder = (orderData) => {
    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      orderDate: new Date().toLocaleString(),
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Pending',
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
  };

  return (
    <DataContext.Provider value={{
      products,
      categories,
      offers,
      orders,
      contacts,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addOffer,
      updateOffer,
      deleteOffer,
      toggleOfferStatus,
      addContactMessage,
      markContactRead,
      deleteContactMessage,
      placeOrder,
      updateOrderStatus
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
