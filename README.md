# To test the website DM your email to my twitter - 3thris
### Description

This project is a Gmail AI application that uses Google's Generative AI and Google
s Gemini API to classify emails into different categories. It integrates with Gmail to help users manage and organize their emails efficiently.

### Demo

### Tech Stack & Key Features

- **Frontend**: Built using Next.js and tailwind CSS for styling.
- **Backend**: Next.js API routes
- **Authentication**: Implements Google Oauth user authentication using next-auth.
- **Integration**: Get's the last X emails of the user using the Gmail API and Uses Google's Gemini API for email classification.
- **Email Classification**: Classifies emails into predefined categories such as Important, Promotions, Social, Marketing, Spam, and General.
- **User Interface**: Provides an intuitive interface for users to view and classify their emails.

### Setup

1. Clone the repository.
   ```sh
   git clone https://github.com/thrishank/gmail-ai.git
   ```
2. Navigate to the project directory.
   ```sh
   cd gmail-ai
   ```
3. Install dependencies using npm.
   ```sh
   npm install
   ```
4. Copy the content from .env.example and create a new file named .env with the copied content.

   ```sh
   cp .env.example .env
   ```

   - `GOOGLE_CLIENT_ID`: Google client ID for authentication.
   - `GOOGLE_CLIENT_SECRET`: Google client secret for authentication.
   - `NEXTAUTH_SECRET`: Secret key for NextAuth.

5. Start the development server.
   ```sh
   npm run dev
   ```

### File Structure

- `app/`: Contains the main application files.
- `components/`: Includes reusable React components.
- `lib/`: Contains authentication-related files.
- `public/`: Stores public assets like images.
- `app/api/`: Includes API routes for Gmail and AI classification.

### Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run start`: Starts the production server.

### Additional Notes

- Ensure to set up the required environment variables before running the application.
