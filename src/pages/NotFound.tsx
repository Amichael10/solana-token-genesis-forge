
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-svh w-full flex">
        <AppSidebar currentStep={0} setCurrentStep={() => {}} />
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="container mx-auto py-8 px-4 flex-1 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8">
              Page not found
            </p>
            <Button 
              onClick={() => navigate('/')}
              variant="default"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default NotFound;
