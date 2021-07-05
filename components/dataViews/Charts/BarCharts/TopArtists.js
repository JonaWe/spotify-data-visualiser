import { useState, useContext } from 'react';
import Select from 'react-select';
import { ThemeContext } from 'styled-components';
import PlaytimeByCategory from './PlaytimeByCategory';
import {
  getSelectTheme,
  getSelectStyles,
  ChartAndTitleWrapper,
} from '../../Util/Util.elements';

const options = [10, 25, 50, 100].map((value) => ({ label: value, value }));

export default function TopArtists({ dataProcessor }) {
  const [maxArtists, setMaxArtists] = useState(10);
  const theme = useContext(ThemeContext);
  const selectTheme = getSelectTheme(theme);
  const selectStyles = getSelectStyles(theme, '100px');
  return (
    <ChartAndTitleWrapper>
      <h2>Top {maxArtists} Artists by Playtime</h2>
      <PlaytimeByCategory
        data={dataProcessor.getTopArtists(maxArtists)}
        category="artistName"
      />
      <Select
        options={options}
        name="artistDisplayAmount"
        defaultValue={{ label: 10, value: 10 }}
        isSearchable={false}
        styles={selectStyles}
        theme={selectTheme}
        onChange={({ value }) => {
          setMaxArtists(value);
        }}
      />
    </ChartAndTitleWrapper>
  );
}
