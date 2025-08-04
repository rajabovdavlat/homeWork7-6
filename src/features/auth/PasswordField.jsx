import React, { useState } from "react";

export default function PasswordField({
  label = "Пароль",
  value,
  onChange,
  name = "password",
  placeholder = "Введите пароль",
  error,
}) {
  const [show, setShow] = useState(false);

  return (
    <label className="block mb-4">
      <span className="mb-1 block text-sm text-gray-600">{label}</span>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-md border px-3 py-2 pr-10 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-400 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
        >
          {show ? "🙈" : "👁"}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </label>
  );
}
