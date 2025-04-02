
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { AllocationConfig, validateAllocation } from '@/utils/tokenHelpers';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartPie, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AllocationChartProps {
  allocation: AllocationConfig;
  onChange: (config: AllocationConfig) => void;
}

const AllocationChart: React.FC<AllocationChartProps> = ({ allocation, onChange }) => {
  const handleChange = (category: keyof AllocationConfig, value: number) => {
    const newAllocation = {
      ...allocation,
      [category]: Math.round(value),
    };
    
    onChange(newAllocation);
  };

  const isValid = validateAllocation(allocation);
  
  const totalPercent = Object.values(allocation).reduce((sum, value) => sum + value, 0);
  
  const chartData = Object.entries(allocation).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value,
  }));
  
  const COLORS = ['#9945FF', '#8752F3', '#755FE7', '#646CDB', '#5379CF', '#418AC3', '#2F9BB7', '#14F195'];
  
  const formatTooltipValue = (value: number) => `${value}%`;
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-white/10 rounded-md shadow-lg">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-solana-purple">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card purple-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartPie className="h-5 w-5 text-solana-purple" />
          <span>Token Allocation</span>
        </CardTitle>
        <CardDescription>
          Define how your token supply will be distributed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isValid && (
          <Alert variant="destructive" className="bg-destructive/20 border-destructive/40">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Total allocation must equal 100%. Current total: {totalPercent}%
            </AlertDescription>
          </Alert>
        )}
        
        <div className="h-[250px] glass-panel rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
                iconSize={10}
                formatter={(value, entry, index) => (
                  <span className="text-xs text-foreground/80">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4 mt-6">
          {(Object.keys(allocation) as Array<keyof AllocationConfig>).map((category) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between">
                <Label>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-16 h-8 text-center"
                    type="number"
                    min={0}
                    max={100}
                    value={allocation[category]}
                    onChange={(e) => handleChange(category, Number(e.target.value))}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <Slider
                value={[allocation[category]]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => handleChange(category, value[0])}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllocationChart;
