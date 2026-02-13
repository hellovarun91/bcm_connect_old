import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const Title = styled(motion.h3)`
  font-size: 0.7rem;
  color: #f3efefe0;
  margin-bottom: 0.5rem;
  font-weight: normal;
  text-align: left;
`;


// Hardcoded data for the chart
const chartData = [
  { month: "Jan", oct: 15000, nov: 15000 },
  { month: "Feb", oct: 15800, nov: 17300 },
  { month: "Mar", oct: 16700, nov: 18500 },
  { month: "Apr", oct: 18000, nov: 20000 },
  { month: "May", oct: 19500, nov: 22000 },
  { month: "Jun", oct: 21000, nov: 24500 },
  { month: "Jul", oct: 23000, nov: 27000 },
  { month: "Aug", oct: 25000, nov: 29500 },
  { month: "Sep", oct: 27300, nov: 32500 },
  { month: "Oct", oct: 30000, nov: 35500 },
];


export default function MonthlyDrivingCostChart() {
  return (
    <div
      className=""
      style={{ padding: '1rem', marginTop: '-9rem', marginRight: '-10rem'}}
    >
     <Title>Monthly Driving Cost</Title>

        <ResponsiveContainer width="70%" height="80%" aspect={3}>
        <AreaChart 
          data={chartData}
          margin={{ left: 40, bottom: -30 }}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FACC15" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.2} />
            </linearGradient>

            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E84020" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#E84020" stopOpacity={0.5} />
            </linearGradient>
          </defs>

          {/* Y Axis */}
          <YAxis 
            tick={{ fill: '#ffffff', fontSize: '0.5rem' }}
            axisLine={{ stroke: '#666' }}
            tickLine={{ stroke: '#666' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            width={40}
          />
          
          {/* Grid Lines */}
          <CartesianGrid
            stroke="#ffffff20"
            strokeDasharray="1"
            horizontal={false}
            vertical={true}
          />

      

          {/* Y Axis */}
          <YAxis
            tick={{ fill: 'white', fontSize: '0.625rem' }}
            axisLine={{ stroke: '#666' }}
            tickLine={{ stroke: '#666' }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            domain={[0, 'auto']}  // Start Y-axis at zero to show origin
            width={2.5}
            dx={-0.125}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              background: "#1E1F26",
              border: "0.0625rem solid #333",
              borderRadius: "0.5rem",
              color: "white",
            }}
            formatter={(v) => `$${v.toLocaleString()}`}
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{ color: "white", paddingTop: '1.25rem' }}
            iconType="circle"
            payload={[
              { value: 'Oct, 2025', type: 'circle', color: '#FACC15', id: 'oct' },
              { value: 'Nov, 2025', type: 'circle', color: '#E84020', id: 'nov' },
            ]}
          />

          {/* Areas */}
          <Area
            type="monotone"
            dataKey="oct"
            stroke="#FACC15"
            fill="url(#blueGradient)"
            strokeWidth={0.1875}
            name="Oct, 2025"
          />

          <Area
            type="monotone"
            dataKey="nov"
            stroke="#E84020"
            fill="url(#redGradient)"
            strokeWidth={0.1875}
            name="Nov, 2025"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
