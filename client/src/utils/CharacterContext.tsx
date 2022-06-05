import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import CharacterProps from './CharacterInterface';

export type FilteringProps = {
  isFiltering: boolean;
  characterRace: string;
  characterClass: string;
};

interface CharacterContextProps {
  isLoading: boolean;
  characters?: CharacterProps[];
  addCharacter?: Function;
  deleteCharacter?: Function;
  editCharacter?: Function;
  clearCharacters?: Function;
  filterCharacters?: Function;
  isFiltering: boolean;
  setIsFiltering?: Function;
}

export const CharacterContext = createContext<CharacterContextProps>({ isLoading: true, isFiltering: false });

type ContextProps = {
  children: React.ReactNode;
};

export function CharacterProvider({ children }: ContextProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState();
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    syncStateToDB();
  }, [isFiltering]);

  const syncStateToDB = (characterRace?: string, characterClass?: string) => {
    if (characterRace && characterClass) {
      setIsLoading(true);
      axios
        .get(`http://localhost:3001/characters?dndRace=${characterRace}&dndClass=${characterClass}`)
        .then((res) => {
          setCharacters(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (characterRace && !characterClass) {
      setIsLoading(true);
      axios
        .get(`http://localhost:3001/characters?dndRace=${characterRace}`)
        .then((res) => {
          setCharacters(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!characterRace && characterClass) {
      setIsLoading(true);
      axios
        .get(`http://localhost:3001/characters?dndClass=${characterClass}`)
        .then((res) => {
          setCharacters(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoading(true);
      axios
        .get(`http://localhost:3001/characters`)
        .then((res) => {
          setCharacters(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addCharacter = (newCharacter: CharacterProps) => {
    axios
      .post('http://localhost:3001/characters', newCharacter)
      .then((res) => {
        setIsFiltering(false);
        syncStateToDB();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCharacter = (id: string) => {
    axios
      .delete(`http://localhost:3001/characters/${id}`)
      .then((res) => {
        setIsFiltering(false);
        syncStateToDB();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editCharacter = (id: string, updatedCharacter: CharacterProps) => {
    axios
      .patch(`http://localhost:3001/characters/${id}`, updatedCharacter)
      .then((res) => {
        setIsFiltering(false);
        syncStateToDB();
      })
      .catch((err) => {
        console.log(id, updatedCharacter);
        console.log(err);
      });
  };

  const clearCharacters = () => {
    axios
      .delete('http://localhost:3001/characters')
      .then((res) => {
        setIsFiltering(false);
      })
      .catch((err) => {
        console.log(err);
      });
    syncStateToDB();
    window.location.reload();
  };

  const filterCharacters = (characterRace?: string, characterClass?: string) => {
    syncStateToDB(characterRace, characterClass);
  };

  return (
    <CharacterContext.Provider
      value={{
        isLoading,
        characters,
        addCharacter,
        deleteCharacter,
        editCharacter,
        clearCharacters,
        filterCharacters,
        isFiltering,
        setIsFiltering,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
