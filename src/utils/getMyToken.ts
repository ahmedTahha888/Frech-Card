
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const myCookies = await cookies();

  const tokenFromCookies = myCookies.get("next-auth.session-token")?.value;

  console.log("tokenFromCookies", tokenFromCookies);

  if (!tokenFromCookies) {
    return null;
  }

  const myTokenAfterDecoded = await decode({
    token: tokenFromCookies,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log("myTokenAfterDecoded", myTokenAfterDecoded);

  if (!myTokenAfterDecoded) {
    return null;
  }

  return myTokenAfterDecoded.realTokenFromBackEnd;
}