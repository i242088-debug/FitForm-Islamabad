import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadClasses } from "../services/classService.js";
import { validateQuantity } from "../rules/businessRules.mjs";

const BookingContext = createContext(null);
const STORAGE_KEY = "fitform-booking-v1";

export function BookingProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter(x => x && typeof x.id === "string" && Number.isInteger(x.quantity)) : [];
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  });
  const [classesData, setClassesData] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const [demoFailure, setDemoFailure] = useState(localStorage.getItem("fitform-demo-fail") === "true");
  const [demoCapacity, setDemoCapacity] = useState(localStorage.getItem("fitform-demo-capacity") === "true");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    loadClasses().then(data => {
      if (!active) return;
      setClassesData(data);
      // Keep saved selections that still exist, even if capacity changed; the booking page explains the conflict and lets the user remove it.
      setItems(current => current.filter(saved => data.some(item => item.id === saved.id)));
      setStatus("success");
      setError("");
    }).catch(err => {
      if (!active) return;
      setError(err.message || "Unable to load classes.");
      setStatus("error");
    });
    return () => { active = false; };
  }, [retryKey, demoFailure, demoCapacity]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (id, quantity = 1) => {
    const item = classesData.find(x => x.id === id);
    if (!item) return { valid: false, message: "This class is not available." };
    const current = items.find(x => x.id === id)?.quantity || 0;
    const result = validateQuantity(current + quantity, item.remainingSeats);
    if (!result.valid) return result;
    setItems(prev => {
      const found = prev.some(x => x.id === id);
      return found
        ? prev.map(x => x.id === id ? { ...x, quantity: x.quantity + quantity } : x)
        : [...prev, { id, quantity }];
    });
    return { valid: true, message: "Class added to your plan." };
  };

  const setQuantity = (id, quantity) => {
    const item = classesData.find(x => x.id === id);
    if (!item) return { valid: false, message: "This class is no longer available." };
    const result = validateQuantity(quantity, item.remainingSeats);
    if (!result.valid) return result;
    setItems(prev => prev.map(x => x.id === id ? { ...x, quantity } : x));
    return result;
  };

  const removeItem = id => setItems(prev => prev.filter(x => x.id !== id));
  const clearItems = () => setItems([]);

  const value = useMemo(() => ({
    items, classesData, status, error, retry: () => setRetryKey(x => x + 1),
    addItem, setQuantity, removeItem, clearItems,
    demoFailure, demoCapacity,
    toggleFailure: checked => {
      localStorage.setItem("fitform-demo-fail", String(checked));
      setDemoFailure(checked);
    },
    toggleCapacity: checked => {
      localStorage.setItem("fitform-demo-capacity", String(checked));
      setDemoCapacity(checked);
    }
  }), [items, classesData, status, error, demoFailure, demoCapacity]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside BookingProvider");
  return context;
}