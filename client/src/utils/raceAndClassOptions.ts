import axios from 'axios';
import selectOptions from './SelectOptionInterface';

const raceUrl = 'https://www.dnd5eapi.co/api/races/';

interface dndRace {
  index: string;
  name: string;
  url: string;
}

export function getRaces(): selectOptions[] {
  const dndRaceOptions: selectOptions[] = [{ value: 'Undecided', text: 'Undecided' }];
  axios.get(raceUrl).then((response) => {
    const races = response.data.results as dndRace[];
    races.forEach((race) => {
      dndRaceOptions.push({
        value: race.name,
        text: race.name,
      });
    });
  });
  return dndRaceOptions;
}

const classUrl = 'https://www.dnd5eapi.co/api/classes/';

interface dndClass {
  index: string;
  name: string;
  url: string;
}

export function getClasses(): selectOptions[] {
  const dndClassOptions: selectOptions[] = [{ value: 'Undecided', text: 'Undecided' }];
  axios.get(classUrl).then((response) => {
    const classes = response.data.results as dndClass[];
    classes.forEach((dndClass) => {
      dndClassOptions.push({
        value: dndClass.name,
        text: dndClass.name,
      });
    });
  });
  return dndClassOptions;
}
