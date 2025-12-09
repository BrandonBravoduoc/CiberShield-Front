import Button from "./Button";

const Input = ({ label, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-100">
        {label}
      </label>

      <input
        {...props}
        className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-indigo-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm"
      />
    </div>
  );
};

export default Input;
