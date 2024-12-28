import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto pt-12">
      <SideNav />
      <div className="pl-20">
        {children}
      </div>
    </div>
  );
}

// Readonly<React.ReactNode> enforces immutability on the children prop, while React.
//ReactNode allows for potential modifications. This can be particularly useful in larger applications where maintaining the integrity of props is important.