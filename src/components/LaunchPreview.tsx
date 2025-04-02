
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Rocket, Shield, Coins, Clock, Users, ChevronRight } from 'lucide-react';
import { TokenConfig, BondingCurveConfig, AllocationConfig, LaunchpadConfig, calculatePrice } from '@/utils/tokenHelpers';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface LaunchPreviewProps {
  tokenConfig: TokenConfig;
  bondingCurve: BondingCurveConfig;
  allocation: AllocationConfig;
  launchpadConfig: LaunchpadConfig;
}

const LaunchPreview: React.FC<LaunchPreviewProps> = ({
  tokenConfig,
  bondingCurve,
  allocation,
  launchpadConfig,
}) => {
  const { toast } = useToast();

  const handleLaunch = () => {
    toast({
      title: "Launch Process Started",
      description: "This is a demo. In a real app, this would connect to your wallet and deploy your token.",
    });
  };

  const publicSaleAllocation = (allocation.publicSale / 100) * tokenConfig.totalSupply;
  const initialMarketCap = bondingCurve.initialPrice * tokenConfig.totalSupply;
  
  const isConfigComplete = () => {
    return (
      tokenConfig.name.trim() !== '' &&
      tokenConfig.symbol.trim() !== '' &&
      tokenConfig.totalSupply > 0 &&
      launchpadConfig.softCap > 0 &&
      launchpadConfig.hardCap >= launchpadConfig.softCap
    );
  };

  return (
    <Card className="glass-card purple-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-solana-purple" />
          <span>Launch Preview</span>
        </CardTitle>
        <CardDescription>
          Review your token configuration before launch
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="glass-panel p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {tokenConfig.logoUrl ? (
                <img src={tokenConfig.logoUrl} alt="Token logo" className="h-10 w-10 rounded-full" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <Coins className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <div>
                <h3 className="font-medium">{tokenConfig.name || 'Token Name'}</h3>
                <p className="text-sm text-muted-foreground">{tokenConfig.symbol || 'SYM'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Initial Price</p>
              <p className="font-medium">${bondingCurve.initialPrice.toFixed(4)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Supply</p>
              <p className="text-sm">{tokenConfig.totalSupply.toLocaleString()} Tokens</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Decimals</p>
              <p className="text-sm">{tokenConfig.decimals}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Initial Market Cap</p>
              <p className="text-sm">${initialMarketCap.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Public Sale Allocation</p>
              <p className="text-sm">{publicSaleAllocation.toLocaleString()} Tokens</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Launch Date</p>
              <p className="text-sm">{format(launchpadConfig.launchDate, "PPP")}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sale Type</p>
              <p className="text-sm">{launchpadConfig.whitelisted ? 'Private Sale' : 'Public Sale'}</p>
            </div>
          </div>
          
          <div className="space-y-2 pt-2">
            <p className="text-xs text-muted-foreground">Description</p>
            <p className="text-sm">
              {tokenConfig.description || 'No description provided'}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Verification Checklist</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-solana-green" />
              <span className="text-sm">Token configuration complete</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-solana-purple" />
              <span className="text-sm">Bonding curve parameters set</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-solana-blue" />
              <span className="text-sm">Allocation percentages defined</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-solana-green" />
              <span className="text-sm">Launch parameters configured</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="default" 
          className="w-full bg-solana-gradient hover:opacity-90 transition-all text-black font-medium"
          onClick={handleLaunch}
          disabled={!isConfigComplete()}
        >
          <span>Launch Token</span>
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          Note: This is a demo application. In a production environment, this would connect to your wallet and deploy your token on Solana.
        </p>
      </CardContent>
    </Card>
  );
};

export default LaunchPreview;
