
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { toast } = useToast();

  const showComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available in the next update.",
    });
  };

  return (
    <header className="border-b border-white/10 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-solana-gradient flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-background"></div>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="solana-gradient-text">Solana</span> Forge
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Home</a>
          <a href="#" onClick={showComingSoon} className="text-sm text-foreground/80 hover:text-foreground transition-colors">Tokens</a>
          <a href="#" onClick={showComingSoon} className="text-sm text-foreground/80 hover:text-foreground transition-colors">Launchpad</a>
          <a href="#" onClick={showComingSoon} className="text-sm text-foreground/80 hover:text-foreground transition-colors">Docs</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-solana-purple text-solana-purple hover:text-solana-purple hover:bg-solana-purple/10 transition-all"
            onClick={showComingSoon}
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
