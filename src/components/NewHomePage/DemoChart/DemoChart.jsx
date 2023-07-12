import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data1 = [
  {
    name: 'Put 200',
    price: -60,
  },
  {
    name: 'Put 300',
    price: -60,
  },
  {
    name: 'Put 400',
    price: -50,
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
    price: 0,
  },
  {
    name: 'Call 300',
    price: -60,
  },
];

const data2 = [
  {
    name: 'Put 200',
    price: -100,
  },
  {
    name: 'Put 300',
    price: -80,
  },
  {
    name: 'Put 400',
    price: -50,
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
    price: 40,
  },
  {
    name: 'Call 300',
    price: -100,
  },
];

const data3 = [
  {
    name: 'Put 200',
    price: -100,
  },
  {
    name: 'Put 300',
    price: -80,
  },
  {
    name: 'Put 400',
    price: -50,
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
    price: 40,
  },
  {
    name: 'Call 300',
    price: 40,
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

const DemoChart = ({optionType}) => {

  const data = dataOptions[optionType]

  return (
    <AreaChart
      width={617}
      height={395}
      data={data}
      margin={{
        top: 10,
        right: 30,
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