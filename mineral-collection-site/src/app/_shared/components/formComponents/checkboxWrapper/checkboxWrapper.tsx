import { Checkbox, CheckboxProps } from 'react-aria-components';

import styles from './checkboxWrapper.module.css';

export default function CheckboxWrapper({ children, ...props }: CheckboxProps) {
  return (
    <Checkbox {...props} className={styles.checkboxWrapper}>
      {({ isIndeterminate }) => (
        <>
          <div className={styles.checkbox}>
            <svg viewBox='0 0 18 18' aria-hidden='true'>
              {isIndeterminate ? (
                <rect x={1} y={7.5} width={15} height={3} />
              ) : (
                <polyline points='1 9 7 14 15 4' />
              )}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}
