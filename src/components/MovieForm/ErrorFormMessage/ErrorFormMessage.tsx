import styles from './ErrorMessage.module.css';
import fontStyles from '../../../Font.module.css';
import classNames from 'classnames';

export const ErrorFormMessage = ({ message }: { message: string }) => (
  <p className={classNames(fontStyles.subtitle, styles['error-input'])}>
    {message}
  </p>
);
