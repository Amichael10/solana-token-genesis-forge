
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import LaunchPreview from '@/components/LaunchPreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Rocket } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LaunchPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { tokenConfig, bondingCurve, allocation, vestingSchedules, launchpadConfig, liquidityConfig } = location.state || {};
  
  // If we don't have the required data, redirect back to the index page
  if (!tokenConfig || !bondingCurve || !allocation || !vestingSchedules || !launchpadConfig || !liquidityConfig) {
    React.useEffect(() => {
      toast({
        title: "Missing Configuration",
        description: "Please complete all token configuration steps first.",
        variant: "destructive"
      });
      navigate('/');
    }, []);
    
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="solana-gradient-text">Launch</span> Preview
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Review your token configuration before launching
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <LaunchPreview 
            tokenConfig={tokenConfig}
            bondingCurve={bondingCurve}
            allocation={allocation}
            launchpadConfig={launchpadConfig}
            vestingSchedules={vestingSchedules}
            liquidityConfig={liquidityConfig}
          />
        </div>
        
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Configuration
          </Button>
          
          <Button 
            variant="default"
            className="bg-solana-gradient text-black font-medium hover:opacity-90 flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Token Launch Initiated",
                description: "Your token launch process has been started."
              });
            }}
          >
            <Rocket className="h-4 w-4" />
            Launch Token
          </Button>
        </div>
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

export default LaunchPreviewPage;
