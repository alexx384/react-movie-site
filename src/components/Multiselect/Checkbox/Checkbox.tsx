import React from 'react';
import styles from './Checkbox.module.css';
import fontStyles from '../../../Font.module.css';
import classNames from 'classnames';

type Props = {
  isChecked: boolean;
  value: string;
  id: string;
  onChange?: (id: string) => void;
};

export const Checkbox = ({ isChecked, value, id, onChange }: Props) => {
  // const [isChecked, setIsChecked] = React.useState(isChecked);
  function handleChange() {
    // setIsChecked((prev) => !prev);
    onChange?.(id);
  }
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        onChange={handleChange}
        className={classNames({ [styles.checked]: isChecked })}
      />
      <span className={fontStyles.input}>{value}</span>
    </label>
  );
};
