import { useState, useEffect } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Selector from "../molecules/Selector";

const DynamicForm = ({
  fields = [],
  onSubmit,
  buttonText = "Enviar",
  serverErrors = {},
  initialValues = {},
  onFieldChange = null,
  onCancel = null
}) => {

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initial = {};

    fields.forEach((field) => {
      initial[field.name] = initialValues[field.name] ?? "";
    });

    initial["regionId"] = initialValues.regionId ?? "";
    initial["communeId"] = initialValues.communeId ?? "";

    setFormData(initial);
  }, [JSON.stringify(initialValues)]);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value
    });

    if (onFieldChange) onFieldChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const rows = {};
  fields.forEach((field) => {
    const rowIndex = field.row || 0;

    if (!rows[rowIndex]) rows[rowIndex] = [];
    rows[rowIndex].push(field);
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      {serverErrors?.general && (
        <div className="text-red-600 text-sm bg-red-100 px-3 py-2 rounded">
          {serverErrors.general}
        </div>
      )}

      {Object.keys(rows).map((rowIndex) => {
        const rowFields = rows[rowIndex];

        return (
          <div
            key={rowIndex}
            className={`grid grid-cols-1 md:grid-cols-${rowFields.length} gap-4`}
          >
            {rowFields.map((field) => (
              <div key={field.name} className="flex flex-col">

                {field.type === "region-commune" ? (
                  <Selector
                    regionValue={formData.regionId}
                    communeValue={formData.communeId}
                    onChange={(changes) =>
                      setFormData({ ...formData, ...changes })
                    }
                  />
                ) : (
                  <Input
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                )}

                {serverErrors?.[field.name] && (
                  <span className="text-red-500 text-sm mt-1">
                    {serverErrors[field.name]}
                  </span>
                )}
              </div>
            ))}
          </div>
        );
      })}

      <div className="flex justify-between mt-4">

        {onCancel && (
          <Button
            type="button"
            className="bg-gray-700 hover:bg-gray-600 w-40"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}

        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 w-40 ml-auto"
        >
          {buttonText}
        </Button>

      </div>

    </form>
  );
};

export default DynamicForm;
