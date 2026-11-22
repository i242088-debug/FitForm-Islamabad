import { classes } from "../data/classes.js";

export async function loadClasses() {
  await new Promise(resolve => window.setTimeout(resolve, 450));
  if (localStorage.getItem("fitform-demo-fail") === "true") {
    throw new Error("Demo loading failure is enabled. Turn it off and retry.");
  }
  const changedAvailability = localStorage.getItem("fitform-demo-capacity") === "true";
  return classes.map(item => ({
    ...item,
    remainingSeats: changedAvailability && item.id === "strength-101" ? 0 : item.remainingSeats
  }));
}