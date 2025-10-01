import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, Rocket } from "lucide-react";

export default function DeployContracts() {
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [contracts, setContracts] = useState<any>(null);
  const { toast } = useToast();

  const handleDeploy = async () => {
    setDeploying(true);
    try {
      const { data, error } = await supabase.functions.invoke('deploy-contracts', {
        body: { network: 'testnet' }
      });

      if (error) throw error;

      if (data.success) {
        setContracts(data.contracts);
        setDeployed(true);
        toast({
          title: "Deployment Successful! 🎉",
          description: "Smart contracts deployed to IoTeX Testnet",
        });
      } else {
        throw new Error(data.error || 'Deployment failed');
      }
    } catch (error: any) {
      console.error('Deployment error:', error);
      toast({
        title: "Deployment Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeploying(false);
    }
  };

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <Rocket className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">Deploy Smart Contracts</h3>
      </div>

      {!deployed ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Deploy RewardToken (ERC20) and ActivityNFT (ERC721) contracts to IoTeX Testnet.
          </p>
          <Button 
            onClick={handleDeploy} 
            disabled={deploying}
            className="w-full"
          >
            {deploying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-4 w-4" />
                Deploy to IoTeX Testnet
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Contracts Deployed!</span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-black/20 rounded-md">
              <p className="text-muted-foreground mb-1">RewardToken (PHA):</p>
              <p className="font-mono text-xs break-all">{contracts.rewardToken}</p>
            </div>
            
            <div className="p-3 bg-black/20 rounded-md">
              <p className="text-muted-foreground mb-1">ActivityNFT (POHA):</p>
              <p className="font-mono text-xs break-all">{contracts.activityNFT}</p>
            </div>
          </div>

          <Button 
            onClick={() => {
              setDeployed(false);
              setContracts(null);
            }}
            variant="outline"
            className="w-full"
          >
            Deploy Again
          </Button>
        </div>
      )}
    </Card>
  );
}
