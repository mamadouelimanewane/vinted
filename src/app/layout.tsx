import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torodo-Avenue - Marketplace Premium au Sénégal",
  description: "La première marketplace premium de seconde main au Sénégal. Achetez et vendez des articles d'exception.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
