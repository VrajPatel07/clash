import { DefaultSession, DefaultJWT } from "next-auth"

declare module "next-auth" {
    interface Session {
        user : {
            id : string;
            email : string
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        userId? : string;
        email? : string
    }
}