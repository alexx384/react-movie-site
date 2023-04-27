import React from 'react';
import styles from './Multiselect.module.css';
import classNames from 'classnames';
import { Checkbox } from './Checkbox';
import fontStyles from '../../Font.module.css';
import {
  TRIANGLE_UP,
  TRIANGLE_DOWN,
} from '../../constants/multiselect.constants';
import { FORM_MOVIE_GENRE } from '../../constants/tests.constants';

export type GenreOption = {
  id: string;
  value: string;
};

export type Props = {
  options: GenreOption[];
  placeholder: string;
  initiallySelectedOptions: Set<string>;
  onChange: (genres: Set<string>) => void;
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

export const Multiselect = ({
  options,
  placeholder,
  initiallySelectedOptions,
  onChange,
}: Props) => {
  const [isShowOptionList, setIsShowOptionList] = React.useState(false);
  const selectOptionSet = initiallySelectedOptions;
  const handleCloseOptionList = () => {
    setIsShowOptionList(false);
  };
  const handleChange = (id: string, isChecked: boolean) => {
    const newOptionDict = new Set<string>(selectOptionSet);
    if (isChecked) {
      newOptionDict.add(id);
    } else {
      newOptionDict.delete(id);
    }
    onChange(newOptionDict);
  };
  return (
    <OutsideAlerter outsideClick={handleCloseOptionList}>
      <div className={styles['multi-select-container']}>
        <button
          type="button"
          onClick={() => setIsShowOptionList((prev) => !prev)}
          className={classNames(styles['options-wrapper'], fontStyles.input)}
          data-testid={FORM_MOVIE_GENRE}
        >
          {selectOptionSet.size !== 0
            ? options
                .filter((option) => selectOptionSet.has(option.id))
                .map((option) => option.value)
                .join(', ')
            : placeholder}
        </button>
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
            {options.map((entry) => (
              <div key={entry.id} className={styles.option}>
                <Checkbox
                  id={entry.id}
                  value={entry.value}
                  isChecked={selectOptionSet.has(entry.id)}
                  onChange={handleChange}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </OutsideAlerter>
  );
};
