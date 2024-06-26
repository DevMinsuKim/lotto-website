import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryClientProvider";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

const titleEn = "CloverPick";
const titleKr = "클로버픽";

export const metadata: Metadata = {
  title: {
    default: titleKr,
    template: `%s | ${titleKr}`,
  },
  description: `당첨의 기회를 높이다, ${titleKr}`,
  keywords: [
    "로또",
    "로또 번호 생성",
    "로또 당첨 번호 조회",
    "AI 로또 번호",
    "복권",
    titleKr,
    titleEn,
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ko" className="h-full">
      <body
        className={`${notoSansKR.className} container mx-auto h-full w-full min-w-[320px] max-w-screen-xl break-keep px-6`}
      >
        <ThemeProvider>
          <QueryProvider>
            <div className="flex h-full flex-col">
              <header className="sticky top-0 z-50">
                <NavBar />
              </header>
              <main className="flex-grow">
                {children}
                <SpeedInsights />
              </main>
              <footer>
                <Footer />
              </footer>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
