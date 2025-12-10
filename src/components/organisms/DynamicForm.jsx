import { useState, useEffect } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const DynamicForm = ({
  fields = [],
  onSubmit,
  buttonText = "Enviar",
  serverErrors = {},
  initialValues = {},
  onFieldChange = null
}) => {

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initial = {};

    fields.forEach(field => {
      initial[field.name] = initialValues[field.name] ?? "";
    });

    setFormData(initial);

  }, [JSON.stringify(initialValues)]);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    if (onFieldChange) {
      onFieldChange(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      {serverErrors?.general && (
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
            value={formData[field.name] || ""}
            onChange={handleChange}
            options={field.options}
            disabled={field.disabled}
          />

          {serverErrors?.[field.name] && (
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
