
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TokenForm from '@/components/TokenForm';
import BondingCurve from '@/components/BondingCurve';
import AllocationChart from '@/components/AllocationChart';
import VestingSchedule from '@/components/VestingSchedule';
import LaunchpadSettings from '@/components/LaunchpadSettings';
import LiquiditySettings from '@/components/LiquiditySettings';
import { 
  defaultTokenConfig, 
  defaultBondingCurveConfig,
  defaultAllocationConfig,
  defaultVestingSchedules,
  defaultLaunchpadConfig,
  defaultLiquidityConfig,
  TokenConfig,
  BondingCurveConfig,
  AllocationConfig,
  VestingSchedule as VestingType,
  LaunchpadConfig,
  LiquidityConfig,
} from '@/utils/tokenHelpers';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

const Index = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [tokenConfig, setTokenConfig] = useState<TokenConfig>(defaultTokenConfig);
  const [bondingCurve, setBondingCurve] = useState<BondingCurveConfig>(defaultBondingCurveConfig);
  const [allocation, setAllocation] = useState<AllocationConfig>(defaultAllocationConfig);
  const [vestingSchedules, setVestingSchedules] = useState<VestingType[]>(defaultVestingSchedules);
  const [launchpadConfig, setLaunchpadConfig] = useState<LaunchpadConfig>(defaultLaunchpadConfig);
  const [liquidityConfig, setLiquidityConfig] = useState<LiquidityConfig>(defaultLiquidityConfig);

  const totalSteps = 6;

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to launch preview page
      navigate('/launch-preview', {
        state: {
          tokenConfig,
          bondingCurve,
          allocation,
          vestingSchedules,
          launchpadConfig,
          liquidityConfig
        }
      });
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch(currentStep) {
      case 1: return "Token Basics";
      case 2: return "Bonding Curve";
      case 3: return "Allocation";
      case 4: return "Vesting Schedule";
      case 5: return "Liquidity";
      case 6: return "Launchpad";
      default: return "Token Creator";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-svh w-full flex">
        <AppSidebar currentStep={currentStep} setCurrentStep={setCurrentStep} />
        
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="container mx-auto py-12 px-8 flex-1"> {/* Increased padding for better spacing */}
            <div className="text-center mb-12"> {/* Increased margin bottom */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6"> {/* Increased margin bottom */}
                <span className="solana-gradient-text">Solana Token</span> Genesis Forge
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                Create, configure and launch your custom Solana token with advanced tokenomics
              </p>
            </div>
            
            {/* Step Title */}
            <div className="mb-10"> {/* Increased margin bottom */}
              <h2 className="text-2xl font-bold">{getStepTitle()}</h2>
            </div>
            
            {/* Step Content */}
            <div className="mb-12"> {/* Increased margin bottom */}
              {currentStep === 1 && (
                <TokenForm 
                  tokenConfig={tokenConfig} 
                  onChange={setTokenConfig} 
                />
              )}
              
              {currentStep === 2 && (
                <BondingCurve 
                  bondingCurve={bondingCurve} 
                  totalSupply={tokenConfig.totalSupply}
                  onChange={setBondingCurve} 
                />
              )}
              
              {currentStep === 3 && (
                <AllocationChart 
                  allocation={allocation} 
                  onChange={setAllocation} 
                />
              )}
              
              {currentStep === 4 && (
                <VestingSchedule 
                  vestingSchedules={vestingSchedules} 
                  allocation={allocation}
                  onChange={setVestingSchedules} 
                />
              )}

              {currentStep === 5 && (
                <LiquiditySettings
                  liquidityConfig={liquidityConfig}
                  onChange={setLiquidityConfig}
                />
              )}
              
              {currentStep === 6 && (
                <LaunchpadSettings 
                  launchpadConfig={launchpadConfig} 
                  onChange={setLaunchpadConfig} 
                />
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button 
                variant="default"
                className="bg-solana-gradient text-black font-medium hover:opacity-90"
                onClick={goToNextStep}
              >
                {currentStep < totalSteps ? 'Next' : 'Review Launch'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <footer className="border-t border-white/10 py-6"> {/* Increased padding */}
            <div className="container mx-auto px-8 text-center text-sm text-muted-foreground"> {/* Increased padding */}
              <p>Built with React, Tailwind CSS, and the Solana ecosystem in mind</p>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
