async function login(email: string, password: string) {
  const res = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  });
  console.log(res);
}

export const AuthApi = {
  login
};
