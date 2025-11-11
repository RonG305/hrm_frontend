'use client';
import ReactECharts from 'echarts-for-react';

interface HorizontalBarChartProps {
  data: { name: string; value: number }[];
  title?: string;
  height?: number;
}

export default function HorizontalBarChart({ data, title, height = 350 }: HorizontalBarChartProps) {
  const option = {
    title: {
      text: title || 'Horizontal Bar Chart',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f36f24',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: data.map((item) => item.name),
    },
    series: [
      {
        name: 'Value',
        type: 'bar',
        data: data.map((item) => item.value),
        itemStyle: {
          color: "#007787", 
          borderRadius: [0, 6, 6, 0],
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}',
        },
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
