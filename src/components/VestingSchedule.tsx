
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AllocationConfig, VestingSchedule as VestingType } from '@/utils/tokenHelpers';
import { Clock, Plus, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>(vestingSchedules[0]?.category || 'default');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleChange = (index: number, field: keyof VestingType, value: any) => {
    const newSchedules = [...vestingSchedules];
    newSchedules[index] = {
      ...newSchedules[index],
      [field]: typeof value === 'string' ? value : Number(value),
    };
    onChange(newSchedules);
  };

  const addNewCategory = () => {
    // Convert to lowercase and replace spaces with underscores
    const formattedCategory = newCategoryName.toLowerCase().replace(/\s+/g, '_');
    
    if (!formattedCategory || formattedCategory.trim() === '') {
      toast({
        title: "Invalid Category Name",
        description: "Please provide a valid category name.",
        variant: "destructive"
      });
      return;
    }
    
    if (vestingSchedules.some(schedule => schedule.category === formattedCategory)) {
      toast({
        title: "Category Already Exists",
        description: "A category with this name already exists.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new allocation with the new category
    const newAllocation: AllocationConfig = {
      ...allocation,
      [formattedCategory]: 0,
    };
    
    // Create new vesting schedule with default values
    const newSchedule: VestingType = {
      category: formattedCategory,
      tgePercentage: 0,
      cliff: 0,
      vestingDuration: 12,
      vestingInterval: 'monthly',
    };
    
    onChange([...vestingSchedules, newSchedule]);
    setNewCategoryName('');
    setIsAddingNew(false);
    setActiveTab(formattedCategory);
    
    toast({
      title: "Category Added",
      description: `${newCategoryName} category has been added.`,
    });
  };

  const removeCategory = (categoryToRemove: string) => {
    if (vestingSchedules.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one category.",
        variant: "destructive"
      });
      return;
    }
    
    const newSchedules = vestingSchedules.filter(
      schedule => schedule.category !== categoryToRemove
    );
    
    onChange(newSchedules);
    setActiveTab(newSchedules[0].category);
    
    toast({
      title: "Category Removed",
      description: `${categoryToRemove} category has been removed.`,
    });
  };

  return (
    <Card className="glass-card purple-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-solana-purple" />
          <span>Vesting Schedule</span>
        </CardTitle>
        <CardDescription>
          Define custom release schedules for each allocation category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 flex-grow mr-2">
            {vestingSchedules.map((schedule) => (
              <TabsTrigger 
                key={schedule.category} 
                value={schedule.category}
                onClick={() => setActiveTab(schedule.category)}
                className="flex items-center justify-between"
              >
                <span className="truncate">
                  {schedule.category.charAt(0).toUpperCase() + schedule.category.slice(1).replace(/_/g, ' ')}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 hover:bg-destructive/20 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCategory(schedule.category);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Allocation Category</DialogTitle>
                <DialogDescription>
                  Create a custom category for token allocation and vesting.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Team, Advisors, Marketing"
                  className="mt-2"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  Cancel
                </Button>
                <Button onClick={addNewCategory}>
                  Add Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          {vestingSchedules.map((schedule, index) => {
            const tokenAllocation = allocation[schedule.category] || 0;
            const displayName = schedule.category.charAt(0).toUpperCase() + schedule.category.slice(1).replace(/_/g, ' ');
            
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
                  <h3 className="text-sm font-medium">{displayName} Vesting Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Allocation</p>
                      <p className="text-sm">{tokenAllocation}% of total supply</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">TGE Release</p>
                      <p className="text-sm">{(tokenAllocation * schedule.tgePercentage / 100).toFixed(2)}% of total supply</p>
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
