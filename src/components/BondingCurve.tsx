
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BondingCurveConfig, BondingCurveType, calculatePrice, generateCurvePoints } from '@/utils/tokenHelpers';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface BondingCurveProps {
  bondingCurve: BondingCurveConfig;
  totalSupply: number;
  onChange: (config: BondingCurveConfig) => void;
}

const curveOptions: { value: BondingCurveType; label: string }[] = [
  { value: 'constant', label: 'Constant Price' },
  { value: 'linear', label: 'Linear Increase' },
  { value: 'exponential', label: 'Exponential Growth' },
  { value: 'logarithmic', label: 'Logarithmic Growth' },
  { value: 'sigmoid', label: 'S-Curve (Sigmoid)' },
];

const BondingCurve: React.FC<BondingCurveProps> = ({ bondingCurve, totalSupply, onChange }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setChartData(generateCurvePoints(bondingCurve, totalSupply));
  }, [bondingCurve, totalSupply]);

  const handleTypeChange = (value: string) => {
    onChange({
      ...bondingCurve,
      type: value as BondingCurveType,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    onChange({
      ...bondingCurve,
      initialPrice: value,
    });
  };

  const handleSlopeChange = (value: number[]) => {
    onChange({
      ...bondingCurve,
      slope: value[0],
    });
  };

  const handleReserveRatioChange = (value: number[]) => {
    onChange({
      ...bondingCurve,
      reserveRatio: value[0],
    });
  };

  const formatSupply = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const formatPrice = (value: number) => {
    return `$${value.toFixed(4)}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-white/10 rounded-md shadow-lg">
          <p className="text-sm">Supply: {formatSupply(payload[0].payload.x)}</p>
          <p className="text-sm text-solana-purple font-medium">
            Price: {formatPrice(payload[0].payload.y)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card purple-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-solana-purple" />
          <span>Bonding Curve</span>
        </CardTitle>
        <CardDescription>
          Define how your token's price will change as supply increases
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="curveType">Curve Type</Label>
          <Select value={bondingCurve.type} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select curve type" />
            </SelectTrigger>
            <SelectContent>
              {curveOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="initialPrice">Initial Price (USD)</Label>
          <Input
            id="initialPrice"
            type="number"
            min={0.000001}
            step={0.001}
            value={bondingCurve.initialPrice}
            onChange={handlePriceChange}
          />
        </div>

        {bondingCurve.type !== 'constant' && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="slope">Curve Steepness</Label>
              <span className="text-sm text-muted-foreground">
                {bondingCurve.type === 'exponential' ? bondingCurve.slope.toFixed(4) : bondingCurve.slope.toFixed(6)}
              </span>
            </div>
            <Slider
              id="slope"
              min={bondingCurve.type === 'exponential' ? 0.0001 : 0.000001}
              max={bondingCurve.type === 'exponential' ? 0.01 : 0.001}
              step={bondingCurve.type === 'exponential' ? 0.0001 : 0.000001}
              value={[bondingCurve.slope]}
              onValueChange={handleSlopeChange}
            />
          </div>
        )}

        {(bondingCurve.type === 'exponential' || bondingCurve.type === 'logarithmic') && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="reserveRatio">Reserve Ratio</Label>
              <span className="text-sm text-muted-foreground">
                {(bondingCurve.reserveRatio || 0).toFixed(2)}
              </span>
            </div>
            <Slider
              id="reserveRatio"
              min={0.1}
              max={0.9}
              step={0.01}
              value={[bondingCurve.reserveRatio || 0.2]}
              onValueChange={handleReserveRatioChange}
            />
          </div>
        )}

        <div className="mt-6 space-y-2">
          <Label>Price Curve Preview</Label>
          <div className="h-64 w-full rounded-lg glass-panel p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="x" 
                  tickFormatter={formatSupply} 
                  stroke="rgba(255, 255, 255, 0.5)"
                  tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={formatPrice} 
                  stroke="rgba(255, 255, 255, 0.5)"
                  tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="url(#colorGradient)" 
                  strokeWidth={2} 
                  dot={false} 
                  animationDuration={500}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#9945FF" />
                    <stop offset="100%" stopColor="#14F195" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 Tokens</span>
            <span>{formatSupply(totalSupply)} Tokens</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Initial Market Cap</p>
              <p className="text-lg font-medium">${(bondingCurve.initialPrice * totalSupply).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Final Price (est.)</p>
              <p className="text-lg font-medium">${calculatePrice(bondingCurve, totalSupply).toFixed(4)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BondingCurve;
