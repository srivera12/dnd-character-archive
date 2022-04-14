import {
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import React, { FC, useContext, useState } from "react";
import ReactHTMLParser from "react-html-parser";
import { CharacterContext } from "../utils/CharacterContext";
import CharacterForm from "./CharacterForm";

interface CharacterProps {
  createdOn: Date;
  name: string;
  backstory: string;
  characterRace: string;
  characterClass: string;
  inUse: boolean;
}

const Character: FC<CharacterProps> = ({
  createdOn,
  name,
  backstory,
  characterRace,
  characterClass,
  inUse,
}): JSX.Element => {
  const { deleteCharacter } = useContext(CharacterContext);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited);
  };

  return (
    <>
      {!isBeingEdited ? (
        <EuiCard
          title={name}
          description={
            <>
              <EuiText>
                {characterClass} {characterRace}
              </EuiText>
              <EuiSpacer size="s" />
              <EuiText>{ReactHTMLParser(backstory)}</EuiText>
            </>
          }
          footer={
            <>
              <EuiText>{`Created on: ${new Date(
                createdOn
              ).toString()}`}</EuiText>
              <EuiText>Character {!inUse && "Not"} In Use</EuiText>
              <EuiFlexGroup
                gutterSize="s"
                alignItems="center"
                justifyContent="center"
              >
                <EuiFlexItem grow={false}>
                  <EuiButton
                    fill
                    color="accent"
                    onClick={() => {
                      setIsBeingEdited(true);
                    }}
                  >
                    Edit Character
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    fill
                    color="danger"
                    onClick={() => {
                      deleteCharacter && deleteCharacter(createdOn);
                    }}
                  >
                    Delete Character
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </>
          }
        ></EuiCard>
      ) : (
        <CharacterForm
          createdOn={createdOn}
          name={name}
          backstory={backstory}
          characterRace={characterRace}
          characterClass={characterClass}
          inUse={inUse}
          toggleEdit={toggleEdit}
          isEdit={true}
        />
      )}
    </>
  );
};

export default Character;
