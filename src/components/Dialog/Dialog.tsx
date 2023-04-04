import React from 'react';
import { createPortal } from 'react-dom';
import styles from './Dialog.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import { DIALOG_X_BUTTON } from '../../constants/tests.constants';

type Props = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
};

export const Dialog = ({ title, children, onClose }: Props) => {
  function handleCloseClick() {
    onClose?.();
  }

  return createPortal(
    <FocusTrap focusTrapOptions={{ onDeactivate: handleCloseClick }}>
      <div className={styles.modal}>
        <div className={styles.block}>
          <button
            className={styles['close-btn']}
            onClick={handleCloseClick}
            data-testid={DIALOG_X_BUTTON}
          >
            🗙
          </button>
          <h1 className={classNames(fontStyles.title, styles.title)}>
            {title}
          </h1>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
};
