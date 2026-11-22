# Frontend decisions — FitForm Islamabad

These are the three implementation decisions that connect the investigation themes to working code. Replace/confirm the reference observations after personally checking the live pages and capturing screenshots; do not submit unverified observations as facts.

## Decision 1 — Compare before opening details

- **Problem:** Fitness schedules can make users open multiple class pages just to compare basic details.
- **Reference to investigate:** https://www.classpass.com/
- **Task affected:** Compare class options by level, duration, coach, time and price.
- **Decision:** Each FitForm listing card surfaces level, intensity, duration, coach, schedule, price and remaining places; search, category filter and sorting narrow the list.
- **Alternative:** Show only a class title and image, with all information on the details route.
- **Reason:** Customers can shortlist suitable sessions with fewer navigation steps.
- **Tradeoff:** Cards contain more information and require careful mobile spacing.
- **Code location:** `src/pages/Home.jsx`, `src/components/ClassCard.jsx`, `src/styles.css`.
- **Evidence to capture:** Screenshot of the class list; search for “yoga”; filter Yoga; show the resulting cards and comparison fields.

## Decision 2 — Preserve a shared booking plan

- **Problem:** A user can lose a selection when moving between a listing and a details page or when filtering the schedule.
- **Reference to investigate:** https://www.mindbodyonline.com/
- **Task affected:** Add several sessions, compare them and adjust places before completing a booking.
- **Decision:** A shared React context owns the selection; localStorage restores it after refresh. Filters only change visible results and do not clear selected classes. The booking page shows the current plan.
- **Alternative:** Keep selections only inside the listing page or encode them in a URL query string.
- **Reason:** The plan remains consistent across routes and browser refreshes.
- **Tradeoff:** Restored selections must be checked against current availability and invalid records removed with recovery feedback.
- **Code location:** `src/state/BookingContext.jsx`, `src/pages/Booking.jsx`, `src/components/Header.jsx`.
- **Evidence to capture:** Add a class, change the search/filter, open a detail page, navigate to booking and refresh; show that the selection remains.

## Decision 3 — Put eligibility and price conditions before confirmation

- **Problem:** Users may only discover booking restrictions or additional charges near the end of a booking flow.
- **Reference to investigate:** https://www.classpass.com/
- **Task affected:** Check whether a class is suitable and understand the payable total.
- **Decision:** Details show level, capacity and per-person price. The booking form checks experience compatibility and the summary calculates the booking fee before confirmation.
- **Alternative:** Show rules only in a separate policy page or after form submission.
- **Reason:** Customers can correct an unsuitable selection before committing to the simulated booking.
- **Tradeoff:** The form and summary need more explanatory text and validation logic.
- **Code location:** `src/rules/businessRules.mjs`, `src/pages/ClassDetails.jsx`, `src/pages/Booking.jsx`.
- **Evidence to capture:** Select an Advanced class with Beginner experience; show the inline message. Then change experience to Advanced and show the updated summary.

## Reference evidence status

The URLs above are research starting points, not proof that a specific current interface defect exists. Inspect the live pages, record the exact task and observed behaviour, and insert your own dated screenshots in the report before submission. Do not describe a possible issue as an observed fact unless your screenshot and steps support it.
