import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { setToken, readToken } from "../lib/authenticate";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const router = useRouter();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setServerError(null);
    setLoading(true);

    const payload = {
      userName: data.userName,
      password: data.password
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      let json = {};
      try {
        json = await res.json();
      } catch (_) {}

      if (!res.ok) {
        let msg = json.message || "Login failed";
        if (typeof msg === "object") {
          msg = msg.message || "Login failed";
        }
        setServerError(msg);
        setLoading(false);
        return;
      }

      const token = json.token;
      if (!token) {
        setServerError("Login failed: token not returned.");
        setLoading(false);
        return;
      }

      setToken(token);
      console.log("Logged in as:", readToken());
      router.push("/favourites");
    } catch (err) {
      setServerError("Network error, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>

      {serverError && (
        <div className="alert alert-danger" role="alert">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            className="form-control"
            {...register("userName", { required: "User name is required" })}
          />
          {errors.userName && (
            <div className="text-danger">{errors.userName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
