
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { AllocationConfig, VestingSchedule as VestingType } from '@/utils/tokenHelpers';
import { Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VestingScheduleProps {
  vestingSchedules: VestingType[];
  allocation: AllocationConfig;
  onChange: (schedules: VestingType[]) => void;
}

const INTERVAL_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
];

const VestingSchedule: React.FC<VestingScheduleProps> = ({ vestingSchedules, allocation, onChange }) => {
  const handleChange = (index: number, field: keyof VestingType, value: any) => {
    const newSchedules = [...vestingSchedules];
    newSchedules[index] = {
      ...newSchedules[index],
      [field]: typeof value === 'string' ? value : Number(value),
    };
    onChange(newSchedules);
  };

  return (
    <Card className="glass-card purple-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-solana-purple" />
          <span>Vesting Schedule</span>
        </CardTitle>
        <CardDescription>
          Define release schedules for each allocation category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={vestingSchedules[0].category}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            {vestingSchedules.map((schedule) => (
              <TabsTrigger key={schedule.category} value={schedule.category}>
                {schedule.category.charAt(0).toUpperCase() + schedule.category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {vestingSchedules.map((schedule, index) => {
            const tokenAmount = (allocation[schedule.category] / 100);
            
            return (
              <TabsContent key={schedule.category} value={schedule.category} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>TGE Release</Label>
                      <span className="text-sm text-muted-foreground">{schedule.tgePercentage}%</span>
                    </div>
                    <Slider
                      value={[schedule.tgePercentage]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleChange(index, 'tgePercentage', value[0])}
                    />
                    <p className="text-xs text-muted-foreground">
                      Amount released at Token Generation Event
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Cliff Period (months)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={60}
                      value={schedule.cliff}
                      onChange={(e) => handleChange(index, 'cliff', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Period before vesting begins
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Vesting Duration (months)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={120}
                      value={schedule.vestingDuration}
                      onChange={(e) => handleChange(index, 'vestingDuration', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Total duration of the vesting period
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Release Interval</Label>
                    <Select 
                      value={schedule.vestingInterval}
                      onValueChange={(value) => handleChange(index, 'vestingInterval', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {INTERVAL_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      How frequently tokens are released
                    </p>
                  </div>
                </div>
                
                <div className="glass-panel p-4 rounded-lg space-y-2">
                  <h3 className="text-sm font-medium">Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Allocation</p>
                      <p className="text-sm">{allocation[schedule.category]}% of total supply</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">TGE Release</p>
                      <p className="text-sm">{(tokenAmount * schedule.tgePercentage / 100).toFixed(2)}% of total supply</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Vesting Start</p>
                      <p className="text-sm">
                        {schedule.cliff > 0 
                          ? `After ${schedule.cliff} month${schedule.cliff !== 1 ? 's' : ''} cliff` 
                          : 'Immediately after TGE'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Release Schedule</p>
                      <p className="text-sm">
                        {schedule.vestingDuration > 0 
                          ? `${schedule.vestingInterval.charAt(0).toUpperCase() + schedule.vestingInterval.slice(1)} for ${schedule.vestingDuration} months`
                          : 'All at TGE'}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VestingSchedule;
