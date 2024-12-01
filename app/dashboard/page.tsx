import { redirect } from "next/navigation";
//This allows the user to automatically redirect to the page.tsx inside /documents folder when user comes to /dashboard or the page.tsx inside dashboard folder
export default function DashboardPage() {
  redirect("/dashboard/documents");
}