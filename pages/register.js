import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);

    // API expects: userName, password, password2
    const payload = {
      userName: data.userName,
      password: data.password,
      password2: data.confirmPassword
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const json = await res.json().catch(() => ({}));
      console.log("Register API response:", res.status, json);

      if (!res.ok) {
        setServerError(json.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Success → redirect to login
      router.push("/login");
    } catch (err) {
      console.error("Network error:", err);
      setServerError("Network error, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Register</h1>
      <p className="text-muted">Create a new account</p>

      {serverError && (
        <div className="alert alert-danger">{serverError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* USERNAME */}
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

        {/* PASSWORD */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            })}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword", {
              required: "Please confirm your password"
            })}
          />
          {errors.confirmPassword && (
            <div className="text-danger">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
