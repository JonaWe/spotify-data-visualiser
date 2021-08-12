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

export default function TopTracks({ dataProcessor, innerRef }) {
  const [maxTracks, setMaxTracks] = useState(10);

  const theme = useContext(ThemeContext);
  const selectTheme = getSelectTheme(theme);
  const selectStyles = getSelectStyles(theme, '100px');

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(dataProcessor.getTopTracks(maxTracks));
  }, [maxTracks]);

  if (!data) return <CustomLoader />;
  return (
    <ChartAndTitleWrapper ref={innerRef} id="topTracks">
      <h2>Top {maxTracks} Tracks by Playtime</h2>
      <PlaytimeByCategory
        data={data}
        category="trackName"
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
            setMaxTracks(value);
          }}
        />
      </SelectWrapper>
    </ChartAndTitleWrapper>
  );
}
