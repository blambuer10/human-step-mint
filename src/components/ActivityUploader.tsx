import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Clock, MapPin, Zap, Trophy, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ActivityUploaderProps {
  account: string;
}

interface ActivityData {
  steps: number;
  durationMinutes: number;
  distanceMeters: number;
  activityType: string;
}

export default function ActivityUploader({ account }: ActivityUploaderProps) {
  const [activityData, setActivityData] = useState<ActivityData>({
    steps: 2500,
    durationMinutes: 25,
    distanceMeters: 1800,
    activityType: "Walking"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<any>(null);

  const generateRandomActivity = () => {
    const activities = ["Walking", "Running", "Jogging", "Hiking"];
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    const baseSteps = randomActivity === "Running" ? 4000 : 2000;
    const steps = baseSteps + Math.floor(Math.random() * 3000);
    const durationMinutes = 15 + Math.floor(Math.random() * 45);
    const distanceMeters = Math.floor(steps * 0.7); // Approximate distance
    
    setActivityData({
      steps,
      durationMinutes,
      distanceMeters,
      activityType: randomActivity
    });
  };

  const validateActivity = () => {
    const { steps, durationMinutes } = activityData;
    if (steps < 100) return { valid: false, reason: "Too few steps" };
    if (durationMinutes < 5) return { valid: false, reason: "Activity too short" };
    
    const stepRate = steps / durationMinutes;
    if (stepRate < 20) return { valid: false, reason: "Step rate too low" };
    if (stepRate > 200) return { valid: false, reason: "Step rate too high" };
    
    return { valid: true };
  };

  const submitActivity = async () => {
    const validation = validateActivity();
    if (!validation.valid) {
      toast({
        title: "Invalid Activity",
        description: validation.reason,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call with random success/failure for demo
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success (90% success rate)
      if (Math.random() < 0.9) {
        const mockResult = {
          success: true,
          nftId: Math.floor(Math.random() * 1000) + 1,
          rewardTokens: 10,
          txHash: "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''),
          timestamp: Date.now()
        };
        
        setLastSubmission(mockResult);
        
        toast({
          title: "Activity Verified! 🎉",
          description: `NFT #${mockResult.nftId} minted + ${mockResult.rewardTokens} PHA tokens earned!`,
        });
      } else {
        throw new Error("Validation failed");
      }
    } catch (error) {
      toast({
        title: "Validation Failed",
        description: "Activity data appears suspicious. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepRate = activityData.steps / Math.max(1, activityData.durationMinutes);
  const avgSpeed = (activityData.distanceMeters / 1000) / (activityData.durationMinutes / 60); // km/h

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Activity Data Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="steps">Steps</Label>
              <Input
                id="steps"
                type="number"
                value={activityData.steps}
                onChange={(e) => setActivityData({...activityData, steps: parseInt(e.target.value) || 0})}
                className="bg-input/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={activityData.durationMinutes}
                onChange={(e) => setActivityData({...activityData, durationMinutes: parseInt(e.target.value) || 0})}
                className="bg-input/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (meters)</Label>
              <Input
                id="distance"
                type="number"
                value={activityData.distanceMeters}
                onChange={(e) => setActivityData({...activityData, distanceMeters: parseInt(e.target.value) || 0})}
                className="bg-input/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Activity Type</Label>
              <Input
                id="type"
                value={activityData.activityType}
                onChange={(e) => setActivityData({...activityData, activityType: e.target.value})}
                className="bg-input/50"
              />
            </div>
          </div>

          {/* Activity Stats */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <div>
                <div className="text-sm font-medium">{stepRate.toFixed(0)} steps/min</div>
                <div className="text-xs text-muted-foreground">Step Rate</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              <div>
                <div className="text-sm font-medium">{avgSpeed.toFixed(1)} km/h</div>
                <div className="text-xs text-muted-foreground">Avg Speed</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={generateRandomActivity}
              className="flex-1"
            >
              Generate Random Activity
            </Button>
            <Button 
              onClick={submitActivity} 
              disabled={isSubmitting}
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              {isSubmitting ? "Verifying..." : "Submit & Verify"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Progress */}
      {isSubmitting && (
        <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Verifying Activity...</span>
                <Badge variant="secondary">Processing</Badge>
              </div>
              <Progress value={65} className="h-2" />
              <div className="text-xs text-muted-foreground">
                W3bstream validating activity patterns and GPS data...
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Result */}
      {lastSubmission && (
        <Card className="border-success/20 bg-success/5 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div className="space-y-2 flex-1">
                <div className="font-medium text-success">Activity Verified Successfully!</div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-activity" />
                    <span>Activity NFT #{lastSubmission.nftId} minted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-secondary" />
                    <span>{lastSubmission.rewardTokens} PHA tokens earned</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  TX: {lastSubmission.txHash.slice(0, 20)}...
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}