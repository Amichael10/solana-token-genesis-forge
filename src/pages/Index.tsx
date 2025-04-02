
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import TokenForm from '@/components/TokenForm';
import BondingCurve from '@/components/BondingCurve';
import AllocationChart from '@/components/AllocationChart';
import VestingSchedule from '@/components/VestingSchedule';
import LaunchpadSettings from '@/components/LaunchpadSettings';
import LaunchPreview from '@/components/LaunchPreview';
import { 
  defaultTokenConfig, 
  defaultBondingCurveConfig,
  defaultAllocationConfig,
  defaultVestingSchedules,
  defaultLaunchpadConfig,
  TokenConfig,
  BondingCurveConfig,
  AllocationConfig,
  VestingSchedule as VestingType,
  LaunchpadConfig,
} from '@/utils/tokenHelpers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, Gem, Layout, Sparkles } from 'lucide-react';

const Index = () => {
  const [tokenConfig, setTokenConfig] = useState<TokenConfig>(defaultTokenConfig);
  const [bondingCurve, setBondingCurve] = useState<BondingCurveConfig>(defaultBondingCurveConfig);
  const [allocation, setAllocation] = useState<AllocationConfig>(defaultAllocationConfig);
  const [vestingSchedules, setVestingSchedules] = useState<VestingType[]>(defaultVestingSchedules);
  const [launchpadConfig, setLaunchpadConfig] = useState<LaunchpadConfig>(defaultLaunchpadConfig);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="solana-gradient-text">Solana Token</span> Genesis Forge
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Create, configure and launch your custom Solana token with advanced tokenomics
          </p>
        </div>
        
        <Tabs defaultValue="basic" className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 w-full md:w-fit mx-auto">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Gem className="h-4 w-4" />
              <span className="hidden md:inline">Token Basics</span>
              <span className="md:hidden">Basics</span>
            </TabsTrigger>
            <TabsTrigger value="economics" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden md:inline">Tokenomics</span>
              <span className="md:hidden">Econ</span>
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <span className="hidden md:inline">Distribution</span>
              <span className="md:hidden">Distrib</span>
            </TabsTrigger>
            <TabsTrigger value="launch" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              <span>Launch</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-8">
            <TokenForm 
              tokenConfig={tokenConfig} 
              onChange={setTokenConfig} 
            />
          </TabsContent>
          
          <TabsContent value="economics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BondingCurve 
                bondingCurve={bondingCurve} 
                totalSupply={tokenConfig.totalSupply}
                onChange={setBondingCurve} 
              />
              
              <AllocationChart 
                allocation={allocation} 
                onChange={setAllocation} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="distribution" className="space-y-8">
            <VestingSchedule 
              vestingSchedules={vestingSchedules} 
              allocation={allocation}
              onChange={setVestingSchedules} 
            />
          </TabsContent>
          
          <TabsContent value="launch" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LaunchpadSettings 
                launchpadConfig={launchpadConfig} 
                onChange={setLaunchpadConfig} 
              />
              
              <LaunchPreview 
                tokenConfig={tokenConfig}
                bondingCurve={bondingCurve}
                allocation={allocation}
                launchpadConfig={launchpadConfig}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Solana Token Genesis Forge — A token launcher demo application</p>
          <p className="mt-2">Built with React, Tailwind CSS, and the Solana ecosystem in mind</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
