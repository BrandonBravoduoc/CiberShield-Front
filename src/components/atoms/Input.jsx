import Button from "./Button";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  options = [],
  disabled = false,
}) => {
  if (type === "file") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-100 mb-2">
          {label}
        </label>

        <div className="flex justify-center px-6 py-8 border border-dashed border-gray-600 rounded-lg hover:border-indigo-500 transition">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16v-8m0 0l-3 3m3-3l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <label className="mt-4 cursor-pointer font-medium text-indigo-400 hover:text-indigo-300">
              Seleccionar imagen
              <input
                type="file"
                name={name}
                onChange={onChange}
                className="hidden"
              />
            </label>

            <p className="mt-2 text-xs text-gray-500">PNG, JPG hasta 5MB</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-100 mb-1">
            {label}
          </label>
        )}

        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            block w-full rounded-md bg-white/5 px-3 py-1.5 
            text-sm text-white outline outline-white/10
            placeholder-gray-500
            focus:outline-2 focus:outline-indigo-500
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <option value="">Seleccionar...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-100 mb-1">
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        value={type === "file" ? undefined : value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          block w-full rounded-md bg-white/5 px-3 py-1.5 
          text-sm text-white outline outline-white/10
          placeholder-gray-500
          focus:outline-2 focus:outline-indigo-500
        "
      />
    </div>
  );
};

export default Input;

