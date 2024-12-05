"use client";
import { MiniKit } from '@worldcoin/minikit-js'
import { useEffect, useState } from 'react';

const signInWithWallet = async () => {
  if (!MiniKit.isInstalled()) {
    return
  }

  const res = await fetch(`/api/nonce`)
  const { nonce } = await res.json()
  console.log(nonce)

  const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.walletAuth({
    nonce: nonce,
    requestId: '0', // Optional
    expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    statement: 'Test',
  })
  console.log("throw")

  if (finalPayload.status === 'error') {
    return
  } else {
    const response = await fetch('/api/complete-siwe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: finalPayload,
        nonce,
      }),
    })
    const res = await response.json()
    console.log(res)
    return res
  }
}



export const WalletAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    console.log('useEffect')
    // const f = async () => {
    //   const res: any = await signInWithWallet()
    //   if (res?.status === 'success') {
    //     const walletAddress = MiniKit.walletAddress
    //     if (!walletAddress) return
    //     setWalletAddress(walletAddress)
    //     setIsSignedIn(true)
    //   }
    // }
    // const walletAddress = MiniKit.walletAddress

    // if (walletAddress) {
    //   console.log('walletAddress', walletAddress)
    //   setWalletAddress(walletAddress)
    //   setIsSignedIn(true)
    // } else {
    //   console.log('no wallet address')
    //   f()
    // }
  }, [])

  const handleSignIn = async () => {
    const res: any = await signInWithWallet()
    if (res?.status === 'success') {
      const walletAddress = MiniKit.walletAddress
      if (!walletAddress) return
      setWalletAddress(walletAddress)
      setIsSignedIn(true)
      console.log('walletAddress', walletAddress)
      console.log("sign in success")
      return
    }
    console.log("sign in error")
    setIsSignedIn(false)
  }

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Wallet</button>
      <p>Wallet Address: {walletAddress}</p>
    </div>
  );
};
