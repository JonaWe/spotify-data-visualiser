import { useState } from 'react';
import PlaytimeByCategory from './PlaytimeByCategory';

export default function TopTracks({ dataProcessor }) {
  const [maxTracks, setMaxTracks] = useState(10);
  return (
    <>
      <h2>Top 10 Tracks by Playtime</h2>
      <select onChange={(e) => setMaxTracks(e.target.value)}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <PlaytimeByCategory
        data={dataProcessor.getTopTracks(maxTracks)}
        category="trackName"
      />
    </>
  );
}
