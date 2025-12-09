import { useState} from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { set } from "react-hook-form";

const DynamicForm = ({ fields = [], onSubmit, buttonText = "Enviar", serverErrors = {}}) => {

    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => { {
            acc[field.name] = "";
            return acc;
        }}, {})
    );


    const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    setFormData({
        ...formData,
        [name]: type === "file" ? files[0] : value,
    });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
        
        {serverErrors.general && (
            <div className="text-red-600 text-sm bg-red-100 px-3 py-2 rounded">
            {serverErrors.general}
            </div>
        )}

        {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
            
            <Input
                label={field.label}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
            />
            {serverErrors[field.name] && (
                <span className="text-red-500 text-sm mt-1">
                {serverErrors[field.name]}
                </span>
            )}
            </div>
        ))}

        <Button type="submit" className="w-full">
            {buttonText}
        </Button>
        </form>
        );
    };

    export default DynamicForm;