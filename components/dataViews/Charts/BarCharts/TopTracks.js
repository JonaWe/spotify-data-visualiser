import { useState, useEffect } from 'react';
import useSelectStyles from '../../../../hooks/useSelectStyles';
import useSingleSelect from '../../../../hooks/useSingleSelect';
import CustomLoader from '../../Util/CustomLoader';
import { ChartAndTitleWrapper, SelectWrapper } from '../../Util/Util.elements';
import PlaytimeByCategory from './PlaytimeByCategory';

export default function TopTracks({ dataProcessor }) {
  const { selectStyles, selectTheme } = useSelectStyles('100px');
  const [maxTracks, SelectElement] = useSingleSelect(10, [10, 25, 50, 100], {
    theme: selectTheme,
    styles: selectStyles,
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(dataProcessor.getTopTracks(maxTracks));
  }, [maxTracks]);

  if (!data) return <CustomLoader />;
  return (
    <ChartAndTitleWrapper id="topTracks">
      <h2>Top {maxTracks} Tracks by Playtime</h2>
      <PlaytimeByCategory
        data={data}
        category="trackName"
        dataKey="hoursPlayed"
      />
      <SelectWrapper>{SelectElement}</SelectWrapper>
    </ChartAndTitleWrapper>
  );
}
