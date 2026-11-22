# FitForm Islamabad — React class booking website

**Course:** CS4032 Web Programming — Assignment 02  
**Student:** Fatima azhar 
**Roll number:** 24i-2088  
**Section:** C  
**Business:** FitForm Islamabad  
**Repository:** (https://github.com/i242088-debug/FitForm-Islamabad) 


## Project overview

FitForm is a fictional small-group fitness studio based in F-6, Islamabad. It serves people looking for guided yoga, strength, Pilates, cardio, dance and recovery sessions. Visitors can search and compare sessions, view details, build a booking plan, complete a validated form and review a simulated confirmation.

All class data and bookings are local demonstrations. No payment is processed and no personal data is sent to a server.

## Business profile

- **Audience:** Islamabad residents and students seeking coached small-group fitness sessions.
- **Operating area:** F-6 studio, Islamabad.
- **Main customer task:** Find a suitable class, select places and submit a simulated booking.
- **Business goal:** Convert class discovery into a complete booking request.
- **Offering:** 12 sessions across Strength, Yoga, Cardio, Pilates, Recovery and Dance.

## Operating rules

1. **Capacity:** A booking allows 1–4 places per class and cannot exceed current remaining seats. The limit is shown on class details and beside the quantity selector. Invalid quantities are rejected with a specific message. Boundary: exactly 4 is valid when at least 4 seats remain; 5 is invalid.
2. **Experience compatibility:** Beginner can select Beginner classes; Intermediate can select Beginner or Intermediate; Advanced can select all levels. The rule is shown on the booking form and prevents confirmation until corrected. Boundary: an Intermediate user selecting an Intermediate class is allowed.
3. **Booking fee:** A PKR 150 fee applies when the class subtotal is below PKR 5,000; it is waived at or above PKR 5,000. The calculated fee appears in the summary before confirmation. Boundary: exactly PKR 5,000 has no fee.

## Routes

- `/` — searchable, filterable and sortable class listing.
- `/classes/:id` — parameterized class details; unknown IDs show a recovery message.
- `/booking` — shared selection, quantity changes, form validation and calculated summary.
- `/confirmation` — simulated confirmation generated after valid submission.

## Setup

Requires Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build and test

```bash
npm run build
npm test
```

The automated business-rule test uses Node's built-in `node:test` and `node:assert/strict`. The tested function is also imported by the React application.

## Demo and edge-case reproduction

- **Loading failure:** Open the footer's “Demo controls”, enable “Simulate class-loading failure”, then reload. The error state appears. Disable the option and use Retry.
- **Changed availability:** Enable “Mark Strength Foundations as full”, then return to the schedule or reload. Its detail page reports full capacity and adding it is disabled. Turn the option off to restore the normal schedule.
- **Invalid route:** Visit `/classes/not-a-real-id`; use the “Back to all classes” action.
- **Empty search:** Search for a phrase that does not occur. Clear search and filters to recover.
- **Quantity boundary:** Try adding more than four places for a class, or select a quantity greater than the remaining capacity.
- **Eligibility:** Add an Advanced class, then choose Beginner experience in the booking form. The form explains the incompatibility and blocks confirmation.
- **Fee boundary:** Select classes whose subtotal is exactly PKR 5,000 or more to see the fee waived. Below PKR 5,000, PKR 150 is applied.
- **Persistence:** Add a class and refresh. The plan is restored from localStorage. If a restored item becomes unavailable, the application rechecks it against current data.

## Main React and JavaScript concepts

| Concept | File | Component/function |
|---|---|---|
| Function components and JSX | `src/pages/Home.jsx` | `Home` |
| Props and stable list keys | `src/components/ClassCard.jsx` | `ClassCard` |
| Shared state/context | `src/state/BookingContext.jsx` | `BookingProvider`, `useBooking` |
| State and controlled fields | `src/pages/Booking.jsx` | `Booking`, `update` |
| Functional array updates | `src/state/BookingContext.jsx` | `addItem`, `setQuantity`, `removeItem` |
| Derived values | `src/pages/Booking.jsx` | `selected`, `subtotal`, `fee`, `total` |
| Effect and cleanup | `src/state/BookingContext.jsx` | asynchronous load effect |
| Async/await and error handling | `src/services/classService.js` | `loadClasses` |
| Browser persistence | `src/state/BookingContext.jsx` | localStorage effects |
| Routing and URL parameters | `src/App.jsx`, `src/pages/ClassDetails.jsx` | `Routes`, `useParams` |
| Business rules | `src/rules/businessRules.mjs` | `validateQuantity`, `validateLevelCompatibility`, `calculateBookingFee` |
| Automated tests | `src/rules/businessRules.test.mjs` | Node test cases |

## Frontend decisions

See `DECISIONS.md` for the three problem-to-decision entries, alternatives, tradeoffs, code locations and evidence-capture steps.

## Deployment

For GitHub Pages, Netlify or Vercel, configure the host to serve `index.html` for unknown paths so nested React Router URLs refresh correctly. A host-specific rewrite file is included for Netlify (`public/_redirects`). After deployment, test `/classes/strength-101` directly and refresh it.

## Limitations

- This is a frontend-only assignment prototype; bookings are simulated.
- No payment, email, account, database or real seat reservation is performed.
- Class data is local JavaScript data. Availability changes are demonstration controls, not live inventory.
- Reference-site investigation screenshots and observations must be captured and verified by the student.
- Google Fonts are loaded from an external stylesheet; system sans-serif fallbacks remain available if the font service is unreachable.

## Academic integrity and viva preparation

Read and understand the implementation. Be ready to explain the state flow, route structure, form validation, business-rule functions, localStorage recovery, async loading, and test cases. Make your own Git commits during development; do not fabricate history.
