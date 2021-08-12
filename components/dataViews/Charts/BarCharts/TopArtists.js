import { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import { ThemeContext } from 'styled-components';
import CustomLoader from '../../Util/CustomLoader';
import {
  ChartAndTitleWrapper,
  getSelectStyles,
  getSelectTheme,
  SelectWrapper,
} from '../../Util/Util.elements';
import PlaytimeByCategory from './PlaytimeByCategory';

const options = [10, 25, 50, 100].map((value) => ({ label: value, value }));

export default function TopArtists({ dataProcessor, innerRef }) {
  const [maxArtists, setMaxArtists] = useState(10);
  const [data, setData] = useState(null);

  const theme = useContext(ThemeContext);
  const selectTheme = getSelectTheme(theme);
  const selectStyles = getSelectStyles(theme, '100px');

  useEffect(() => {
    setData(dataProcessor.getTopArtists(maxArtists));
  }, [maxArtists]);

  if (!data) return <CustomLoader />;

  return (
    <ChartAndTitleWrapper ref={innerRef} id="topArtists">
      <h2>Top {maxArtists} Artists by Playtime</h2>
      <PlaytimeByCategory
        data={data}
        category="artistName"
        dataKey="hoursPlayed"
      />
      <SelectWrapper>
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
      </SelectWrapper>
    </ChartAndTitleWrapper>
  );
}
