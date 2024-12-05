'use client';

import React, { useState } from 'react';
import Image from "next/image";

const Wallet = () => {
  return(
    <main className="flex min-h-screen flex-col p-4 bg-white">
      <div className="flex justify-start items-center">
        <Image src="/logo.png" width={31} height={30} alt="logo" />
        <span className="text-sm text-gray-600">coinを交換する！</span>
      </div>
      <div className="flex justify-center">
          <div className="flex w-14 h-10 bg-orange-500 rounded justify-center" />
      </div>
    </main>
  );
}

export default Wallet;