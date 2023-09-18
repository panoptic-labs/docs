import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import "./DemoChart.css"

const data1 = [
  {
    price: '$10',
    y: -20,
  },
  {
    price: '$20',
    y: -20,
  },
  {
    price: '$30',
    y: -20,
  },
  {
    price: '$40',
    y: -20,
  },
  {
    price: '$50',
    y: -20,
  },
  {
    price: '$60',
    y: -20,
  },
  {
    price: '$70',
    y: -20,
  },
  {
    price: '$80',
    y: -20,
  },
  {
    price: '$90',
    y: 20,
  },
  {
    price: '$100',
    y: 60,
  },
  {
    price: '$110',
    y: 100,
  },
  {
    price: '$120',
    y: 140,
  },
  {
    price: '$130',
    y: 180,
  },
  {
    price: '$140',
    y: 220,
  },
  {
    price: '$150',
    y: 260,
  },
  {
    price: '$160',
    y: 300,
  },
];

const data2 = [
  {
    price: '$10',
    y: -270,
  },
  {
    price: '$20',
    y: -230,
  },
  {
    price: '$30',
    y: -190,
  },
  {
    price: '$40',
    y: -150,
  },
  {
    price: '$50',
    y: -110,
  },
  {
    price: '$60',
    y: -70,
  },
  {
    price: '$70',
    y: -30,
  },
  {
    price: '$80',
    y: 10,
  },
  {
    price: '$90',
    y: 10,
  },
  {
    price: '$100',
    y: -40,
  },
  {
    price: '$110',
    y: -40,
  },
  {
    price: '$120',
    y: -40,
  },
  {
    price: '$130',
    y: -40,
  },
  {
    price: '$140',
    y: -40,
  },
  {
    price: '$150',
    y: -40,
  },
  {
    price: '$160',
    y: -40,
  },
];

const data3 = [
  {
    price: '$10',
    y: 200,
  },
  {
    price: '$20',
    y: 170,
  },
  {
    price: '$30',
    y: 140,
  },
  {
    price: '$40',
    y: 110,
  },
  {
    price: '$50',
    y: 80,
  },
  {
    price: '$60',
    y: 50,
  },
  {
    price: '$70',
    y: 20,
  },
  {
    price: '$80',
    y: -10,
  },
  {
    price: '$90',
    y: -10,
  },
  {
    price: '$100',
    y: 20,
  },
  {
    price: '$110',
    y: 50,
  },
  {
    price: '$120',
    y: 80,
  },
  {
    price: '$130',
    y: 110,
  },
  {
    price: '$140',
    y: 140,
  },
  {
    price: '$150',
    y: 170,
  },
  {
    price: '$160',
    y: 200,
  },

];

const dataOptions = {
  "Long Call": data1,
  "Jade Lizard": data2,
  "Long Strangle": data3,
}

const gradientOffset = (data) => {
  const dataMax = Math.max(...data.map((i) => i.y));
  const dataMin = Math.min(...data.map((i) => i.y));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const DemoChart = ({optionType, chartSize}) => {

  const data = dataOptions[optionType]

  return (
    <AreaChart
      width={2 * chartSize.width} //{617}
      height={chartSize.height - 8} //{395}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      }}
    >
      <XAxis dataKey="price" hide={true}/>
      <YAxis hide={true} />
      <Tooltip
        formatter={(value, name) => []}
      />
      <defs>
        <linearGradient id="splitColorFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset={gradientOffset(data)} stopColor="#12AD5033" stopOpacity={1} />
          <stop offset={gradientOffset(data)} stopColor="#D72F223D" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="splitColorStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset={gradientOffset(data)} stopColor="#12AD50" stopOpacity={1} />
          <stop offset={gradientOffset(data)} stopColor="#D72F22" stopOpacity={1} />
        </linearGradient>
      </defs>
      <Area
        type="linear"
        dataKey="y"
        stroke="url(#splitColorStroke)"
        fill="url(#splitColorFill)"
      />
    </AreaChart>
  );
}

export default DemoChart 