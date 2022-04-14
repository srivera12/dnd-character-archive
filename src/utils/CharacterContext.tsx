import React, { createContext, useEffect, useState } from "react";
import CharacterProps from "./CharacterInterface";

interface CharacterContextProps {
  characters: CharacterProps[];
  addCharacter?: Function;
  deleteCharacter?: Function;
  editCharacter?: Function;
  clearCharacters?: Function;
}

const initialCharacters =
  JSON.parse(window.localStorage.getItem("characters") as string) || [];

export const CharacterContext = createContext<CharacterContextProps>({
  characters: initialCharacters,
});

type ContextProps = {
  children: React.ReactNode;
};

export function CharacterProvider({ children }: ContextProps) {
  const [characters, setCharacters] = useState(initialCharacters);

  const addCharacter = (newCharacter: CharacterProps) => {
    const updatedCharacters = [...characters, newCharacter];
    setCharacters(updatedCharacters);
  };

  const deleteCharacter = (date: Date) => {
    const updatedCharacters = characters.filter(
      (character: CharacterProps) => character.createdOn !== date
    );
    setCharacters(updatedCharacters);
  };

  const editCharacter = (updatedCharacter: CharacterProps) => {
    const oldCharacter = characters.find(
      (character: CharacterProps) =>
        character.createdOn === updatedCharacter.createdOn
    );
    const oldCharacterIndex = characters.indexOf(oldCharacter);
    const updatedCharacterList = [
      ...characters.slice(0, oldCharacterIndex),
      updatedCharacter,
      ...characters.slice(oldCharacterIndex + 1),
    ];
    setCharacters(updatedCharacterList);
  };

  const clearCharacters = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    setCharacters(
      JSON.parse(window.localStorage.getItem("characters") as string)
    );
  }, []);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        addCharacter,
        deleteCharacter,
        editCharacter,
        clearCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
