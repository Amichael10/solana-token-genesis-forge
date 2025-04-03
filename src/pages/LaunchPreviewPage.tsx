
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LaunchPreview from '@/components/LaunchPreview';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { useToast } from '@/components/ui/use-toast';

const LaunchPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Use location state to get token configuration data
  const {
    tokenConfig,
    bondingCurve,
    allocation,
    vestingSchedules,
    launchpadConfig,
    liquidityConfig
  } = location.state || {};

  // Check if all required data is present
  const hasAllData = tokenConfig && bondingCurve && allocation && vestingSchedules && launchpadConfig && liquidityConfig;

  const handleLaunch = () => {
    toast({
      title: "Token Launch Initiated",
      description: "Your token launch process has been started. You'll receive updates on the progress.",
    });
  };

  if (!hasAllData) {
    return (
      <SidebarProvider>
        <div className="min-h-svh w-full flex">
          <AppSidebar currentStep={0} setCurrentStep={() => {}} />
          <main className="flex-1 flex flex-col overflow-auto">
            <div className="container mx-auto py-8 px-4 flex-1 flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-6">Missing Configuration Data</h1>
              <p className="mb-8 text-muted-foreground">Please complete the token creation process before viewing the launch preview.</p>
              <Button onClick={() => navigate('/')}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Return to Token Creator
              </Button>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-svh w-full flex">
        <AppSidebar currentStep={0} setCurrentStep={() => {}} />
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="container mx-auto py-8 px-4 flex-1">
            <div className="mb-6 flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Editor
              </Button>
              
              <Button 
                onClick={handleLaunch}
                className="bg-solana-gradient text-black font-medium"
              >
                Launch Token
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold mb-8">Launch Preview</h1>
            
            <LaunchPreview 
              tokenConfig={tokenConfig}
              bondingCurve={bondingCurve}
              allocation={allocation}
              vestingSchedules={vestingSchedules}
              launchpadConfig={launchpadConfig}
              liquidityConfig={liquidityConfig}
            />
          </div>
          
          <footer className="border-t border-white/10 py-4">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>Built with React, Tailwind CSS, and the Solana ecosystem in mind</p>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LaunchPreviewPage;
