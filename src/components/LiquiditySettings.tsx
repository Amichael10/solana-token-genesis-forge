
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LiquidityConfig, DexType } from '@/utils/tokenHelpers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleDollarSign, LockIcon, PercentIcon, ArrowLeftRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';

interface LiquiditySettingsProps {
  liquidityConfig: LiquidityConfig;
  onChange: (config: LiquidityConfig) => void;
}

const LiquiditySettings: React.FC<LiquiditySettingsProps> = ({ liquidityConfig, onChange }) => {
  const { toast } = useToast();

  const handleDexChange = (value: string) => {
    onChange({
      ...liquidityConfig,
      dex: value as DexType,
    });
    
    toast({
      title: `${value} Selected`,
      description: `Your token will be available on ${value} after launch.`,
    });
  };

  const handleLockingPeriodChange = (value: number[]) => {
    onChange({
      ...liquidityConfig,
      lockingPeriod: value[0],
    });
  };

  const handleInitialLiquidityChange = (value: number[]) => {
    onChange({
      ...liquidityConfig,
      initialLiquidityPercentage: value[0],
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    onChange({
      ...liquidityConfig,
      enableAutoListing: checked,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    onChange({
      ...liquidityConfig,
      [name]: value,
    });
  };

  return (
    <Card className="glass-card purple-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5 text-solana-purple" />
          <span>Liquidity Settings</span>
        </CardTitle>
        <CardDescription>
          Configure how your token will be listed on DEXes after launch
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dex">Target DEX</Label>
          <Select 
            value={liquidityConfig.dex} 
            onValueChange={handleDexChange}
          >
            <SelectTrigger id="dex">
              <SelectValue placeholder="Select a DEX" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pumpswap">PumpSwap</SelectItem>
              <SelectItem value="meteora">Meteora</SelectItem>
              <SelectItem value="raydium">Raydium</SelectItem>
              <SelectItem value="orca">Orca</SelectItem>
              <SelectItem value="custom">Custom DEX</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Your token will be listed on this DEX once it reaches the target goal
          </p>
        </div>

        {liquidityConfig.dex === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="customDexName">Custom DEX Name</Label>
            <Input
              id="customDexName"
              name="customDexName"
              placeholder="Enter DEX name"
              value={liquidityConfig.customDexName || ''}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <Label>Initial Liquidity Percentage</Label>
            <span className="text-sm font-medium">{liquidityConfig.initialLiquidityPercentage}%</span>
          </div>
          <Slider
            defaultValue={[liquidityConfig.initialLiquidityPercentage]}
            max={100}
            step={1}
            onValueChange={handleInitialLiquidityChange}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Percentage of raised funds that will be used for initial liquidity
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <Label>Liquidity Locking Period</Label>
            <span className="text-sm font-medium">{liquidityConfig.lockingPeriod} days</span>
          </div>
          <Slider
            defaultValue={[liquidityConfig.lockingPeriod]}
            min={7}
            max={365}
            step={1}
            onValueChange={handleLockingPeriodChange}
          />
          <p className="text-xs text-muted-foreground mt-1">
            The period for which the liquidity will be locked
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="targetPriceRatio">Target Price Ratio (x)</Label>
            <Input
              id="targetPriceRatio"
              name="targetPriceRatio"
              type="number"
              min={1}
              step={0.1}
              placeholder="Price multiplier compared to launch price"
              value={liquidityConfig.targetPriceRatio || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="enableAutoListing" className="flex flex-col space-y-1">
            <span>Auto-listing on DEX</span>
            <span className="font-normal text-xs text-muted-foreground">
              Automatically list on DEX when token hits target goal
            </span>
          </Label>
          <Switch
            id="enableAutoListing"
            checked={liquidityConfig.enableAutoListing}
            onCheckedChange={handleSwitchChange}
          />
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Liquidity Summary</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Once your token reaches its target on the bonding curve, it will be listed on {liquidityConfig.dex === 'custom' ? liquidityConfig.customDexName || 'your custom DEX' : liquidityConfig.dex} with {liquidityConfig.initialLiquidityPercentage}% of the raised funds as initial liquidity, locked for {liquidityConfig.lockingPeriod} days.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4 text-solana-purple" />
              <span>{liquidityConfig.dex === 'custom' ? liquidityConfig.customDexName || 'Custom DEX' : liquidityConfig.dex}</span>
            </div>
            <div className="flex items-center gap-2">
              <LockIcon className="h-4 w-4 text-solana-purple" />
              <span>Locked for {liquidityConfig.lockingPeriod} days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiquiditySettings;
