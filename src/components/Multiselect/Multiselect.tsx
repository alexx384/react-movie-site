import React, { forwardRef } from 'react';
import styles from './Multiselect.module.css';
import classNames from 'classnames';
import { Checkbox } from './Checkbox';
import fontStyles from '../../Font.module.css';

export type Option = {
  id: string;
  value: string;
  isChecked: boolean;
};

type Props = {
  options: Option[];
  placeholder: string;
};

const useOutsideAlerter = (
  ref: React.RefObject<HTMLDivElement>,
  onClickOutside: () => void
) => {
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

/**
 * Component that alerts if you click outside of it
 */
const OutsideAlerter = (props: {
  outsideClick: () => void;
  children: React.ReactNode;
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, props.outsideClick);
  return <div ref={wrapperRef}>{props.children}</div>;
};

type OptionDict = { [key: string]: Option };

export const TRIANGLE_DOWN = '⏷';
export const TRIANGLE_UP = '⏶';

export type MultiselectHandle = {
  getSelectedGenreIds: () => string[];
};

export const Multiselect = forwardRef<MultiselectHandle, Props>(
  ({ options, placeholder }, ref) => {
    const [isShowOptionList, setIsShowOptionList] = React.useState(false);
    const [optionDict, setOptionDict] = React.useState(
      options.reduce((dict: OptionDict, option) => {
        dict[option.id] = option;
        return dict;
      }, {})
    );
    React.useImperativeHandle(ref, () => ({
      getSelectedGenreIds: () => {
        return Object.entries(optionDict)
          .filter((entry) => entry[1].isChecked)
          .map((entry) => entry[0]);
      },
    }));
    const handleCloseOptionList = () => {
      setIsShowOptionList(false);
    };
    const handleChange = (isChecked: boolean, id: string) => {
      setOptionDict((prev) => {
        const result = Object.assign({}, prev);
        const changedItem = Object.assign({}, prev[id]);
        changedItem.isChecked = isChecked;
        result[id] = changedItem;
        return result;
      });
    };
    const checkedEntries = Object.entries(optionDict).filter(
      (entry) => entry[1].isChecked
    );
    return (
      <OutsideAlerter outsideClick={handleCloseOptionList}>
        <div className={styles['multi-select-container']}>
          <div
            onClick={() => setIsShowOptionList((prev) => !prev)}
            className={classNames(styles['options-wrapper'], fontStyles.input)}
          >
            {checkedEntries.length !== 0
              ? checkedEntries.map((entry) => entry[1].value).join(', ')
              : placeholder}
          </div>
          <span
            className={classNames(fontStyles['filter-item'], styles.triangle)}
          >
            {isShowOptionList ? TRIANGLE_UP : TRIANGLE_DOWN}
          </span>
          <div
            className={classNames(styles['option-list-container'], {
              [styles['display-none']]: !isShowOptionList,
            })}
          >
            <ul className={styles['option-container']}>
              {Object.entries(optionDict).map((entry) => (
                <div className={styles.option}>
                  <Checkbox
                    key={entry[0]}
                    id={entry[0]}
                    value={entry[1].value}
                    isInitiallyChecked={entry[1].isChecked}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </ul>
          </div>
        </div>
      </OutsideAlerter>
    );
  }
);
