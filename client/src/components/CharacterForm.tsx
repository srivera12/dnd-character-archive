import {
  EuiButton,
  EuiCheckbox,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiText,
} from '@elastic/eui';
import axios from 'axios';
import React, { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CharacterContext } from '../utils/CharacterContext';
import { getClasses, getRaces } from '../utils/raceAndClassOptions';

interface FormProps {
  name?: string;
  backstory?: string;
  characterRace?: string;
  characterClass?: string;
  inUse?: boolean;
  toggleEdit?: Function;
  isEdit: boolean;
  _id?: string;
}

const dndRaces = getRaces();
const dndClasses = getClasses();

const CharacterForm: FC<FormProps> = ({
  name,
  characterRace,
  characterClass,
  backstory,
  inUse,
  _id,
  isEdit,
  toggleEdit,
}): JSX.Element => {
  const initialCharacterData = {
    nameData: isEdit ? name : '',
    raceData: isEdit ? characterRace : 'Undecided',
    dndClassData: isEdit ? characterClass : 'Undecided',
    backstoryData: isEdit ? backstory : '',
    inUseData: isEdit ? inUse : false,
  };

  const [characterData, setCharacterData] = useState(initialCharacterData);
  const { nameData, raceData, dndClassData, backstoryData, inUseData } = characterData;

  const { addCharacter, editCharacter, clearCharacters } = useContext(CharacterContext);

  const submitCharacter = (e: SyntheticEvent) => {
    e.preventDefault();
    const character = {
      name: nameData,
      characterClass: dndClassData,
      characterRace: raceData,
      inUse: inUseData,
      backstory: backstoryData,
    };
    if (isEdit && editCharacter && toggleEdit) {
      editCharacter(_id, character);
      toggleEdit();
    } else if (!isEdit && addCharacter) {
      addCharacter(character);
    }
    setCharacterData({
      nameData: '',
      raceData: 'Undecided',
      dndClassData: 'Undecided',
      backstoryData: '',
      inUseData: false,
    });
  };

  return (
    <EuiForm component="form" onSubmit={submitCharacter}>
      <EuiFormRow>
        <EuiText size="m">{isEdit ? `Editing: ${name}` : 'Add Character Here'}</EuiText>
      </EuiFormRow>
      <EuiFormRow label="Character Name">
        <EuiFieldText
          value={nameData}
          onChange={(e) => {
            setCharacterData({ ...characterData, nameData: e.target.value });
          }}
        ></EuiFieldText>
      </EuiFormRow>
      <EuiFormRow label="Character Race">
        <EuiSelect
          options={dndRaces}
          value={raceData}
          onChange={(e) => {
            setCharacterData({ ...characterData, raceData: e.target.value });
          }}
        ></EuiSelect>
      </EuiFormRow>
      <EuiFormRow label="Character Class">
        <EuiSelect
          options={dndClasses}
          value={dndClassData}
          onChange={(e) => {
            setCharacterData({
              ...characterData,
              dndClassData: e.target.value,
            });
          }}
        ></EuiSelect>
      </EuiFormRow>
      <EuiFormRow label="Character Backstory" fullWidth>
        <ReactQuill
          value={backstoryData}
          onChange={(e) => {
            setCharacterData({ ...characterData, backstoryData: e });
          }}
        />
      </EuiFormRow>
      <EuiFormRow>
        <EuiCheckbox
          id="in-use-checkbox"
          label="I'm currently using this character in a game."
          checked={inUseData}
          onChange={(e) => {
            console.log('clicked', inUseData);
            setCharacterData({ ...characterData, inUseData: !inUseData });
          }}
        />
      </EuiFormRow>
      <EuiFlexGroup gutterSize="s" alignItems="center" justifyContent="center">
        <EuiFlexItem grow={false}>
          <EuiButton fill color="success" type="submit">
            Save Character
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {!isEdit && (
            <EuiButton
              fill
              color="danger"
              onClick={() => {
                clearCharacters && clearCharacters();
              }}
            >
              Clear All Characters
            </EuiButton>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );
};

export default CharacterForm;
