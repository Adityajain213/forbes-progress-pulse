import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, ReferenceLine, Label, LabelList } from 'recharts';

interface PerformanceChartProps {
  title: string;
  data: ChartData[];
  type?: 'bar' | 'line' | 'combo';
  showLegend?: boolean;
}

export interface ChartData {
  name: string;
  indexFGCompletion: number;
  capacityAt100: number;
  capacityWithAbs: number;
  percentage: number;
}

// Mock chart data based on the reference image
export const mockChartData: ChartData[] = [
  { name: '1-Sep', indexFGCompletion: 1982, capacityAt100: 2712, capacityWithAbs: 2450, percentage: 85 },
  { name: '2-Sep', indexFGCompletion: 2687, capacityAt100: 2687, capacityWithAbs: 2423, percentage: 119 },
  { name: '3-Sep', indexFGCompletion: 2687, capacityAt100: 2687, capacityWithAbs: 2448, percentage: 102 },
  { name: '4-Sep', indexFGCompletion: 2687, capacityAt100: 2687, capacityWithAbs: 2487, percentage: 118 },
  { name: '5-Sep', indexFGCompletion: 2687, capacityAt100: 2687, capacityWithAbs: 2523, percentage: 131 },
  { name: '6-Sep', indexFGCompletion: 2661, capacityAt100: 2661, capacityWithAbs: 2537, percentage: 128 },
  { name: '7-Sep', indexFGCompletion: 2661, capacityAt100: 2661, capacityWithAbs: 2549, percentage: 106 },
  { name: '8-Sep', indexFGCompletion: 2661, capacityAt100: 2661, capacityWithAbs: 2577, percentage: 123 },
  { name: '9-Sep', indexFGCompletion: 2661, capacityAt100: 2661, capacityWithAbs: 2603, percentage: 98 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium text-foreground">{`Date: ${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }} className="text-sm">
            {`${pld.dataKey}: ${pld.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const PerformanceChart = ({ 
  title, 
  data, 
  type = 'bar', 
  showLegend = true 
}: PerformanceChartProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'combo' ? (
              <BarChart data={data} margin={{ top: 60, right: 50, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 5000]}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 150]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top"
                  align="right"
                  height={40}
                  iconType="rect"
                  wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                />
                <ReferenceLine 
                  y={2500} 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeDasharray="5 5"
                  strokeWidth={1}
                />
                
                {/* Bar Graph - Index_FG completion (ONE index) */}
                <Bar 
                  dataKey="indexFGCompletion" 
                  name="Index_FG completion"
                  fill="hsl(var(--chart-primary))"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList 
                    dataKey="indexFGCompletion" 
                    position="top" 
                    fill="hsl(var(--foreground))"
                    fontSize={10}
                    fontWeight="bold"
                    offset={5}
                  />
                </Bar>

                {/* Line 1: Indexed Capacity at 100% (Black dots) */}
                <Line 
                  type="monotone" 
                  dataKey="capacityAt100" 
                  name="Indexed Capacity (at 100%)"
                  stroke="hsl(var(--foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: "hsl(var(--foreground))", strokeWidth: 2, stroke: "white" }}
                >
                  <LabelList 
                    dataKey="capacityAt100" 
                    position="top"
                    fill="hsl(var(--foreground))"
                    fontSize={10}
                    fontWeight="bold"
                    offset={8}
                  />
                </Line>

                {/* Line 2: Indexed Capacity with Actual Absenteeism (Red dots) */}
                <Line 
                  type="monotone" 
                  dataKey="capacityWithAbs" 
                  name="Indexed Capacity (with Actual Absenteeism)"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: "hsl(var(--destructive))", strokeWidth: 2, stroke: "white" }}
                />

                {/* Line 3: % Capacity Utilization (Blue line with percentage) */}
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  name="% Capacity Utilization with Absenteeism"
                  stroke="hsl(var(--chart-accent))"
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: "hsl(var(--chart-accent))", strokeWidth: 2, stroke: "white" }}
                  yAxisId="right"
                >
                  <LabelList 
                    dataKey="percentage" 
                    position="top"
                    formatter={(value: number) => `${value}%`}
                    fill="hsl(var(--chart-accent))"
                    fontSize={11}
                    fontWeight="bold"
                    offset={15}
                  />
                </Line>
              </BarChart>
            ) : type === 'bar' ? (
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                {showLegend && (
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                )}
                <Bar 
                  dataKey="indexCompletion" 
                  name="Index_FG completion"
                  fill="hsl(var(--chart-primary))"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="indexedCapacity" 
                  name="Indexed Capacity (at 100%)"
                  fill="hsl(var(--chart-secondary))"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="actualCapacity" 
                  name="Indexed Capacity (with Abs)"
                  fill="hsl(var(--chart-tertiary))"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                {showLegend && (
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                  />
                )}
                <Line 
                  type="monotone" 
                  dataKey="indexCompletion" 
                  name="Index_FG completion"
                  stroke="hsl(var(--chart-primary))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="indexedCapacity" 
                  name="Indexed Capacity (at 100%)"
                  stroke="hsl(var(--chart-secondary))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actualCapacity" 
                  name="Indexed Capacity (with Abs)"
                  stroke="hsl(var(--chart-tertiary))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};