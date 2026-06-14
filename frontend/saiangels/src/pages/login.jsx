import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // ✅ store token
    localStorage.setItem("token", data.token);

    navigate("/admin");

  } catch (err) {
    console.error(err);
    alert("Error logging in");
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="card p-4" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;