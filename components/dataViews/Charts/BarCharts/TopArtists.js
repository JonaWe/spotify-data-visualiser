import { useState, useEffect } from 'react';
import useSelectStyles from '../../../../hooks/useSelectStyles';
import useSingleSelect from '../../../../hooks/useSingleSelect';
import CustomLoader from '../../Util/CustomLoader';
import { ChartAndTitleWrapper, SelectWrapper } from '../../Util/Util.elements';
import PlaytimeByCategory from './PlaytimeByCategory';

export default function TopArtists({ dataProcessor }) {
  const { selectStyles, selectTheme } = useSelectStyles('100px');
  const [maxArtists, SelectElement] = useSingleSelect(10, [10, 25, 50, 100], {
    theme: selectTheme,
    styles: selectStyles,
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(dataProcessor.getTopArtists(maxArtists));
  }, [maxArtists]);

  if (!data) return <CustomLoader />;

  return (
    <ChartAndTitleWrapper id="topArtists">
      <h2>Top {maxArtists} Artists by Playtime</h2>
      <PlaytimeByCategory
        data={data}
        category="artistName"
        dataKey="hoursPlayed"
      />
      <SelectWrapper>{SelectElement}</SelectWrapper>
    </ChartAndTitleWrapper>
  );
}
