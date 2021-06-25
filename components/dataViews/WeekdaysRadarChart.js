import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { getWeekdays } from '../../lib/processRawData';

export default function WeekdaysRadarChart({ rawData }) {
  const data_timeslots = getWeekdays(rawData);

  return (
    <div style={{ width: '100vw', height: '80vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data_timeslots}>
          <PolarGrid />
          <PolarAngleAxis dataKey="timeslot" />
          <PolarRadiusAxis />
          <Radar
            name="Total Time Spent"
            dataKey="totalTimeSpent"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
