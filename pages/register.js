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

    const payload = {
      userName: data.userName,
      password: data.password,
      password2: data.confirmPassword
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      let json = {};
      try {
        json = await res.json();
      } catch (_) {
        json = {};
      }

      if (!res.ok) {
        const msg =
          typeof json.message === "string"
            ? json.message
            : JSON.stringify(json.message || "Registration failed");
        setServerError(msg);
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      setServerError("Network error, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Register</h1>
      <p className="text-muted">Create a new account for the Books app.</p>

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
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            })}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>

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

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
