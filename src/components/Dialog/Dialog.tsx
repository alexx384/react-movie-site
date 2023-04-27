import React from 'react';
import { Portal } from './Portal';
import styles from './Dialog.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import { DIALOG_X_BUTTON } from '../../constants/tests.constants';

export type Props = {
  title: string;
  children: React.ReactNode;
  isOpened?: boolean;
  onClose?: () => void;
};

const useEscapeHandler = (handleHideDialog?: () => void) => {
  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        handleHideDialog?.();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleHideDialog]);
};

export const Dialog = ({
  title,
  children,
  onClose,
  isOpened = true,
}: Props) => {
  // const body = document.querySelector('body');
  // if (isOpened && body) {
  //   body.style.overflow = 'hidden';
  // }
  const handleClose = () => {
    // if (body) {
    //   body.style.overflow = 'auto';
    // }
    onClose?.();
  };
  useEscapeHandler(handleClose);
  return (
    <>
      {isOpened && (
        <Portal container={document.body}>
          <FocusTrap
            focusTrapOptions={{
              escapeDeactivates: false,
            }}
          >
            <div className={styles.modal}>
              <div className={styles.block}>
                <button
                  className={styles['close-btn']}
                  onClick={handleClose}
                  data-testid={DIALOG_X_BUTTON}
                >
                  x
                </button>
                <h1 className={classNames(fontStyles.title, styles.title)}>
                  {title}
                </h1>
                <div className={styles.body}>{children}</div>
              </div>
            </div>
          </FocusTrap>
        </Portal>
      )}
    </>
  );
};
