import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setServerError(null);
    setLoading(true);

    const payload = {
      userName: data.userName,
      password: data.password,
      password2: data.confirmPassword
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      let json = {};
      try { json = await res.json(); } catch {}

      if (!res.ok) {
        let msg = json.message || "Registration failed";
        if (typeof msg === "object") msg = msg.message || "Registration failed";
        setServerError(msg);
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch {
      setServerError("Network error");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      <p className="text-muted">Create a new account for the Books app.</p>

      {serverError && (
        <div className="alert alert-danger">{serverError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            className="form-control"
            {...register("userName", { required: "User name is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: "Password is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword", { required: "Confirm password" })}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
