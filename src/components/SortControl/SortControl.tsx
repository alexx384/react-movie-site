import styles from './SortControl.module.css';
import React from 'react';

type Props = {
  options: string[];
  selectedOption: string;
  onSelect?: (option: string) => {};
};

export const SortControl = ({ options, selectedOption, onSelect }: Props) => {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onSelect?.(event.target.value);
  }

  return (
    <div>
      <label htmlFor="sort-criteria">SORT BY</label>
      <select
        id="sort-criteria"
        onChange={handleChange}
        defaultValue={selectedOption}
      >
        {options.map((optionName) => (
          <option key={optionName}>{optionName}</option>
        ))}
      </select>
    </div>
  );
};
