
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Booking from "./pages/Booking";

function App() {
  const [bookingItems, setBookingItems] = useState([]);

  const addToBooking = (fitnessClass) => {
    setBookingItems(previousItems => {
      const existingItem = previousItems.find(
        item => item.name === fitnessClass.name
      );

      if (existingItem) {
        return previousItems.map(item =>
          item.name === fitnessClass.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousItems, { ...fitnessClass, quantity: 1 }];
    });

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
      />

      <Footer />
    </>
  );
}

export default App;
