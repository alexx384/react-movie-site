import React from 'react';
import styles from './Checkbox.module.css';
import fontStyles from '../../../Font.module.css';

type Props = {
  isInitiallyChecked?: boolean;
  value: string;
  id: string;
  onChange?: (isChecked: boolean, id: string) => void;
};

export const Checkbox = ({
  isInitiallyChecked = false,
  value,
  id,
  onChange,
}: Props) => {
  const [isChecked, setIsChecked] = React.useState(isInitiallyChecked);
  function handleChange() {
    setIsChecked((prev) => !prev);
    onChange?.(!isChecked, id);
  }
  return (
    <label className={styles.container}>
      <input type="checkbox" onChange={handleChange} checked={isChecked} />
      <span className={fontStyles.input}>{value}</span>
    </label>
  );
};
