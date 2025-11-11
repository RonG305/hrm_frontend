'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';

interface HalfDonutChartProps {
  data: { role: string; value: number }[];
  title?: string;
  height?: number;
}

export default function HalfDonutChart({ data, title, height = 350 }: HalfDonutChartProps) {
  const option = {
    title: {
      text: title || 'Role Distribution',
      left: 'center',
      top: '18%',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f36f24',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      top: 0,
      orient: 'horizontal',
      textStyle: { color: '#374151' },
    },
    series: [
      {
        name: 'Roles',
        type: 'pie',
        startAngle: 180, 
        radius: ['55%', '80%'],
        center: ['50%', '75%'], 
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 8, 
          borderColor: '#fff', 
          borderWidth: 3, 
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          color: '#696f7a',
          fontSize: 12,
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 10,
          smooth: true,
        },
        data: [
          ...data.map((item) => ({
            name: item.role,
            value: item.value,
          })),
          // invisible bottom half to create semicircle effect
          {
            value: data.reduce((sum, item) => sum + item.value, 0),
            itemStyle: { color: 'none' },
            tooltip: { show: false },
            label: { show: false },
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      style={{ height: `${height}px`, width: '100%' }}
    />
  );
}
