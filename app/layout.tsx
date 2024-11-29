import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/app/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
