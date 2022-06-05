import { EuiPage, EuiPageBody, EuiPageContent, EuiPageHeader, EuiSpacer, EuiText } from '@elastic/eui';
import React, { useContext } from 'react';
import CharacterList from '../components/CharacterList';
import '../styles/App.css';
import { CharacterContext } from '../utils/CharacterContext';
import CharacterForm from './CharacterForm';
import FilteringForm from './FilterForm';

function App() {
  const { isLoading, characters } = useContext(CharacterContext);

  return (
    <>
      <EuiPage paddingSize="none" className="App">
        <EuiPageBody>
          <EuiPageHeader iconType="documents" pageTitle="DnD Character Archive">
            <EuiPageContent>
              <EuiText>Your Saved Character Ideas</EuiText>
              <FilteringForm />
              <EuiSpacer />
              {isLoading ? (
                <EuiText>Loading...</EuiText>
              ) : characters && characters.length === 0 ? (
                <EuiText>
                  No characters found! Use the form below to add a character, or change the filtering options above.
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
