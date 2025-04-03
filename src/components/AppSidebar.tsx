import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Gem, Rocket, CircleDollarSign, Clock, BarChart, ArrowLeftRight, Layout, Settings, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const AppSidebar = ({
  currentStep,
  setCurrentStep
}) => {
  const {
    toast
  } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const showComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available in the next update."
    });
  };
  const isPreviewRoute = location.pathname === '/launch-preview';
  const isIndexRoute = location.pathname === '/';
  return <Sidebar variant="inset">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-solana-gradient flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-background"></div>
          </div>
          <h1 className="text-xl font-bold">
            <span className="solana-gradient-text">Solana</span> <span className="text-white">Forge</span>
          </h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="pt-8"> {/* Added padding top to align with main content header */}
        {isPreviewRoute ? <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2">Launch Preview</SidebarGroupLabel>
            <SidebarMenu className="mt-3 space-y-3"> {/* Add vertical spacing between menu items */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={true} tooltip="Review Launch" className="px-4 py-3" /* Increased padding for better touch target */>
                  <a href="/launch-preview">
                    <CheckCircle className="text-solana-green" />
                    <span>Review Launch</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup> : <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2">Token Configuration</SidebarGroupLabel>
            <SidebarMenu className="mt-3 space-y-3"> {/* Add vertical spacing between menu items */}
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Token Basics - Configure name, symbol, and supply" isActive={isIndexRoute && currentStep === 1} onClick={() => setCurrentStep(1)} className="just make sure the div cover the text and the inner div hugs the content ">
                  <Gem className={`${currentStep === 1 ? 'text-solana-green' : 'text-solana-purple'}`} />
                  <div className="flex flex-col items-start">
                    <span>Token Basics</span>
                    <span className="text-xs text-muted-foreground">Configure name, symbol, and supply</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Bonding Curve - Set token pricing model" isActive={isIndexRoute && currentStep === 2} onClick={() => setCurrentStep(2)} className="px-4 py-3">
                  <BarChart className={`${currentStep === 2 ? 'text-solana-green' : 'text-solana-purple'}`} />
                  <div className="flex flex-col items-start">
                    <span>Bonding Curve</span>
                    <span className="text-xs text-muted-foreground">Set token pricing model</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Allocation - Distribute token supply" isActive={isIndexRoute && currentStep === 3} onClick={() => setCurrentStep(3)} className="px-4 py-3">
                  <Layout className={`${currentStep === 3 ? 'text-solana-green' : 'text-solana-purple'}`} />
                  <div className="flex flex-col items-start">
                    <span>Allocation</span>
                    <span className="text-xs text-muted-foreground">Distribute token supply</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Vesting Schedule - Lock tokens over time" isActive={isIndexRoute && currentStep === 4} onClick={() => setCurrentStep(4)} className="px-4 py-3">
                  <Clock className={`${currentStep === 4 ? 'text-solana-green' : 'text-solana-purple'}`} />
                  <div className="flex flex-col items-start">
                    <span>Vesting Schedule</span>
                    <span className="text-xs text-muted-foreground">Lock tokens over time</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Liquidity - Configure swap pools" isActive={isIndexRoute && currentStep === 5} onClick={() => setCurrentStep(5)} className="px-4 py-3">
                  <ArrowLeftRight className={`${currentStep === 5 ? 'text-solana-green' : 'text-solana-purple'}`} />
                  <div className="flex flex-col items-start">
                    <span>Liquidity</span>
                    <span className="text-xs text-muted-foreground">Configure swap pools</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Launchpad - Set fundraising parameters" isActive={isIndexRoute && currentStep === 6} onClick={() => setCurrentStep(6)} className="px-4 py-3">
                  <Rocket className={`${currentStep === 6 ? 'text-solana-green' : 'text-solana-purple'}`} />
                  <div className="flex flex-col items-start">
                    <span>Launchpad</span>
                    <span className="text-xs text-muted-foreground">Set fundraising parameters</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>}

        <SidebarGroup className="mt-8"> {/* Added top margin for separation */}
          <SidebarGroupLabel className="px-4 py-2">Management</SidebarGroupLabel>
          <SidebarMenu className="mt-3 space-y-3"> {/* Add vertical spacing between menu items */}
            <SidebarMenuItem>
              <SidebarMenuButton onClick={showComingSoon} tooltip="Manage your tokens" className="px-4 py-3">
                <CircleDollarSign className="text-muted-foreground" />
                <div className="flex flex-col items-start">
                  <span>Tokens</span>
                  <span className="text-xs text-muted-foreground">Manage your tokens</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton onClick={showComingSoon} tooltip="Adjust app settings" className="px-4 py-3">
                <Settings className="text-muted-foreground" />
                <div className="flex flex-col items-start">
                  <span>Settings</span>
                  <span className="text-xs text-muted-foreground">Adjust app settings</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-white/10 p-4 mt-auto">
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <p>Solana Token Genesis Forge</p>
          <p>A token launcher demo application</p>
        </div>
      </SidebarFooter>
    </Sidebar>;
};
export default AppSidebar;