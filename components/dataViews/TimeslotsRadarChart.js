import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function TimeslotsRadarChart({ data }) {
  return (
    <div style={{ width: '100vw', height: '80vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="timeslot" />
          <PolarRadiusAxis axisLine={false} tick={false} />
          <Radar
            name="Hours spent listening"
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
