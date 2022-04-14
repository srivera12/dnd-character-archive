import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiSelect,
  EuiButton,
  EuiCheckbox,
  EuiTextArea,
  EuiSuperDatePicker,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import React, { FC, FormEvent, useContext, useEffect, useState } from "react";
import CharacterProps from "../utils/CharacterInterface";
import SelectOptions from "../utils/SelectOptionInterface";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getClasses, getRaces } from "../utils/raceAndClassOptions";
import { CharacterContext } from "../utils/CharacterContext";

interface FormProps {
  createdOn?: Date;
  name?: string;
  backstory?: string;
  characterRace?: string;
  characterClass?: string;
  inUse?: boolean;
  toggleEdit?: Function;
  isEdit: boolean;
}

const dndRaces = getRaces();
const dndClasses = getClasses();

const CharacterForm: FC<FormProps> = ({
  name,
  characterRace,
  characterClass,
  backstory,
  createdOn,
  inUse,
  isEdit,
  toggleEdit,
}): JSX.Element => {
  const initialCharacterData = {
    nameData: isEdit ? name : "",
    raceData: isEdit ? characterRace : "",
    dndClassData: isEdit ? characterClass : "",
    backstoryData: isEdit ? backstory : "",
    inUseData: isEdit ? inUse : false,
  };

  const [characterData, setCharacterData] = useState(initialCharacterData);
  const { nameData, raceData, dndClassData, backstoryData, inUseData } =
    characterData;

  const { addCharacter, editCharacter, clearCharacters } =
    useContext(CharacterContext);

  const submitCharacter = () => {
    const character = {
      name: nameData,
      createdOn: createdOn ? createdOn : new Date(),
      characterClass: dndClassData,
      characterRace: raceData,
      inUse: inUseData,
      backstory: backstoryData,
    };
    if (isEdit && editCharacter && toggleEdit) {
      editCharacter(character);
      toggleEdit();
    } else if (!isEdit && addCharacter) {
      addCharacter(character);
    }
    setCharacterData({
      nameData: "",
      raceData: "",
      dndClassData: "",
      backstoryData: "",
      inUseData: false,
    });
  };

  return (
    <EuiForm component="form" onSubmit={submitCharacter}>
      <EuiFormRow>
        <EuiText size="m">
          {isEdit ? `Editing: ${name}` : "Add Character Here"}
        </EuiText>
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
          onChange={() => {
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
