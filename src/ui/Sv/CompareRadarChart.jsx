import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from 'recharts';

const SkillsRadarChart = ({
  ownAreaData,
  compareAreaData,
  ownAreaName,
  compareAreaName,
}) => {
  const data = [
    {
      subject: '店長力',
      A: ownAreaData.sm,
      B: 100,
      enemy: compareAreaData.sm,
      fullMark: 150,
    },
    {
      subject: '副店長力',
      A: ownAreaData.ssm,
      B: 100,
      enemy: compareAreaData.ssm,
      fullMark: 150,
    },
    {
      subject: '人事力',
      A: ownAreaData.hr,
      B: 100,
      enemy: compareAreaData.hr,
      fullMark: 150,
    },
    {
      subject: 'VMD',
      A: ownAreaData.vmd,
      B: 100,
      enemy: compareAreaData.vmd,
      fullMark: 150,
    },
    {
      subject: '接客力',
      A: ownAreaData.cs,
      B: 100,
      enemy: compareAreaData.cs,
      fullMark: 150,
    },
    {
      subject: 'ストック',
      A: ownAreaData.stock,
      B: 100,
      enemy: compareAreaData.stock,
      fullMark: 150,
    },
    {
      subject: '事務',
      A: ownAreaData.pc,
      B: 100,
      enemy: compareAreaData.pc,
      fullMark: 150,
    },
  ];

  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name={ownAreaName}
        dataKey="A"
        stroke="#17b397"
        fill="#17b397"
        fillOpacity={0.3}
      />
      <Radar
        name={compareAreaName}
        dataKey="enemy"
        stroke="#FF99FF"
        fill="#FF99FF"
        fillOpacity={0.3}
      />
      <Legend />
    </RadarChart>
  );
};
export default SkillsRadarChart;
