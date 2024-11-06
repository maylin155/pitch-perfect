import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'easymde/dist/easymde.min.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: '900',
      style: 'normal'
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: '800',
      style: 'normal'
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: '700', // Typical weight for 'Bold'
      style: 'normal'
    },
    {
      path: './fonts/WorkSans-Regular.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/WorkSans-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/WorkSans-Light.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/WorkSans-ExtraLight.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: './fonts/WorkSans-Thin.ttf',
      weight: '200',
      style: 'normal'
    }
  ],
  variable: '--font-work-sans'
});


const changa = localFont({
  src: "./fonts/Changa One.ttf",
  variable: '--font-changa'
})



export const metadata: Metadata = {
  title: "Pitch Perfect",
  description: "Pitch, Vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${changa.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
