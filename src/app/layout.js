import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css"; 
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BookNook | Online Library Project",
  description: "A small online library management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-base-100 antialiased`}>


        <ThemeProvider>
          <Navbar />

        
          
          <main className="flex-grow max-w-7xl w-full mx-auto p-0">
            {children}
          </main>

         
          <Footer />
        </ThemeProvider>

      </body>
    </html>
  );
}
