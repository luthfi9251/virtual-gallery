"use server";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const signOutAction = async () => {
    await signOut({ redirect: true, redirectTo: "/a" });
    revalidatePath("/", "layout");
    redirect("/");
};
