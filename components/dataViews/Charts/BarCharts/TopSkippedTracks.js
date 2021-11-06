import { useState, useEffect } from 'react';
import useSelectStyles from '../../../../hooks/useSelectStyles';
import useSingleSelect from '../../../../hooks/useSingleSelect';
import CustomLoader from '../../Util/CustomLoader';
import { ChartAndTitleWrapper, SelectWrapper } from '../../Util/Util.elements';
import PlaytimeByCategory from './PlaytimeByCategory';

export default function TopSkippedTracks({ dataProcessor, innerRef }) {
  const { selectStyles, selectTheme } = useSelectStyles('100px');
  const [maxTracks, SelectElement] = useSingleSelect(10, [10, 25, 50, 100], {
    theme: selectTheme,
    styles: selectStyles,
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    setData(dataProcessor.getMostSkippedSongs(maxTracks));
  }, [maxTracks]);

  if (!data) return <CustomLoader />;
  return (
    <ChartAndTitleWrapper ref={innerRef} id="topSkippedTracks">
      <h2>Top {maxTracks} Most Skipped Tracks</h2>
      <PlaytimeByCategory
        data={data}
        category="trackName"
        dataKey="timesSkipped"
      />
      <SelectWrapper>{SelectElement}</SelectWrapper>
    </ChartAndTitleWrapper>
  );
}
