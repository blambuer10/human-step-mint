import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WalletConnectProps {
  onConnected: (data: { account: string; provider: any }) => void;
}

export default function WalletConnect({ onConnected }: WalletConnectProps) {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [networkName, setNetworkName] = useState<string>("");

  const checkNetwork = async (provider: any) => {
    try {
      const network = await provider.getNetwork();
      if (network.chainId === 4690) {
        setNetworkName("IoTeX Testnet");
        return true;
      } else if (network.chainId === 4689) {
        setNetworkName("IoTeX Mainnet");
        return true;
      } else {
        setNetworkName("Wrong Network");
        return false;
      }
    } catch {
      return false;
    }
  };

  const addIoTeXNetwork = async () => {
    try {
      await window.ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x1252', // 4690 in hex
          chainName: 'IoTeX Testnet',
          rpcUrls: ['https://babel-api.testnet.iotex.io'],
          nativeCurrency: {
            name: 'IOTX',
            symbol: 'IOTX',
            decimals: 18,
          },
          blockExplorerUrls: ['https://testnet.iotexscan.io/'],
        }],
      });
      return true;
    } catch (error) {
      console.error('Failed to add IoTeX network:', error);
      return false;
    }
  };

  const connect = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to use this app",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: "eth_requestAccounts" 
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        
        // Create a basic provider object for demo
        const mockProvider = {
          getNetwork: async () => ({ chainId: 4690 }),
          getSigner: () => ({ getAddress: async () => accounts[0] })
        };
        
        const isCorrectNetwork = await checkNetwork(mockProvider);
        
        if (!isCorrectNetwork) {
          const networkAdded = await addIoTeXNetwork();
          if (networkAdded) {
            await checkNetwork(mockProvider);
          }
        }
        
        onConnected({ account: accounts[0], provider: mockProvider });
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      }
    } catch (error) {
      console.error("Connection failed:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setNetworkName("");
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet"
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setAccount(accounts[0]);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  if (account) {
    return (
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="font-semibold">Wallet Connected</div>
                <div className="text-sm text-muted-foreground">
                  {account.slice(0, 8)}...{account.slice(-6)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={networkName.includes("IoTeX") ? "default" : "destructive"}>
                {networkName || "Unknown"}
              </Badge>
              <Button variant="ghost" size="sm" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-card/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto">
            {networkName === "Wrong Network" ? (
              <AlertCircle className="w-8 h-8 text-destructive" />
            ) : (
              <Wallet className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Connect Wallet</h3>
            <p className="text-muted-foreground text-sm">
              Connect your MetaMask to start tracking activities
            </p>
          </div>
          <Button 
            onClick={connect} 
            disabled={isConnecting}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isConnecting ? "Connecting..." : "Connect MetaMask"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Make sure to switch to IoTeX Testnet
          </p>
        </div>
      </CardContent>
    </Card>
  );
}