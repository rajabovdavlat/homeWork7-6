const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fakeLogin({ email, password }) {
  await sleep(700);
  if (email === "test@test.com" && password === "123456") {
    return {
      user: { id: 1, email, name: "Test User" },
      token: "jwt_login_token",
    };
  }
  throw new Error("Неверный логин или пароль");
}

export async function fakeRegister({ username, email, password }) {
  await sleep(900);
  return {
    user: { id: 2, email, name: username || email },
    token: "jwt_register_token",
  };
}

