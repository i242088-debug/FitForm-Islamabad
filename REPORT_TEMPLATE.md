# CS4032 Assignment 02 — Report template

> Complete the bracketed fields and insert genuine screenshots before exporting this report to PDF. Do not submit this template unchanged.

## 1. Student and project details

- Student name: [Full name]
- Roll number: [Roll number]
- Section: [Section]
- Business: FitForm Islamabad
- Public GitHub repository: [URL]
- Deployed website: [URL]
- Final commit hash: [Hash]

## 2. Business profile

FitForm Islamabad is a fictional small-group fitness studio in F-6, Islamabad. It offers 12 weekly classes for residents and students. Customers can compare sessions, select places, complete a booking form and receive a simulated confirmation.

## 3. Operating rules

| Rule | Exact condition and communication | Enforcement and boundary |
|---|---|---|
| Capacity | 1–4 places per class; current remaining seats shown on details and booking page | Blocks quantities above 4 or remaining capacity. Exactly 4 is accepted if 4 seats remain; 5 is rejected. |
| Experience compatibility | Beginner selects Beginner; Intermediate selects Beginner/Intermediate; Advanced selects all. Explained beside the form field. | Confirmation blocked for incompatible class. Intermediate + Intermediate is accepted. |
| Booking fee | PKR 150 below PKR 5,000 subtotal; waived at/above PKR 5,000. Shown in summary. | Recalculated before confirmation. Exactly PKR 5,000 has no fee. |

## 4. Reference-site investigation

For each entry, insert the exact reference URL and a screenshot captured by you. Distinguish observations from possible consequences.

### Problem 1 — Comparing sessions requires opening multiple details
- Reference URL: https://www.classpass.com/
- Screenshot: [Insert screenshot with date and caption]
- User task: Compare class suitability, schedule, coach and price.
- Observed behaviour: [Describe only what your screenshot and steps show.]
- Possible business consequence: A user may spend more time comparing and may abandon discovery.
- FitForm improvement: Listing cards expose level, intensity, duration, coach, schedule, price and availability. Search/filter/sort support comparison.

### Problem 2 — Selection should remain consistent during navigation
- Reference URL: https://www.mindbodyonline.com/
- Screenshot: [Insert screenshot with date and caption]
- User task: Build a multi-class plan and move between listing, details and booking.
- Observed behaviour: [Record the exact behaviour you personally tested; do not infer it.]
- Possible business consequence: Losing a selection can cause repeated work or abandonment.
- FitForm improvement: Shared context and localStorage preserve selections across routes and refresh.

### Problem 3 — Conditions and final cost should be visible before confirmation
- Reference URL: https://www.classpass.com/
- Screenshot: [Insert screenshot with date and caption]
- User task: Check eligibility and understand the booking total.
- Observed behaviour: [Record the exact behaviour you personally tested; do not infer it.]
- Possible business consequence: Late discovery of restrictions or charges may reduce trust or prevent completion.
- FitForm improvement: Class details show price, level and capacity; booking form checks compatibility and calculates the fee before confirmation.

## 5. Frontend decisions

See `DECISIONS.md`. Include the three entries and screenshots showing the implemented improvements. Annotate each screenshot with the user action and the visible result.

## 6. Implemented application

Insert screenshots of:
1. Home page and class listing at desktop width.
2. Search/filter/sort result.
3. Class details route.
4. Booking plan and quantity control.
5. Validation message for incompatible experience.
6. Calculated summary and fee.
7. Confirmation screen.
8. Mobile layout at approximately 390 px.

## 7. Verification

| Check | User action | Expected behaviour | Observed result |
|---|---|---|---|
| Invalid class URL | Open `/classes/not-a-real-id` | Helpful message and route back | [Record after testing] |
| No search matches | Search impossible term | Empty-results guidance and clear action | [Record after testing] |
| Invalid form | Submit blank or invalid fields | Specific errors; other valid values remain | [Record after testing] |
| Unavailable selection | Enable full-capacity demo and refresh | Full class cannot be added; restored invalid selection is removed | [Record after testing] |
| Loading failure | Enable failure demo and refresh | Error message and working retry after disabling demo | [Record after testing] |
| Browser persistence | Add a class and refresh | Selection restored | [Record after testing] |
| Mobile and keyboard | Test at 390 px and tab through journey | No page-wide overflow; focus visible; controls usable | [Record after testing] |

### Automated rule test

Command: `npm test`

Result: [Paste actual terminal output after running the tests.]

## 8. Limitations

Bookings are simulated and no payment or external submission occurs. Class data and availability are local demonstration data. The reference-site screenshots and observations must be captured and verified by the student. [Add any remaining issues found during testing.]
