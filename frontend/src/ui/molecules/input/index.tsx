import { useField } from 'formik';
import React, { memo } from 'react';
import { InputHTMLAttributes } from 'react';
import { Wrapper, Inner, Error } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  width?: string;
};

export const Input: React.FC<InputProps> = ({ width, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && !!meta.error;
  return (
    <Wrapper width={width}>
      <Inner {...field} {...props} isError={isError} />
      {isError && <Error data-testid="error">{meta.error}</Error>}
    </Wrapper>
  );
};
