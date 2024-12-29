import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import WpmComponent from "@/components/wpmComponent";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Header/>
      <WpmComponent/>
    </div>
  );
}
