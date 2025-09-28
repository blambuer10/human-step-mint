import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Coins, Activity, Target, TrendingUp, Award } from "lucide-react";

interface StatsOverviewProps {
  account: string | null;
}

export default function StatsOverview({ account }: StatsOverviewProps) {
  // Mock user stats
  const userStats = {
    totalNFTs: 23,
    totalTokens: 340,
    weeklyActivities: 5,
    totalSteps: 89420,
    weeklyGoal: 70000,
    rank: "Gold",
    level: 8
  };

  const weeklyProgress = (userStats.totalSteps / userStats.weeklyGoal) * 100;

  if (!account) {
    return (
      <Card className="border-muted/30 bg-card/20 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="space-y-2">
            <Activity className="w-12 h-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-semibold text-muted-foreground">Connect wallet to view stats</h3>
            <p className="text-muted-foreground">Track your activities and earn rewards</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Activity NFTs */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Trophy className="w-4 h-4 text-activity" />
            Activity NFTs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-activity">{userStats.totalNFTs}</div>
            <div className="text-xs text-muted-foreground">Unique activities verified</div>
            <Badge variant="secondary" className="text-xs">
              +3 this week
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Reward Tokens */}
      <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Coins className="w-4 h-4 text-secondary" />
            PHA Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-secondary">{userStats.totalTokens}</div>
            <div className="text-xs text-muted-foreground">Total rewards earned</div>
            <Badge variant="outline" className="text-xs border-secondary/30">
              +50 this week
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Steps */}
      <Card className="border-success/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4 text-success" />
            Weekly Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-success">
              {userStats.totalSteps.toLocaleString()}
            </div>
            <Progress value={weeklyProgress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{weeklyProgress.toFixed(0)}% of goal</span>
              <span>{userStats.weeklyGoal.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Level */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            User Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">Level {userStats.level}</div>
              <Badge className="bg-gradient-primary text-primary-foreground">
                {userStats.rank}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">Activity enthusiast</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3 text-success" />
              <span className="text-success">+15% this month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}