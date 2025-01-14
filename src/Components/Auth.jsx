import React, { useState } from "react";

const Auth = ({ onAuth, type }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Новое состояние для email
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Формируем URL в зависимости от типа действия (регистрация или вход)
    const url = `http://localhost:8080/api/auth/${type === "login" ? "login" : "register"}`;

    try {
      // Отправляем POST запрос с JSON данными
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }) // Добавляем email в тело запроса
      });

      const text = await response.text(); // Получаем текстовый ответ от сервера
      console.log("Ответ от сервера:", text);

      let data;
      try {
        data = JSON.parse(text); // Преобразуем текст в JSON вручную
      } catch (error) {
        console.error("Ошибка при парсинге JSON:", error);
        setMessage("Invalid server response: " + text); // Если ошибка в парсинге, выводим текст ошибки
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Error"); // Если ошибка на сервере, выбрасываем ошибку с сообщением
      }

      setMessage(data.message || "Success"); // Отображаем сообщение от сервера

      // Переход после успешного действия
      if (type === "login") {
        onAuth(username);
        window.location.href = "/tasks"; // Переход при логине
      } else {
        // Переход после регистрации
        setTimeout(() => {
          window.location.href = "/tasks";
        }, 1000); // Можно добавить задержку для отображения сообщения
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setMessage(error.message || "Error"); // Выводим ошибку при отправке запроса
    }
  };

  return (
    <div className="block-registration">
      <h2>{type === "login" ? "Log in" : "Sign up"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Поле Email всегда видно */}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">{type === "login" ? "Log in" : "Sign up"}</button>
      </form>
      {message && <p>{message}</p>} {/* Выводим сообщение о статусе */}
    </div>
  );
};

export default Auth;
