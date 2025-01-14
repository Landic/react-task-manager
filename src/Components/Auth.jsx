import React, { useState } from "react";

const Auth = ({ onAuth, type }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/auth/${type === "login" ? "login" : "register"}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });
  
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text);
      }
  
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }
  
      setMessage(result.message || "Success");
      
      // Перенаправление после успешного действия
      if (type === "login") {
        onAuth(username);
        window.location.href = "/tasks"; // Переход при логине
      } else {
        // Переход после регистрации
        setTimeout(() => {
          window.location.href = "/tasks";
        }, 1000); // Можно добавить небольшую задержку для отображения сообщения
      }
    } catch (error) {
      setMessage(error.message || "Error");
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
        <button type="submit">{type === "login" ? "Log in" : "Sign up"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
