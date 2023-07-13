import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./DemoChart.css"

const data1 = [
  {
    name: 'Put 100',
    price: -20,
  },
  {
    name: 'Put 200',
    price: -20,
  },
  {
    name: 'Put 300',
    price: -20,
  },
  {
    name: 'Put 400',
    price: -20,
  },
  {
    name: 'Put 500',
    price: 20,
  },
  {
    name: 'Call 500',
    price: 70,
  },
  {
    name: 'Call 400',
    price: 120,
  },
  {
    name: 'Call 300',
    price: 170,
  },
];

const data2 = [
  {
    name: 'Put 100',
    price: -110,
  },
  {
    name: 'Put 200',
    price: -70,
  },
  {
    name: 'Put 300',
    price: -30,
  },
  {
    name: 'Put 400',
    price: 10,
  },
  {
    name: 'Put 500',
    price: 10,
  },
  {
    name: 'Call 500',
    price: -40,
  },
  {
    name: 'Call 400',
    price: -40,
  },
  {
    name: 'Call 300',
    price: -40,
  },
];

const data3 = [
  {
    name: 'Put 100',
    price: 160,
  },
  {
    name: 'Put 200',
    price: 100,
  },
  {
    name: 'Put 300',
    price: 40,
  },
  {
    name: 'Put 400',
    price: -10,
  },
  {
    name: 'Put 500',
    price: -10,
  },
  {
    name: 'Call 500',
    price: 40,
  },
  {
    name: 'Call 400',
    price: 100,
  },
  {
    name: 'Call 300',
    price: 160,
  },
];

const dataOptions = {
  "Long Call": data1,
  "Jade Lizard": data2,
  "Long Strangle": data3,
}

const gradientOffset = (data) => {
  const dataMax = Math.max(...data.map((i) => i.price));
  const dataMin = Math.min(...data.map((i) => i.price));

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
      width={chartSize.width} //{617}
      height={chartSize.height} //{395}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" hide={true}/>
      <YAxis hide={true} />
      <Tooltip />
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
        type="monotone"
        dataKey="price"
        stroke="url(#splitColorStroke)"
        fill="url(#splitColorFill)"
      />
    </AreaChart>
  );
}

export default DemoChart 