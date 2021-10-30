import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from 'recharts';

const SkillsRadarChart = ({ chartData, checked, chartDataB, chartDataC }) => {
  const { id_0, id_1, id_2 } = checked;

  const data = [
    {
      subject: '店長力',
      A: chartData.sm,
      B: 100,
      enemy: chartDataB.sm,
      enemy1: chartDataC.sm,
      fullMark: 150,
    },
    {
      subject: '副店長力',
      A: chartData.ssm,
      B: 100,
      enemy: chartDataB.ssm,
      enemy1: chartDataC.ssm,
      fullMark: 150,
    },
    {
      subject: '人事力',
      A: chartData.hr,
      B: 100,
      enemy: chartDataB.hr,
      enemy1: chartDataC.hr,
      fullMark: 150,
    },
    {
      subject: 'VMD',
      A: chartData.vmd,
      B: 100,
      enemy: chartDataB.vmd,
      enemy1: chartDataC.vmd,
      fullMark: 150,
    },
    {
      subject: '接客力',
      A: chartData.cs,
      B: 100,
      enemy: chartDataB.cs,
      enemy1: chartDataC.cs,
      fullMark: 150,
    },
    {
      subject: 'ストック',
      A: chartData.stock,
      B: 100,
      enemy: chartDataB.stock,
      enemy1: chartDataC.stock,
      fullMark: 150,
    },
    {
      subject: '事務',
      A: chartData.pc,
      B: 100,
      enemy: chartDataB.pc,
      enemy1: chartDataC.pc,
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
      {id_0 && (
        <Radar
          name="渋谷店"
          dataKey="A"
          stroke="#17b397"
          fill="#17b397"
          fillOpacity={0.3}
        />
      )}
      {id_1 && (
        <Radar
          name="原宿店"
          dataKey="enemy"
          stroke="#FF99FF"
          fill="#FF99FF"
          fillOpacity={0.3}
        />
      )}
      {id_2 && (
        <Radar
          name="新宿店"
          dataKey="enemy1"
          stroke="#FF6600"
          fill="#FF9900"
          fillOpacity={0.3}
        />
      )}
      <Legend />
    </RadarChart>
  );
};
export default SkillsRadarChart;
