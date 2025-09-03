export default async function getAllUsers() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/allusers`)
    return result.json()
}