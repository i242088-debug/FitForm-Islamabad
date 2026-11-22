export function validateQuantity(quantity, remainingSeats) {
  const value = Number(quantity);
  const seats = Number(remainingSeats);
  if (!Number.isInteger(value) || value < 1) {
    return { valid: false, message: "Choose at least 1 place." };
  }
  if (value > 4) {
    return { valid: false, message: "A booking can contain no more than 4 places per class." };
  }
  if (!Number.isInteger(seats) || seats < 0 || value > seats) {
    return { valid: false, message: `Only ${Math.max(0, seats || 0)} place(s) remain for this class.` };
  }
  return { valid: true, message: "" };
}

const LEVEL_RANK = { Beginner: 1, Intermediate: 2, Advanced: 3 };

export function validateLevelCompatibility(selectedClasses, experienceLevel) {
  if (!LEVEL_RANK[experienceLevel]) {
    return { valid: false, message: "Choose an experience level." };
  }
  const incompatible = selectedClasses.filter(item => LEVEL_RANK[item.level] > LEVEL_RANK[experienceLevel]);
  return incompatible.length
    ? { valid: false, message: `${incompatible.map(item => item.name).join(", ")} require a higher experience level.` }
    : { valid: true, message: "" };
}

export function calculateBookingFee(subtotal) {
  return Number(subtotal) >= 5000 ? 0 : 150;
}