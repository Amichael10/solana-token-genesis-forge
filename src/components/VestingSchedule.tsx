
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { VestingSchedule as VestingType, AllocationConfig } from '@/utils/tokenHelpers';
import { Plus, Trash, Clock } from 'lucide-react';

interface VestingScheduleProps {
  vestingSchedules: VestingType[];
  allocation: AllocationConfig;
  onChange: (vestingSchedules: VestingType[]) => void;
}

const VestingSchedule: React.FC<VestingScheduleProps> = ({
  vestingSchedules,
  allocation,
  onChange,
}) => {
  const [activeSchedule, setActiveSchedule] = useState<number | null>(null);

  const handleAddSchedule = () => {
    const newSchedule: VestingType = {
      name: `Schedule ${vestingSchedules.length + 1}`,
      allocationCategory: Object.keys(allocation)[0] as keyof AllocationConfig,
      cliffPeriod: 90, // 3 months
      vestingPeriod: 360, // 12 months
      initialUnlock: 10, // 10%
    };
    onChange([...vestingSchedules, newSchedule]);
    setActiveSchedule(vestingSchedules.length);
  };

  const handleDeleteSchedule = (index: number) => {
    const updatedSchedules = vestingSchedules.filter((_, i) => i !== index);
    onChange(updatedSchedules);
    setActiveSchedule(null);
  };

  const handleScheduleChange = (index: number, field: keyof VestingType, value: any) => {
    const updatedSchedules = [...vestingSchedules];
    updatedSchedules[index] = {
      ...updatedSchedules[index],
      [field]: value,
    };
    onChange(updatedSchedules);
  };

  return (
    <Card className="glass-card purple-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-solana-purple" />
          <span>Vesting Schedules</span>
        </CardTitle>
        <CardDescription>
          Create vesting schedules for your token allocation categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col space-y-4">
            {vestingSchedules.map((schedule, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  activeSchedule === index ? 'border-solana-purple bg-solana-purple/10' : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setActiveSchedule(activeSchedule === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{schedule.name}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSchedule(index);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {schedule.allocationCategory} - {schedule.initialUnlock}% initial, {schedule.cliffPeriod} days cliff, {schedule.vestingPeriod} days total
                </p>
                
                {activeSchedule === index && (
                  <div className="mt-4 grid gap-4 pt-4 border-t border-white/10">
                    <div className="grid gap-2">
                      <Label htmlFor={`schedule-name-${index}`}>Schedule Name</Label>
                      <Input 
                        id={`schedule-name-${index}`}
                        value={schedule.name}
                        onChange={(e) => handleScheduleChange(index, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`schedule-allocation-${index}`}>Allocation Category</Label>
                      <Select 
                        value={schedule.allocationCategory as string}
                        onValueChange={(value) => handleScheduleChange(index, 'allocationCategory', value)}
                      >
                        <SelectTrigger id={`schedule-allocation-${index}`}>
                          <SelectValue placeholder="Select allocation category" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(allocation).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category} ({allocation[category as keyof AllocationConfig]}%)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`schedule-initial-${index}`}>Initial Unlock (%)</Label>
                      <Input 
                        id={`schedule-initial-${index}`}
                        type="number"
                        min="0"
                        max="100"
                        value={schedule.initialUnlock}
                        onChange={(e) => handleScheduleChange(index, 'initialUnlock', Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`schedule-cliff-${index}`}>Cliff Period (Days)</Label>
                      <Input 
                        id={`schedule-cliff-${index}`}
                        type="number"
                        min="0"
                        value={schedule.cliffPeriod}
                        onChange={(e) => handleScheduleChange(index, 'cliffPeriod', Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor={`schedule-period-${index}`}>Vesting Period (Days)</Label>
                      <Input 
                        id={`schedule-period-${index}`}
                        type="number"
                        min="0"
                        value={schedule.vestingPeriod}
                        onChange={(e) => handleScheduleChange(index, 'vestingPeriod', Number(e.target.value))}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="border-dashed border-white/20 hover:border-white/40 justify-center mt-2"
              onClick={handleAddSchedule}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Vesting Schedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VestingSchedule;
