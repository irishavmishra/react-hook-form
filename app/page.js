"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <input
          {...register("email")}
          type="text"
          placeholder="Email"
          className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <div className="text-sm text-red-500 mt-1">
            {errors.email.message}
          </div>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 mt-4 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <div className="text-sm text-red-500 mt-1">
            {errors.password.message}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 px-4 mt-4 text-white rounded-lg ${
            isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && (
          <div className="text-sm text-red-500 mt-2 text-center">
            {errors.root.message}
          </div>
        )}
      </form>
    </div>
  );
}
