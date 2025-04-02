
export interface TokenConfig {
  name: string;
  symbol: string;
  logoUrl: string;
  description: string;
  totalSupply: number;
  decimals: number;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  mintAddress?: string;
}

export interface BondingCurveConfig {
  curveType: 'linear' | 'exponential' | 'sigmoid' | 'custom';
  startPrice: number;
  targetPrice: number;
  targetGoal: number;
  reserveRatio: number;
  entryTributeFee: number;
  exitTributeFee: number;
}

export interface AllocationConfig {
  presale: number;
  publicSale: number;
  team: number;
  marketing: number;
  development: number;
  reserve: number;
  advisory: number;
  ecosystem: number;
}

export interface VestingSchedule {
  id: string;
  category: keyof AllocationConfig;
  cliffPeriod: number;
  vestingPeriod: number;
  initialUnlock: number;
  vestingInterval: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  description?: string;
}

export type LaunchpadType = 'standard' | 'fair' | 'private';

export interface LaunchpadConfig {
  type: LaunchpadType;
  launchDate: Date;
  softCap: number;
  hardCap: number;
  minContribution: number;
  maxContribution: number;
  whitelisted: boolean;
  whitelistSize?: number;
  fixedTokenPrice?: number;
  saleAmount?: number;
  saleDuration?: number;
  minAllocation?: number;
  maxAllocation?: number;
}

export type DexType = 'pumpswap' | 'meteora' | 'raydium' | 'orca' | 'custom';

export interface LiquidityConfig {
  dex: DexType;
  customDexName?: string;
  initialLiquidityPercentage: number;
  lockingPeriod: number;
  targetPriceRatio: number;
  enableAutoListing: boolean;
}

export const defaultTokenConfig: TokenConfig = {
  name: '',
  symbol: '',
  logoUrl: '',
  description: '',
  totalSupply: 1000000000,
  decimals: 9,
  website: '',
  twitter: '',
  telegram: '',
  discord: ''
};

export const defaultBondingCurveConfig: BondingCurveConfig = {
  curveType: 'linear',
  startPrice: 0.0001,
  targetPrice: 0.001,
  targetGoal: 500000,
  reserveRatio: 50,
  entryTributeFee: 2,
  exitTributeFee: 5
};

export const defaultAllocationConfig: AllocationConfig = {
  presale: 15,
  publicSale: 20,
  team: 15,
  marketing: 10,
  development: 15,
  reserve: 10,
  advisory: 5,
  ecosystem: 10
};

export const defaultVestingSchedules: VestingSchedule[] = [
  {
    id: '1',
    category: 'team',
    cliffPeriod: 6,
    vestingPeriod: 24,
    initialUnlock: 0,
    vestingInterval: 'monthly',
    description: 'Team token vesting'
  },
  {
    id: '2',
    category: 'marketing',
    cliffPeriod: 1,
    vestingPeriod: 12,
    initialUnlock: 10,
    vestingInterval: 'monthly',
    description: 'Marketing token vesting'
  },
  {
    id: '3',
    category: 'development',
    cliffPeriod: 3,
    vestingPeriod: 18,
    initialUnlock: 5,
    vestingInterval: 'monthly',
    description: 'Development token vesting'
  }
];

export const defaultLaunchpadConfig: LaunchpadConfig = {
  type: 'standard',
  launchDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  softCap: 100000,
  hardCap: 500000,
  minContribution: 50,
  maxContribution: 5000,
  whitelisted: false,
  whitelistSize: 0,
  fixedTokenPrice: 0.0005,
  saleAmount: 10000000,
  saleDuration: 24,
  minAllocation: 1000,
  maxAllocation: 10000
};

export const defaultLiquidityConfig: LiquidityConfig = {
  dex: 'pumpswap',
  initialLiquidityPercentage: 70,
  lockingPeriod: 180, // 180 days (6 months)
  targetPriceRatio: 1.5,
  enableAutoListing: true
};
