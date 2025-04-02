
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { LaunchpadConfig, LaunchpadType } from '@/utils/tokenHelpers';
import { Calendar, Users, Rocket, Lock } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface LaunchpadSettingsProps {
  launchpadConfig: LaunchpadConfig;
  onChange: (config: LaunchpadConfig) => void;
}

const LaunchpadSettings: React.FC<LaunchpadSettingsProps> = ({ launchpadConfig, onChange }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<LaunchpadType>(launchpadConfig.type);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange({
        ...launchpadConfig,
        launchDate: date,
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    onChange({
      ...launchpadConfig,
      whitelisted: checked,
    });
  };

  const handleTypeChange = (type: LaunchpadType) => {
    setActiveTab(type);
    onChange({
      ...launchpadConfig,
      type,
    });
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Selected`,
      description: `Launchpad type changed to ${type}.`,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    
    onChange({
      ...launchpadConfig,
      [name]: numValue,
    });
  };

  return (
    <Card className="glass-card purple-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-solana-purple" />
          <span>Launchpad Settings</span>
        </CardTitle>
        <CardDescription>
          Configure your token launch parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={(value) => handleTypeChange(value as LaunchpadType)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="standard" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              <span>Standard</span>
            </TabsTrigger>
            <TabsTrigger value="fair" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Fair Launch</span>
            </TabsTrigger>
            <TabsTrigger value="private" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Private</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-4">
            <div className="space-y-2">
              <Label>Launch Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(launchpadConfig.launchDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={launchpadConfig.launchDate}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="softCap">Soft Cap (USDC)</Label>
                <Input
                  id="softCap"
                  name="softCap"
                  type="number"
                  min={0}
                  placeholder="Minimum amount to raise"
                  value={launchpadConfig.softCap || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hardCap">Hard Cap (USDC)</Label>
                <Input
                  id="hardCap"
                  name="hardCap"
                  type="number"
                  min={0}
                  placeholder="Maximum amount to raise"
                  value={launchpadConfig.hardCap || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minContribution">Minimum Contribution (USDC)</Label>
                <Input
                  id="minContribution"
                  name="minContribution"
                  type="number"
                  min={0}
                  placeholder="Minimum buy amount"
                  value={launchpadConfig.minContribution || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxContribution">Maximum Contribution (USDC)</Label>
                <Input
                  id="maxContribution"
                  name="maxContribution"
                  type="number"
                  min={0}
                  placeholder="Maximum buy amount"
                  value={launchpadConfig.maxContribution || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="whitelisted" className="flex flex-col space-y-1">
                <span>Whitelist Enabled</span>
                <span className="font-normal text-xs text-muted-foreground">
                  Restrict participation to whitelisted addresses
                </span>
              </Label>
              <Switch
                id="whitelisted"
                checked={launchpadConfig.whitelisted}
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="fair" className="space-y-4">
            <div className="space-y-2">
              <Label>Launch Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(launchpadConfig.launchDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={launchpadConfig.launchDate}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fixedTokenPrice">Fixed Token Price (USDC)</Label>
                <Input
                  id="fixedTokenPrice"
                  name="fixedTokenPrice"
                  type="number"
                  min={0.0001}
                  step={0.0001}
                  placeholder="Fixed price per token"
                  value={launchpadConfig.fixedTokenPrice || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saleAmount">Sale Amount (Tokens)</Label>
                <Input
                  id="saleAmount"
                  name="saleAmount"
                  type="number"
                  min={1}
                  placeholder="Number of tokens for sale"
                  value={launchpadConfig.saleAmount || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="saleDuration">Sale Duration (hours)</Label>
                <Input
                  id="saleDuration"
                  name="saleDuration"
                  type="number"
                  min={1}
                  max={72}
                  placeholder="Duration in hours"
                  value={launchpadConfig.saleDuration || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minContribution">Minimum Contribution (USDC)</Label>
                <Input
                  id="minContribution"
                  name="minContribution"
                  type="number"
                  min={0}
                  placeholder="Minimum buy amount"
                  value={launchpadConfig.minContribution || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Fair Launch Summary</h3>
              <p className="text-xs text-muted-foreground mb-4">
                In a fair launch, all participants buy tokens at the same fixed price. Everyone has an equal opportunity to participate.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p>{launchpadConfig.saleDuration || 24} hours</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p>${launchpadConfig.fixedTokenPrice?.toFixed(4) || "0.0000"} USDC</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="private" className="space-y-4">
            <div className="space-y-2">
              <Label>Launch Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(launchpadConfig.launchDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={launchpadConfig.launchDate}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fixedTokenPrice">Private Round Price (USDC)</Label>
                <Input
                  id="fixedTokenPrice"
                  name="fixedTokenPrice"
                  type="number"
                  min={0.0001}
                  step={0.0001}
                  placeholder="Private sale price per token"
                  value={launchpadConfig.fixedTokenPrice || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="saleAmount">Sale Amount (Tokens)</Label>
                <Input
                  id="saleAmount"
                  name="saleAmount"
                  type="number"
                  min={1}
                  placeholder="Number of tokens for sale"
                  value={launchpadConfig.saleAmount || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minAllocation">Minimum Allocation (USDC)</Label>
                <Input
                  id="minAllocation"
                  name="minAllocation"
                  type="number"
                  min={0}
                  placeholder="Minimum allocation per participant"
                  value={launchpadConfig.minAllocation || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAllocation">Maximum Allocation (USDC)</Label>
                <Input
                  id="maxAllocation"
                  name="maxAllocation"
                  type="number"
                  min={0}
                  placeholder="Maximum allocation per participant"
                  value={launchpadConfig.maxAllocation || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whitelistSize">Whitelist Size</Label>
              <Input
                id="whitelistSize"
                name="whitelistSize"
                type="number"
                min={1}
                placeholder="Number of addresses to whitelist"
                value={launchpadConfig.whitelistSize || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Private Sale Summary</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Private sale is restricted to whitelisted addresses only, typically with better pricing than public rounds.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Participants</p>
                  <p>{launchpadConfig.whitelistSize || 0} whitelisted addresses</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Private Price</p>
                  <p>${launchpadConfig.fixedTokenPrice?.toFixed(4) || "0.0000"} USDC</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LaunchpadSettings;
