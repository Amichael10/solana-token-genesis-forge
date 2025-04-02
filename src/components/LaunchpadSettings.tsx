
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { LaunchpadConfig } from '@/utils/tokenHelpers';
import { Calendar } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface LaunchpadSettingsProps {
  launchpadConfig: LaunchpadConfig;
  onChange: (config: LaunchpadConfig) => void;
}

const LaunchpadSettings: React.FC<LaunchpadSettingsProps> = ({ launchpadConfig, onChange }) => {
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
          <Calendar className="h-5 w-5 text-solana-purple" />
          <span>Launchpad Settings</span>
        </CardTitle>
        <CardDescription>
          Configure your token launch parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="glass-panel p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Launch Type</p>
              <p className="text-sm">{launchpadConfig.whitelisted ? 'Private Sale' : 'Public Sale'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm">Until Hardcap Reached</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Fundraising Target</p>
              <p className="text-sm">${launchpadConfig.hardCap.toLocaleString()} USDC</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Minimum Viable Raise</p>
              <p className="text-sm">${launchpadConfig.softCap.toLocaleString()} USDC</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LaunchpadSettings;
