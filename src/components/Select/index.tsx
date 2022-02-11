import { useFormContext, UseFormRegister } from 'react-hook-form';

interface SelectProps<T extends Record<string, unknown>> {
  name: string & keyof T;
  required?: boolean;
  options: string[];
  settings?: Parameters<UseFormRegister<T>>[1];
}

const Select = <T extends Record<string, unknown>>(props: SelectProps<T>) => {
  const { register, formState } = useFormContext();

  const { name, required = false, options, settings } = props;

  return (
    <div className="mb-3">
      <label htmlFor={name}>Terrain</label>
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

      {formState.errors[name] && <span>{formState.errors[name]}</span>}
    </div>
  );
};

export default Select;
