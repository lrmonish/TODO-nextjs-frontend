'use client';


import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "./_state/store"
import { Provider } from 'react-redux';

import Nav from './_nav/page';


const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Nav/>
      </header>
      {children}

      </body>
      </html>
       </Provider>
  );
}
