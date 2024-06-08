# Project README.md

## Project Name: gmail-ai

### Description

This project is a Gmail AI application that uses Google's Generative AI and Google
s Gemini API to classify emails into different categories.

### Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.

### Key Features

- Uses Next.js for the frontend.
- Integrates with Google's Gemini API and Gmail API  .
- Allows users to classify emails into predefined categories.
- Provides a user-friendly interface for email classification.
- Authentication using the next-auth

### File Structure

- `app/`: Contains the main application files.
- `components/`: Includes reusable React components.
- `lib/`: Contains authentication-related files.
- `public/`: Stores public assets like images.
- `app/api/`: Includes API routes for Gmail and AI classification.

### Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm start`: Starts the production server.

### Dependencies

- Next.js
- Googleapis
- Tailwind CSS
- Axios

### Environment Variables

- `GOOGLE_CLIENT_ID`: Google client ID for authentication.
- `GOOGLE_CLIENT_SECRET`: Google client secret for authentication.
- `NEXTAUTH_SECRET`: Secret key for NextAuth.

### Additional Notes

- Ensure to set up the required environment variables before running the application.
