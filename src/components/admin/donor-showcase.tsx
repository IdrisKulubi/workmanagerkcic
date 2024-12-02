"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Trophy, Target, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DonorStats {
  name: string;
  totalProjects: number;
  wonProjects: number;
  totalBudget: number;
  successRate: number;
}

export function DonorShowcase({ donors }: { donors: DonorStats[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Donor Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {donors.map((donor, index) => (
            <motion.div
              key={donor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg border p-4"
            >
              {/* Background gradient based on success rate */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `linear-gradient(90deg, 
                    #22c55e ${donor.successRate}%, 
                    transparent ${donor.successRate}%)`
                }}
              />

              <div className="relative">
                {/* Donor Name and Success Rate */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{donor.name}</h3>
                  <div className="flex items-center gap-1 text-green-500">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm">{donor.successRate.toFixed(1)}% Success</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Projects</p>
                      <p className="font-medium">{donor.totalProjects}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Won Projects</p>
                      <p className="font-medium">{donor.wonProjects}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Budget</p>
                      <p className="font-medium">{formatCurrency(donor.totalBudget)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 