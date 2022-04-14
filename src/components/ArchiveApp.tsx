import React from "react";
import "../styles/App.css";
import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageContent,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import CharacterList from "../components/CharacterList";
import CharacterForm from "./CharacterForm";
import CharacterProps from "../utils/CharacterInterface";
import { useContext, useEffect, useState } from "react";
import { getClasses, getRaces } from "../utils/raceAndClassOptions";
import { CharacterContext } from "../utils/CharacterContext";
import SelectOptions from "../utils/SelectOptionInterface";

function App() {
  const { characters } = useContext(CharacterContext);

  useEffect(() => {
    window.localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  return (
    <>
      <EuiPage paddingSize="none" className="App">
        <EuiPageBody>
          <EuiPageHeader iconType="documents" pageTitle="DnD Character Archive">
            <EuiPageContent>
              {characters.length === 0 ? (
                <EuiText>
                  No characters saved yet! Use the form below to start saving
                  your character ideas.
                </EuiText>
              ) : (
                <CharacterList />
              )}
              <EuiSpacer size="xl" />
              <CharacterForm isEdit={false} />
            </EuiPageContent>
          </EuiPageHeader>
        </EuiPageBody>
      </EuiPage>
    </>
  );
}

export default App;
