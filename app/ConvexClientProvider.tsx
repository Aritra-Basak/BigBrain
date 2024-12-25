"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider,useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";
import {dark} from "@clerk/themes";
import { useTheme } from "next-themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (    
  <ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
<OtherProviders>{children}</OtherProviders>
  </ThemeProvider>
  );
}
/**
 * ClerkProvider: Provides authentication context to your app using Clerk
 * ConvexProviderWithClerk: Integrates Convex with Clerk authentication
 * children: Allows this component to wrap other components
 * useAuth: A hook from Clerk that manages authentication state
 */


function OtherProviders({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}