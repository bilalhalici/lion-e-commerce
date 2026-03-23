import { InputHTMLAttributes } from 'react';
import { FormInputLabel, Input, Group } from './form-input.styles';

type Props = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ label, ...otherProps } : Props) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;