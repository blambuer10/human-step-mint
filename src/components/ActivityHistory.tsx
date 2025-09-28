import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Clock, MapPin, ExternalLink, Trophy, Coins } from "lucide-react";

interface ActivityHistoryProps {
  account: string | null;
}

interface ActivityRecord {
  id: number;
  type: string;
  steps: number;
  duration: number;
  distance: number;
  timestamp: string;
  nftId: number;
  rewardTokens: number;
  txHash: string;
  status: "verified" | "pending" | "rejected";
}

export default function ActivityHistory({ account }: ActivityHistoryProps) {
  // Mock activity history data
  const activityHistory: ActivityRecord[] = [
    {
      id: 1,
      type: "Morning Run",
      steps: 4250,
      duration: 35,
      distance: 3200,
      timestamp: "2024-03-15T08:30:00Z",
      nftId: 23,
      rewardTokens: 15,
      txHash: "0xa1b2c3d4e5f6789012345678901234567890abcd",
      status: "verified"
    },
    {
      id: 2,
      type: "Evening Walk",
      steps: 2800,
      duration: 28,
      distance: 2100,
      timestamp: "2024-03-14T19:15:00Z",
      nftId: 22,
      rewardTokens: 10,
      txHash: "0xb2c3d4e5f6789012345678901234567890abcdef",
      status: "verified"
    },
    {
      id: 3,
      type: "Hiking Trail",
      steps: 6500,
      duration: 75,
      distance: 5200,
      timestamp: "2024-03-13T14:00:00Z",
      nftId: 21,
      rewardTokens: 20,
      txHash: "0xc3d4e5f6789012345678901234567890abcdef01",
      status: "verified"
    },
    {
      id: 4,
      type: "Quick Jog",
      steps: 1800,
      duration: 15,
      distance: 1200,
      timestamp: "2024-03-12T07:45:00Z",
      nftId: 0,
      rewardTokens: 0,
      txHash: "",
      status: "rejected"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success/10 text-success border-success/20">Verified</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (!account) {
    return (
      <Card className="border-muted/30 bg-card/20 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="space-y-2">
            <Activity className="w-12 h-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-semibold text-muted-foreground">No Activity History</h3>
            <p className="text-muted-foreground">Connect your wallet to view activity records</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Activity History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityHistory.map((activity) => (
            <div key={activity.id} className="border border-border/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{activity.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(activity.timestamp)}
                    </div>
                  </div>
                </div>
                {getStatusBadge(activity.status)}
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-secondary" />
                  <span>{activity.steps.toLocaleString()} steps</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>{activity.duration} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>{(activity.distance / 1000).toFixed(1)} km</span>
                </div>
              </div>

              {activity.status === "verified" && (
                <div className="flex items-center justify-between bg-muted/20 rounded-lg p-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-activity" />
                      <span>NFT #{activity.nftId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-secondary" />
                      <span>{activity.rewardTokens} PHA</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View TX
                  </Button>
                </div>
              )}

              {activity.status === "rejected" && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                  Activity rejected: Suspicious activity pattern detected
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}