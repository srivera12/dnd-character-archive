import { EuiPanel, EuiSpacer, EuiText } from "@elastic/eui";
import React, { FC, useContext } from "react";
import { CharacterContext } from "../utils/CharacterContext";
import Character from "./Character";

const CharacterList: FC = (): JSX.Element => {
  const { characters } = useContext(CharacterContext);
  return (
    <EuiPanel>
      <EuiText>Your Saved Character Ideas</EuiText>
      <EuiSpacer />
      {characters.map((character, i) => (
        <>
          <Character
            key={i}
            createdOn={character.createdOn}
            name={character.name}
            backstory={character.backstory}
            characterRace={character.characterRace}
            characterClass={character.characterClass}
            inUse={character.inUse}
          />
          <EuiSpacer key={character.createdOn.toString()} />
        </>
      ))}
    </EuiPanel>
  );
};

export default CharacterList;
