import styles from './Checkbox.module.css';
import fontStyles from '../../../Font.module.css';
import classNames from 'classnames';

export type Props = {
  isChecked: boolean;
  value: string;
  id: string;
  onChange?: (id: string, isChecked: boolean) => void;
};

export const Checkbox = ({ isChecked, value, id, onChange }: Props) => {
  function handleChange() {
    onChange?.(id, !isChecked);
  }
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        onChange={handleChange}
        className={classNames({ [styles.checked]: isChecked })}
        name={value}
      />
      <span className={fontStyles.input}>{value}</span>
    </label>
  );
};
