import { useFormContext, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends Record<string, unknown>> {
  name: string & keyof T;
  label: string;
  required?: boolean;
  settings?: Parameters<UseFormRegister<T>>[1];
}

const Input = <T extends Record<string, unknown>>(props: InputProps<T>) => {
  const { register, formState } = useFormContext();

  const { name, label, required = false, settings } = props;

  return (
    <div className="mb-3 d-flex flex-column">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...register(name, {
          ...settings,
          required,
        })}
      />

      {formState.errors[name] && (
        <span className="text-danger my-1" style={{ fontSize: 14 }}>
          {formState.errors[name].message}
        </span>
      )}
    </div>
  );
};

export default Input;
