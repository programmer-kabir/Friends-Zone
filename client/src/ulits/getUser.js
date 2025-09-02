export const getCurrentUser = async (id) => {
  const response = await fetch("http://localhost:5000/allusers");
  const users = await response.json();
  const user = users.find((u) => u._id === id || u.id === id);
  return user;
};
