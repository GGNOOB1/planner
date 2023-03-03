export function getPayLoad(user) {
  const payload = {
    sub: user.id,
    email: user.email,
  };

  return payload;
}
