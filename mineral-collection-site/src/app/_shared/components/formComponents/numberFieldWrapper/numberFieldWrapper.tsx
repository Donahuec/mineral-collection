'use client';
import type { NumberFieldProps, ValidationResult } from 'react-aria-components';
import { Minus, Plus } from 'lucide-react';
import { Button, FieldError, Group, Input, Label, NumberField, Text } from 'react-aria-components';

import iconButtonStyles from '@/app/_shared/styles/iconButton.module.css';

import styles from './numberFieldWrapper.module.css';

interface NumberFieldWrapperProps extends NumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  inline?: boolean;
}

export default function NumberFieldWrapper({
  label,
  description,
  errorMessage,
  ...props
}: NumberFieldWrapperProps) {
  return (
    <NumberField {...props} className={styles.numberField}>
      <Label className={styles.label}>{label}</Label>
      <Group className={styles.group}>
        <Button
          slot='decrement'
          className={`${iconButtonStyles.iconButton} ${styles.button}`}>
          <Minus />
        </Button>
        <Input className={styles.input} />
        <Button
          slot='increment'
          className={`${iconButtonStyles.iconButton} ${styles.button}`}>
          <Plus />
        </Button>
      </Group>
      {description && <Text slot='description'>{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </NumberField>
  );
}
