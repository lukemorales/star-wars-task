import { useFormContext, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends Record<string, unknown>> {
  name: string & keyof T;
  required?: boolean;
  settings?: Parameters<UseFormRegister<T>>[1];
}

const Input = <T extends Record<string, unknown>>(props: InputProps<T>) => {
  const { register, formState } = useFormContext();

  const { name, required = false, settings } = props;

  return (
    <div className="mb-3">
      <label htmlFor={name}>Planet Name</label>
      <input
        id={name}
        {...register('name', {
          ...settings,
          required,
        })}
      />

      {formState.errors[name] && <span>{formState.errors[name]}</span>}
    </div>
  );
};

export default Input;
