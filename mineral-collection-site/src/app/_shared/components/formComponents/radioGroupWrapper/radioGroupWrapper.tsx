'use client';
import type { RadioGroupProps, ValidationResult } from 'react-aria-components';
import { FieldError, Label, Radio, RadioGroup, Text } from 'react-aria-components';

import styles from './radioGroupWrapper.module.css';

interface RadioGroupWrapperProps extends Omit<RadioGroupProps, 'children'> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioWrapper({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Radio value={value} className={styles.radio}>
      {children}
    </Radio>
  );
}

export default function RadioGroupWrapper({
  label,
  description,
  errorMessage,
  children,
  ...props
}: RadioGroupWrapperProps) {
  return (
    <RadioGroup {...props} className={styles.radioGroup}>
      <Label className={styles.label}>{label}</Label>
      {children}
      {description && <Text slot='description'>{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RadioGroup>
  );
}
