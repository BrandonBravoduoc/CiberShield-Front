import Button from "./Button";

const Input = ({ label, type = "text", value,  onChange, className = "", ...props }) => {

    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="mb-2 font-semibold">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            />
        </div>
    );
}