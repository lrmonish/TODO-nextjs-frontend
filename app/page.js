"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);


  return (
    <main></main>
  );
}
