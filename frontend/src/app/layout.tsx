import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import { Kodchasan } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Kodchasan({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-arp="" suppressHydrationWarning>
      <body
        className={`${inter.className} h-screen overflow-hidden bg-[#ECF0F0]`}
        suppressHydrationWarning
      >
        <SessionWrapper>{children}</SessionWrapper>

        <ToastContainer />
      </body>
    </html>
  );
}
