import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WalletConnect from "@/components/WalletConnect";
import ActivityUploader from "@/components/ActivityUploader";
import StatsOverview from "@/components/StatsOverview";
import ActivityHistory from "@/components/ActivityHistory";
import DeployContracts from "@/components/DeployContracts";
import { Activity, Shield, Zap, Trophy } from "lucide-react";

const Index = () => {
  const [walletData, setWalletData] = useState<{ account: string; provider: any } | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Actify
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                Proof of Human Activity
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Verify your physical activities on IoTeX blockchain, earn rewards, and collect unique Activity NFTs. 
                Powered by W3bstream confidential computing.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span>Confidential Verification</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
                <span>Instant Rewards</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 rounded-lg bg-activity/10">
                  <Trophy className="w-5 h-5 text-activity" />
                </div>
                <span>NFT Collectibles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-6xl space-y-8">
          {/* Wallet Connection */}
          <WalletConnect onConnected={setWalletData} />
          
          {/* Deploy Contracts */}
          {walletData && <DeployContracts />}
          
          {/* Stats Overview */}
          <StatsOverview account={walletData?.account || null} />
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Activity Upload */}
            <div>
              {walletData ? (
                <ActivityUploader account={walletData.account} />
              ) : (
                <Card className="border-muted/30 bg-card/20 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      Connect Wallet to Upload Activities
                    </h3>
                    <p className="text-muted-foreground">
                      Start tracking your physical activities and earning rewards
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Activity History */}
            <div>
              <ActivityHistory account={walletData?.account || null} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="space-y-4">
            <div className="flex justify-center items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="font-semibold">Actify</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Built on IoTeX blockchain with W3bstream confidential computing
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
