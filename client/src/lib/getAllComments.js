export default async function getAllComments(postId) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/all-comments/${postId}`
  );
  return result.json();
}
