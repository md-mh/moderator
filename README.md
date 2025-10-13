# Moderator Management Feature

This project offers a focused **Moderator Management** system, separated into frontend and backend sections for clarity. Below, you’ll find explanations of the main components and a deeper dive into how moderators are managed.

---

## Frontend

The frontend is built with **Next.js**, **React**, **TypeScript**, and uses **TanStack Query** for efficient server state management. The moderator feature consists of:

- **Listing Moderators:**  
  All registered moderators are shown in a paginated, responsive table. Information includes name, email, unique user ID, join date, and actions.

- **Adding Moderators:**  
  Users can add a moderator by clicking "Add Moderator", which opens a modal form. This form uses **React Hook Form** for state management and **Zod** for validation. On submission, it triggers an API call to add a moderator, with error handling and UI feedback.

- **Deleting Moderators:**  
  Each moderator row features a delete button. When clicked, a request is sent to the backend to remove the moderator, and the frontend updates accordingly.

### Key Packages Used

- **Next.js & React** — UI and page routing
- **TanStack Query** (`@tanstack/react-query`) — Data-fetching, caching, and mutations
- **Zod** — Schema definition and validation for form data
- **React Hook Form** — Form handling and validation
- **React Toastify** — User notifications for success/error

### Primary Files & Their Roles

- **`frontend/src/app/(private)/moderator/page.tsx`**  
  Displays the list of moderators and manages interactions for adding and deleting.

- **`frontend/src/app/(private)/moderator/AddModeratorModal.tsx`**  
  Contains the modal pop-up form for adding a new moderator, with validation logic.

- **`frontend/src/types/moderator.ts`**  
  Defines the moderator data structure (ID, name, email, password, etc.), as well as the Zod validation schema for moderator forms.  
  _Moderator parts explained:_

  - `Moderator` interface details the shape of each moderator.
  - `ModeratorList` defines the expected list response.
  - `moderatorSchema` uses Zod for strong validation, including custom checks (e.g. matching passwords).

- **`frontend/src/services/Moderator.service.ts`**  
  Exposes hooks for communicating with the backend for moderator actions:
  - `useAddModeratorMutation()` to add a new moderator.
  - `useDeleteModeratorMutation()` to remove one.
  - `useGetModeratorListQuery()` to fetch a list of moderators.  
    Each uses TanStack Query and shows a toast notification on success.

---

## Backend API

_This project expects the following backend endpoints for moderator management:_

- `POST moderators/add`: Create a new moderator (expects name, email, password, confirmPassword, etc.)
- `DELETE moderators/:id`: Remove an existing moderator by ID
- `GET moderators/all`: Retrieve a list of all moderators (supports pagination via parameters)

---

_For more detailed code and further customization tips, check out the corresponding source files in the frontend directory._
