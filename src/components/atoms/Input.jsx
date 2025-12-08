export const Input = ({label,name,type = "text", value, onChange, placeholder = "", error = "", className = "", required = false,}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 rounded-md bg-white/5 text-white
          outline-none border 
          ${error ? "border-red-500" : "border-white/10"} 
          focus:border-indigo-500 transition
          ${className}
        `}
      />

      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};
