export default async function getAllPosts() {
    const result = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/allposts`)
    return result.json()
}