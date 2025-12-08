import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button"; 

export const DynamicForm = ({
  fields = [],        
  values = {},        
  errors = {},       
  onChange,          
  onSubmit,           
  submitText = "Enviar",
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">

      {fields.map((field) => (
        <Input
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type || "text"}
          placeholder={field.placeholder || ""}
          required={field.required || false}
          value={values[field.name] || ""}
          onChange={onChange}
          error={errors[field.name]}
        />
      ))}

      <Button type="submit" className="w-full">
        {submitText}
      </Button>
    </form>
  );
};
