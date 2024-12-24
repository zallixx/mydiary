import { createUploadthing, type FileRouter } from "uploadthing/next";
import {NextRequest} from 'next/server';
import {CurrentProfile} from "@/lib/auth/current-profile";

const f = createUploadthing();

async function auth(req: NextRequest) {
    const { profile } = await CurrentProfile();
    if (!profile) throw new Error("Не авторизован");
    return { profileId: profile.id };
}

export const ourFileRouter = {
    profilePicture: f(["image", "blob"])
        .middleware(({ req }) => auth(req))
        .onUploadComplete((data) => console.log("file", data)),
    homework: f(["image", "pdf"])
        .middleware(({ req }) => auth(req))
        .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;