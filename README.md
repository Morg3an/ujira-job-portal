# Ujira Job Application and Recruitment Portal

## Overview
Ujira is a comprehensive job application and recruitment portal designed to connect job seekers with licensed nutritionists in Kenya. The platform allows users to register, search for jobs, apply for positions, and receive real-time notifications. Employers can post job listings, verify applicants, and manage applications.

## Features
- **User Registration and Authentication:** Secure user registration and login using Supabase Auth and Clerk.
- **Role-Based Access Control:** Distinguish between users, employers, and admins with appropriate permissions.
- **Job Listings:** Post, search, and manage job listings.
- **Real-Time Notifications:** Receive notifications for job applications, updates, and more.
- **Responsive Design:** Optimized for both desktop and mobile devices using Tailwind CSS.

## Tech Stack
- **Frontend:** React, JavaScript, Tailwind CSS, React Router, Next.js
- **Backend:** Node.js, Express, Supabase (PostgreSQL), MongoDB
- **Deployment:** Vercel

## Installation

### Prerequisites
- Node.js and npm installed on your machine
- Supabase and MongoDB accounts and project set up
- Git installed on your machine

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Morg3an/ujira-portal.git
   cd ujira-portal
Install dependencies:

```bash
npm install
```
### Create a .env.local file in the root directory and add your Clerk Credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-client-secret-key
```
### Start the development server:

```bash
npm run dev
```

## Deployment
### Deploying the app to Vercel:

Link your GitHub repository to Vercel.

Configure the build settings and deploy.


### Configure environment variables and deploy.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
For any inquiries, please contact us at mulweyemorgan12@gmail.com.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.


