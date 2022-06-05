import { EuiPanel, EuiSpacer } from '@elastic/eui';
import React, { FC, useContext } from 'react';
import { CharacterContext } from '../utils/CharacterContext';
import Character from './Character';

const CharacterList: FC = (): JSX.Element => {
  const { characters } = useContext(CharacterContext);

  return (
    <EuiPanel>
      {characters &&
        characters.map((character, i) => (
          <>
            <Character
              key={character._id}
              createdAt={character.createdAt}
              updatedAt={character.updatedAt}
              name={character.name}
              backstory={character.backstory}
              characterRace={character.characterRace}
              characterClass={character.characterClass}
              inUse={character.inUse}
              _id={character._id}
            />
            <EuiSpacer key={i} />
          </>
        ))}
    </EuiPanel>
  );
};

export default CharacterList;
