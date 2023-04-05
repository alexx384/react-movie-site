import React from 'react';
import { Portal } from './Portal';
import styles from './Dialog.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import { DIALOG_X_BUTTON } from '../../constants/tests.constants';

export type DialogHandle = {
  showDialog: () => void;
};

type Props = {
  title: string;
  children: React.ReactNode;
  isInitiallyShowed?: boolean;
  onClose?: () => void;
};

export const Dialog = React.forwardRef<DialogHandle, Props>(
  ({ title, children, onClose, isInitiallyShowed = true }, ref) => {
    const [isShowTrap, setIsShowTrap] = React.useState(isInitiallyShowed);
    React.useImperativeHandle(ref, () => ({
      showDialog: () => {
        setIsShowTrap(true);
      },
    }));
    function handleDeactivate() {
      setIsShowTrap(false);
    }
    function handleCloseClick() {
      setIsShowTrap(false);
      onClose?.();
    }
    return (
      <>
        {isShowTrap && (
          <Portal container={document.body}>
            <FocusTrap focusTrapOptions={{ onDeactivate: handleCloseClick }}>
              <div className={styles.modal}>
                <div className={styles.block}>
                  <button
                    className={styles['close-btn']}
                    onClick={handleDeactivate}
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
            </FocusTrap>
          </Portal>
        )}
      </>
    );
  }
);
