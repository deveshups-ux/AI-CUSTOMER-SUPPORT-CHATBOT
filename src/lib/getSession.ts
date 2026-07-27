import { cookies } from "next/headers";
import { scaleKit } from "./scalekit";

export async function getSession() {
  const session = await cookies();
  const token = session.get("access_token")?.value;
  if (!token) {
    return null;
  }
  try {
    const result: any = await scaleKit.validateToken(token);
    const user = await scaleKit.user.getUser(result.sub);
    return user;
  } catch (error) {
    console.log(error);
  }
}
