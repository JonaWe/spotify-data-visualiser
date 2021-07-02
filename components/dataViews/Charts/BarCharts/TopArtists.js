import { useState } from 'react';
import PlaytimeByCategory from './PlaytimeByCategory';

export default function TopArtists({ dataProcessor }) {
  const [maxArtists, setMaxArtists] = useState(10);
  return (
    <>
      <h2>Top {maxArtists} Artists by Playtime</h2>
      <select onChange={(e) => setMaxArtists(e.target.value)}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <PlaytimeByCategory
        data={dataProcessor.getTopArtists(maxArtists)}
        category="artistName"
      />
    </>
  );
}
