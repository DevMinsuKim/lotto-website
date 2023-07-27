import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Providers } from "./Providers";
import SWRConfigContext from "./context/SWRConfigContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className} suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950">
        <Providers>
          <header className="fixed w-full bg-white dark:bg-slate-950 z-10">
            <Navbar />
          </header>

          <main>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
          <footer>
            <Footer />
          </footer>
        </Providers>
        <div id="modal" />
      </body>
    </html>
  );
}
