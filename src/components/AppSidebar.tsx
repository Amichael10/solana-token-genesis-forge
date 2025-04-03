
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarGroup, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { 
  Gem, 
  Rocket, 
  CircleDollarSign, 
  Clock, 
  BarChart, 
  ArrowLeftRight,
  Layout,
  Settings,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AppSidebar = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  const showComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available in the next update.",
    });
  };

  const isPreviewRoute = location.pathname === '/launch-preview';

  return (
    <Sidebar variant="inset">
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
      
      <SidebarContent>
        {isPreviewRoute ? (
          <SidebarGroup>
            <SidebarGroupLabel>Launch Preview</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={true}
                  tooltip="Review Launch"
                >
                  <a href="/launch-preview">
                    <CheckCircle className="text-solana-green" />
                    <span>Review Launch</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>Form Sections</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Token Basics"
                >
                  <Gem className="text-solana-purple" />
                  <span>Token Basics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Bonding Curve"
                >
                  <BarChart className="text-solana-purple" />
                  <span>Bonding Curve</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Allocation"
                >
                  <Layout className="text-solana-purple" />
                  <span>Allocation</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Vesting Schedule"
                >
                  <Clock className="text-solana-purple" />
                  <span>Vesting Schedule</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Liquidity"
                >
                  <ArrowLeftRight className="text-solana-purple" />
                  <span>Liquidity</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Launchpad"
                >
                  <Rocket className="text-solana-purple" />
                  <span>Launchpad</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={showComingSoon}
                tooltip="Tokens"
              >
                <CircleDollarSign className="text-muted-foreground" />
                <span>Tokens</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={showComingSoon}
                tooltip="Settings"
              >
                <Settings className="text-muted-foreground" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <p>Solana Token Genesis Forge</p>
          <p>A token launcher demo application</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
