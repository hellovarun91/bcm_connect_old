import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom hook with hardcoded data for DrivingCostChart
const useDrivingCostData = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Hardcoded monthly driving cost data - matching the reference design
    const costData = [
      { month: 1, oct2025: 15000, nov2025: 15000 },
      { month: 2, oct2025: 15400, nov2025: 15600 },
      { month: 3, oct2025: 15800, nov2025: 16200 },
      { month: 4, oct2025: 16200, nov2025: 16800 },
      { month: 5, oct2025: 16600, nov2025: 17500 },
      { month: 6, oct2025: 17000, nov2025: 18300 },
      { month: 7, oct2025: 17400, nov2025: 19200 },
      { month: 8, oct2025: 17800, nov2025: 20100 },
      { month: 9, oct2025: 18200, nov2025: 21000 },
      { month: 10, oct2025: 18600, nov2025: 22000 },
      { month: 11, oct2025: 19000, nov2025: 23000 },
      { month: 12, oct2025: 19400, nov2025: 24000 },
      { month: 13, oct2025: 19800, nov2025: 25000 },
      { month: 14, oct2025: 20200, nov2025: 26000 },
      { month: 15, oct2025: 20600, nov2025: 27000 },
      { month: 16, oct2025: 21000, nov2025: 28000 },
      { month: 17, oct2025: 21400, nov2025: 29000 },
      { month: 18, oct2025: 21800, nov2025: 30000 },
      { month: 19, oct2025: 22200, nov2025: 31000 },
      { month: 20, oct2025: 22600, nov2025: 32000 },
      { month: 21, oct2025: 23000, nov2025: 33000 },
      { month: 22, oct2025: 23400, nov2025: 34000 },
      { month: 23, oct2025: 23800, nov2025: 34500 },
      { month: 24, oct2025: 24200, nov2025: 35000 },
    ];

    setChartData(costData);
  }, []);

  return chartData;
};

// Format currency for Y-axis
const formatCurrency = (value) => {
  return `$${(value / 1000).toFixed(0)}k`;
};

// DrivingCostChart component
const DrivingCostChart = () => {
  const chartData = useDrivingCostData();

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'transparent', 
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ 
        fontSize: '0.7rem',
        color: 'rgba(243, 239, 239, 0.88)',
        marginTop: '0.4rem',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        lineHeight: 1.2,
        textAlign: 'left'
      }}>
        Monthly Driving Cost
      </h3>
      
      <div style={{ 
        flex: 1,
        width: '100%',
        minHeight: 0,
        position: 'relative'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 28, right: 10, left: -5, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorOct" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorNov" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            
          
            
            <XAxis 
              dataKey="month" 
              stroke="rgba(255,255,255,0.3)"
              tick={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              height={5}
            />
            
            <YAxis 
              stroke="rgba(255,255,255,0.3)"
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 8 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrency}
              domain={[10000, 35000]}
              ticks={[10000, 15000, 20000, 25000, 30000, 35000]}
              width={38}
            />
            
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#1e1e2d', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                color: 'white',
                fontSize: '0.75rem'
              }}
              formatter={(value) => formatCurrency(value)}
              labelStyle={{ color: 'rgba(255,255,255,0.7)' }}
            />
            
            <Legend 
              wrapperStyle={{ 
                color: 'white', 
                fontSize: '0.6rem',
                paddingBottom: '8px'
              }}
              iconType="circle"
              iconSize={6}
              verticalAlign="top"
              align="center"
              height={28}
              layout="horizontal"
              content={() => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#3b82f6',
                      }}
                    />
                    <span>Oct, 2025</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#ef4444',
                      }}
                    />
                    <span>Nov, 2025</span>
                  </div>
                </div>
              )}
              payload={[
              
                { value: 'Oct, 2025', type: 'circle', color: '#3b82f6', id: 'oct2025' },
                 { value: 'Nov, 2025', type: 'circle', color: '#ef4444', id: 'nov2025' }
               
              ]}
            />
            
            <Area
              type="monotone"
              dataKey="oct2025"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorOct)"
              name="Oct, 2025"
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            
            <Area
              type="monotone"
              dataKey="nov2025"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#colorNov)"
              name="Nov, 2025"
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DrivingCostChart;
