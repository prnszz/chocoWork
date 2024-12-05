import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
    MiniAppWalletAuthSuccessPayload,
    verifySiweMessage,
} from "@worldcoin/minikit-js";

interface IRequestPayload {
    payload: MiniAppWalletAuthSuccessPayload;
    nonce: string;
}

export const POST = async (req: NextRequest) => {
    const { payload, nonce }: any = (await req.json()) as IRequestPayload;
    if (nonce != cookies().get("siwe")?.value) {
        return NextResponse.json({
            status: "error",
            isValid: false,
            message: "Invalid nonce",
        });
    }
    try {
        // const validMessage = await verifySiweMessage(
        //     {
        //         address: payload.address,
        //         signature: payload.signature,
        //         status: "success",
        //         version: Number(payload.version),
        //         message: `${payload.domain} wants you to sign in with your Ethereum account:
        //         ${payload.address}
        //         Sign in with World ID
        //         URI: ${payload.uri}
        //         Version: 1
        //         Chain ID: 10
        //         Nonce: ${nonce}
        //         Issued At: ${payload.issuedAt}
        //         Expiration Time: ${payload.expirationTime}`,
        //     },
        //     nonce
        // );
        return NextResponse.json({
            status: "success",
            // isValid: validMessage.isValid,
            isValid: true,
        });
    } catch (error: any) {
        // Handle errors in validation or processing
        return NextResponse.json({
            status: "error",
            isValid: false,
            message: error.message,
        });
    }
};
