import { EuiButton, EuiCard, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiText } from '@elastic/eui';
import React, { FC, useContext, useState } from 'react';
import ReactHTMLParser from 'react-html-parser';
import { CharacterContext } from '../utils/CharacterContext';
import CharacterProps from '../utils/CharacterInterface';
import CharacterForm from './CharacterForm';

const Character: FC<CharacterProps> = ({
  createdAt,
  name,
  backstory,
  characterRace,
  characterClass,
  inUse,
  _id,
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
          title={`${name}`}
          description={
            <>
              <EuiText>
                {characterRace} {characterClass}
              </EuiText>
              <EuiSpacer size="s" />
              <EuiText>{ReactHTMLParser(backstory)}</EuiText>
            </>
          }
          footer={
            <>
              <EuiText>{`Created on: ${new Date(createdAt).toLocaleString()}`}</EuiText>
              <EuiText>Character {!inUse && 'Not'} In Use</EuiText>
              <EuiFlexGroup gutterSize="s" alignItems="center" justifyContent="center">
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
                      deleteCharacter && deleteCharacter(_id);
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
          name={name}
          backstory={backstory}
          characterRace={characterRace}
          characterClass={characterClass}
          inUse={inUse}
          toggleEdit={toggleEdit}
          isEdit={true}
          _id={_id}
        />
      )}
    </>
  );
};

export default Character;
