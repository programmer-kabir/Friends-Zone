"use server"

import { signIn, signOut } from "@/src/auth";


export async function doSocialLogin(fromData) {
    const action = fromData.get('action')
    console.log(action);
    await signIn(action,{redirectTo:"/"})
}

export async function doLogOut() {
        await signOut()
}