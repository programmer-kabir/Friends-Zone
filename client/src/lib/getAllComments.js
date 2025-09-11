export default async function getAllComments() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_LOCALHOST_LINK}/all-comments`
  );
  return result.json();
}
