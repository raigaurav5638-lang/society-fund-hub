import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatsCard from './StatsCard';
import { mockDashboardStats, mockDonations, mockExpenses } from '@/data/mockData';
import { 
  Heart, 
  PiggyBank, 
  Receipt, 
  Wallet,
  TrendingUp,
  Calendar,
  Building
} from 'lucide-react';

export default function Dashboard() {
  const stats = mockDashboardStats;
  const recentDonations = mockDonations.slice(0, 3);
  const recentExpenses = mockExpenses.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Temple Society Financial Overview</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Calendar className="mr-2 h-4 w-4" />
          January 2024
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Donations"
          value={stats.totalDonations}
          icon={Heart}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Collections"
          value={stats.totalCollections}
          icon={PiggyBank}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Total Expenses"
          value={stats.totalExpenses}
          icon={Receipt}
          trend={{ value: 5, isPositive: false }}
        />
        <StatsCard
          title="Net Balance"
          value={stats.netBalance}
          icon={Wallet}
          trend={{ value: 15, isPositive: true }}
          className="bg-gradient-to-br from-temple-cream to-white"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Active Flats"
          value={`${stats.activeFlats}/${stats.totalFlats}`}
          icon={Building}
        />
        <StatsCard
          title="Monthly Growth"
          value="15%"
          icon={TrendingUp}
        />
        <StatsCard
          title="Collection Rate"
          value="85%"
          icon={PiggyBank}
        />
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-temple-saffron" />
              Recent Donations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDonations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{donation.donorName}</p>
                  <p className="text-sm text-muted-foreground">{donation.purpose}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-success">
                    ₹{donation.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(donation.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="mr-2 h-5 w-5 text-temple-saffron" />
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-muted-foreground">{expense.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-destructive">
                    -₹{expense.amount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}