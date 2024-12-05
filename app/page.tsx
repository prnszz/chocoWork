// //app/page.tsx
// import { PayBlock } from "@/components/Pay";
// import { SignIn } from "@/components/SignIn";
// import { VerifyBlock } from "@/components/Verify";
// import { WalletAuth } from "@/components/WalletAuth";

// export default function Home() {

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
//       <SignIn />
//       <VerifyBlock />
//       <PayBlock />
//       <WalletAuth />
//     </main>
//   );
// }



import LoginFlow from '@/components/LoginFlow';
import Wallet from '@/components/Wallet';

export default function Home() {
  // return <LoginFlow />;
  return <Wallet />;
}