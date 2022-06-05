import { EuiButton, EuiCheckbox, EuiForm, EuiFormRow, EuiSelect } from '@elastic/eui';
import React, { FC, SyntheticEvent, useContext, useState } from 'react';
import { CharacterContext } from '../utils/CharacterContext';
import { getClasses, getRaces } from '../utils/raceAndClassOptions';

const dndRaces = getRaces();
const dndClasses = getClasses();

const FilteringForm: FC = (): JSX.Element => {
  const { filterCharacters, isFiltering, setIsFiltering } = useContext(CharacterContext);
  const [filteringOptions, setFilteringOptions] = useState({ characterRace: '', characterClass: '' });
  const { characterClass, characterRace } = filteringOptions;

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    filterCharacters && filterCharacters(characterRace, characterClass);
  };

  return (
    <EuiForm component="form" onSubmit={onSubmit}>
      <>
        <EuiFormRow>
          <EuiCheckbox
            id="filtering-checkbox"
            label="Filter Characters?"
            checked={isFiltering}
            onChange={(e) => {
              setIsFiltering && setIsFiltering(!isFiltering);
            }}
          />
        </EuiFormRow>
        {isFiltering && (
          <>
            <EuiFormRow label="Filter by Character Race">
              <EuiSelect
                options={dndRaces}
                value={characterRace}
                onChange={(e) => {
                  setFilteringOptions({ ...filteringOptions, characterRace: e.target.value });
                }}
              ></EuiSelect>
            </EuiFormRow>
            <EuiFormRow label="Filter by Character Class">
              <EuiSelect
                options={dndClasses}
                value={characterClass}
                onChange={(e) => {
                  setFilteringOptions({ ...filteringOptions, characterClass: e.target.value });
                }}
              ></EuiSelect>
            </EuiFormRow>
            <EuiButton fill color="success" type="submit">
              Filter
            </EuiButton>
          </>
        )}
      </>
    </EuiForm>
  );
};

export default FilteringForm;
