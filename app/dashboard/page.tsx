import { redirect } from "next/navigation";
//This allows the user to automatically redirect to the documents page.tsx when user comes to dashboard page.tsx
export default function DashboardPage() {
  redirect("/dashboard/documents");
}