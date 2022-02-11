import { useFormContext, UseFormRegister } from 'react-hook-form';

interface SelectProps<T extends Record<string, unknown>> {
  name: string & keyof T;
  label: string;
  required?: boolean;
  options: string[];
  settings?: Parameters<UseFormRegister<T>>[1];
}

const Select = <T extends Record<string, unknown>>(props: SelectProps<T>) => {
  const { register, formState } = useFormContext();

  const { name, label, required = false, options, settings } = props;

  return (
    <div className="mb-3 d-flex flex-column">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        {...register(name, {
          ...settings,
          required,
        })}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {formState.errors[name] && (
        <span className="text-danger my-1" style={{ fontSize: 14 }}>
          {formState.errors[name].message}
        </span>
      )}
    </div>
  );
};

export default Select;
