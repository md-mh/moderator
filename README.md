# Moderator Management Feature

This project includes a simple **Moderator Management** dashboard built with Next.js, React, TypeScript, and TanStack Query, featuring:

- Listing all moderators
- Adding a new moderator via a modal form
- Deleting moderators

## File Structure & Flow

- **`frontend/src/app/(private)/moderator/page.tsx`**  
  Renders the Moderator List and handles displaying/modals for adding and deleting moderators.

- **`frontend/src/app/(private)/moderator/AddModeratorModal.tsx`**  
  Modal form for adding new moderators using React Hook Form and zod for validation.

- **`frontend/src/types/moderator.ts`**  
  Types and Zod schema for moderator entities and form validation.

- **`frontend/src/services/Moderator.service.ts`**  
  Service hooks for backend API operations (add, delete, fetch list), using TanStack Query and Axios.

## How It Works

1. **List Moderators:**  
   The moderator page fetches a paginated list using the service hook and displays it in a responsive table.

2. **Add Moderator:**  
   Clicking "Add Moderator" opens a modal form. Inputs are validated before sending. On success, the list auto-refreshes.

3. **Delete Moderator:**  
   Each row in the moderator table has a 'Delete' button. Clicking it will remove the moderator after confirming via API.

## Key Packages Used

- **Next.js & React** (frontend UI)
- **TanStack Query** (`@tanstack/react-query`) for data-fetching and mutations
- **Zod** for schema validation
- **React Hook Form** for performant, flexible forms
- **React Toastify** for notifications

## Example: Adding a Moderator

1. Click "Add Moderator".
2. Fill out the form fields (name, email, password, confirm password).
3. Submit.
   - Form is validated.
   - On success, you see a toast and the list updates.

## Example: Deleting a Moderator

- Press 'Delete' on any moderator row and confirm the action.

## Backend API Layer

The services expect the following endpoints:

- `POST moderators/add` to create
- `DELETE moderators/:id` to delete
- `GET moderators/all` for list (with pagination params)

## Customization

- **Form and schema** are easily adjustable in `moderator.ts` and `AddModeratorModal.tsx`.
- **Columns and API endpoints** in `page.tsx` and `Moderator.service.ts` can be updated to suit your actual backend or data model.

---

_See the respective files for full implementation details and to further customize for your needs._
