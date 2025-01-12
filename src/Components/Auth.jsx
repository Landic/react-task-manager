import React, { useState } from "react";

const AuthForm = ({ onAuth, type }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = type === "login" ? "/api/auth/login" : "/api/auth/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.text();
      setMessage(result);
      if (type === "login") onAuth(username); // Если логин успешен, передаем имя пользователя родителю
    } catch (error) {
      setMessage(error.message || "Ошибка");
    }
  };

  return (
    <div>
      <h2>{type === "login" ? "Вход" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{type === "login" ? "Войти" : "Зарегистрироваться"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthForm;
