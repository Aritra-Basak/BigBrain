# Next.js Application with Clerk Authentication, Convex BAAS, and GROQ Cloud Inference

This repository contains a [Next.js](https://nextjs.org) application integrated with Clerk Authentication, BAAS (Backend as a Service) features from Convex, and GROQ Cloud Inference for AI-powered functionalities. The project is bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **Clerk Authentication**: Seamless user authentication and management.
- **Convex BAAS**: Simplified backend data handling and storage.
- **GROQ Cloud Inference**: Leverages AI capabilities for advanced cloud inference.

---

## Getting Started

Follow the steps below to set up and run the application locally:

### 1. Run the Development Server

Start the development server using one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the running application.

You can edit the pages by modifying the `app/page.tsx` file. Changes will be reflected instantly thanks to hot reloading.

---

### 2. Configure Convex

- Complete the Convex setup to obtain the **Convex Deployment URL** and **Convex Public URL**.
- Add these URLs to your environment configuration.

---

### 3. Configure Clerk

- Set up Clerk for authentication.
- Obtain the following keys:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
- Add these keys to your environment configuration.

---

### 4. OpenAI Integration

- Acquire your OpenAI API Key (recommended: **GROQ Cloud Inference**).
- Add the API key to your environment variables for enabling AI functionalities.

---

### 5. Webhook for Organization Logs

- To store organization logs from Clerk in the Convex DB:
  1. Use Clerk's webhook feature.
  2. Set the Convex HTTP-Action endpoint as the webhook URL.
  3. Whitelist this endpoint in Clerk, appending your preferred webhook API path.
  4. Note the **Clerk Webhook Secret Key** to verify incoming requests.

---

### 6. Deployment

- For production deployment:
  1. Acquire the production details from Convex.
  2. Set up environment variables in the Convex deployment environment.
  3. Proceed with the deployment in your preferred hosting platform.

---

## Environment Variables

Ensure you configure the following environment variables:

```plaintext
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
CONVEX_DEPLOYMENT_URL=your-convex-deployment-url
CONVEX_PUBLIC_URL=your-convex-public-url
OPENAI_API_KEY=your-openai-api-key
CLERK_WEBHOOK_SECRET=your-clerk-webhook-secret
```

---

## Additional Notes

- Ensure proper whitelisting of webhook endpoints in Clerk.
- Use secure storage for sensitive environment variables.
- Refer to official documentation for advanced configurations:
  - [Next.js Documentation](https://nextjs.org/docs)
  - [Clerk Documentation](https://clerk.dev/docs)
  - [Convex Documentation](https://docs.convex.dev)
  - [OpenAI Documentation](https://platform.openai.com/docs/)

---

Happy developing!
