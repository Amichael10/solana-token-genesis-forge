
export type BondingCurveType = 'linear' | 'exponential' | 'logarithmic' | 'sigmoid' | 'constant';

export interface TokenConfig {
  name: string;
  symbol: string;
  totalSupply: number;
  decimals: number;
  description: string;
  logoUrl: string;
}

export interface BondingCurveConfig {
  type: BondingCurveType;
  initialPrice: number;
  slope: number;
  reserveRatio?: number;
}

export interface AllocationConfig {
  team: number;
  advisors: number;
  marketing: number;
  publicSale: number;
  treasury: number;
  ecosystem: number;
}

export interface VestingSchedule {
  category: keyof AllocationConfig;
  tgePercentage: number; // token generation event percentage
  cliff: number; // in months
  vestingDuration: number; // in months
  vestingInterval: string; // 'daily', 'weekly', 'monthly'
}

export interface LaunchpadConfig {
  launchDate: Date;
  softCap: number;
  hardCap: number;
  minContribution: number;
  maxContribution: number;
  whitelisted: boolean;
}

export const defaultTokenConfig: TokenConfig = {
  name: '',
  symbol: '',
  totalSupply: 1000000,
  decimals: 9,
  description: '',
  logoUrl: '',
};

export const defaultBondingCurveConfig: BondingCurveConfig = {
  type: 'linear',
  initialPrice: 0.01,
  slope: 0.01,
  reserveRatio: 0.2,
};

export const defaultAllocationConfig: AllocationConfig = {
  team: 20,
  advisors: 5,
  marketing: 10,
  publicSale: 40,
  treasury: 15,
  ecosystem: 10,
};

export const defaultVestingSchedules: VestingSchedule[] = [
  { category: 'team', tgePercentage: 0, cliff: 6, vestingDuration: 24, vestingInterval: 'monthly' },
  { category: 'advisors', tgePercentage: 0, cliff: 3, vestingDuration: 18, vestingInterval: 'monthly' },
  { category: 'marketing', tgePercentage: 20, cliff: 0, vestingDuration: 12, vestingInterval: 'monthly' },
  { category: 'publicSale', tgePercentage: 100, cliff: 0, vestingDuration: 0, vestingInterval: 'monthly' },
  { category: 'treasury', tgePercentage: 10, cliff: 0, vestingDuration: 36, vestingInterval: 'monthly' },
  { category: 'ecosystem', tgePercentage: 5, cliff: 3, vestingDuration: 24, vestingInterval: 'monthly' },
];

export const defaultLaunchpadConfig: LaunchpadConfig = {
  launchDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // one week from now
  softCap: 100000,
  hardCap: 500000,
  minContribution: 100,
  maxContribution: 10000,
  whitelisted: false,
};

// Function to calculate price based on bonding curve
export function calculatePrice(curve: BondingCurveConfig, supply: number): number {
  switch (curve.type) {
    case 'linear':
      return curve.initialPrice + curve.slope * supply;
    case 'exponential':
      return curve.initialPrice * Math.exp(curve.slope * supply / 1000000);
    case 'logarithmic':
      return curve.initialPrice + curve.slope * Math.log(1 + supply / 1000000);
    case 'sigmoid':
      const midpoint = 500000; // Middle of sigmoid curve
      return curve.initialPrice + curve.slope / (1 + Math.exp(-(supply - midpoint) / 100000));
    case 'constant':
    default:
      return curve.initialPrice;
  }
}

// Function to generate points for a bonding curve chart
export function generateCurvePoints(curve: BondingCurveConfig, totalSupply: number): {x: number, y: number}[] {
  const points = [];
  const steps = 50;
  
  for (let i = 0; i <= steps; i++) {
    const supply = (i / steps) * totalSupply;
    const price = calculatePrice(curve, supply);
    points.push({ x: supply, y: price });
  }
  
  return points;
}

// Helper to validate allocation percentages (must sum to 100%)
export function validateAllocation(allocation: AllocationConfig): boolean {
  const sum = Object.values(allocation).reduce((acc, val) => acc + val, 0);
  return Math.abs(sum - 100) < 0.001; // Allow for small floating point errors
}
