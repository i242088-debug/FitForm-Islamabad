
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Booking from "./pages/Booking";

function App() {
  const [bookingItems, setBookingItems] = useState(() => {
    const savedBookings = localStorage.getItem("fitformBookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem("fitformBookings", JSON.stringify(bookingItems));
  }, [bookingItems]);

  const addToBooking = (fitnessClass) => {
    const existingItem = bookingItems.find(
      item => item.name === fitnessClass.name
    );

    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (currentQuantity >= 4) {
      alert("Maximum 4 places allowed per class.");
      return;
    }

    if (currentQuantity >= fitnessClass.seats) {
      alert("No more seats available.");
      return;
    }

    if (existingItem) {
      setBookingItems(items =>
        items.map(item =>
          item.name === fitnessClass.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setBookingItems(items => [
        ...items,
        {
          ...fitnessClass,
          quantity: 1,
          experienceLevel: fitnessClass.level
        }
      ]);
    }

    alert(`${fitnessClass.name} added to booking!`);
  };

  const increaseQuantity = (name) => {
    setBookingItems(items =>
      items.map(item =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    setBookingItems(items =>
      items
        .map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (name) => {
    setBookingItems(items =>
      items.filter(item => item.name !== name)
    );
  };
const clearBooking = () => {
  setBookingItems([]);
};
  const updateExperience = (name, experienceLevel) => {
    setBookingItems(items =>
      items.map(item =>
        item.name === name
          ? { ...item, experienceLevel }
          : item
      )
    );
  };

  return (
    <>
      <Navbar />
      <Home />
      <Classes onAddToBooking={addToBooking} />
      <Booking
        bookingItems={bookingItems}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeItem}
        onUpdateExperience={updateExperience}
        onClear={clearBooking}
      />
      <Footer />
    </>
  );
}

export default App;
