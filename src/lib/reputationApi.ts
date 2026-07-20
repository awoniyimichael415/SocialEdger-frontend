const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export interface DashboardData {
  [key: string]: any;
}

export interface Contributor {
  _id?: string;
  wallet?: string;
  walletAddress?: string;
  displayName?: string;
  fullName?: string;
  name?: string;
  username?: string;
  profileImage?: string;
  membershipType?: string;
  accountStatus?: string;
  verified?: boolean;
  totalReputation?: number;
  contributorLevel?: number;
  daoVotingWeight?: number;
  reputation?: number;
  score?: number;
  rank?: number;
  badges?: any[];
  [key: string]: any;
}

export interface ReputationDetails {
  wallet: string;
  role: string;
  membership: {
    role: string;
    score: number;
  };
  totalReputation: number;
  level: {
    level: number;
    title: string;
  };
  badges: {
    name: string;
    description: string;
  }[];
  contributor: {
    displayName: string;
    username: string;
    walletAddress: string;
    profileImage: string;
    membershipType: string;
    verified: boolean;
    accountStatus: string;
    country: string;
    category: string;
  };
  profileCompletion: number;
  daoVotingWeight: number;
  breakdown: {
    membership: number;
    contributor: number;
    opportunities: number;
    rewards: number;
  };
  history: {
    title: string;
    reputation: number;
  }[];
}

async function request<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      `Request failed (${response.status}): ${message}`
    );
  }

  return (await response.json()) as T;
}

const ReputationApi = {
  getDashboard(): Promise<DashboardData> {
    return request<DashboardData>(
      "/api/reputation/admin/dashboard"
    );
  },

  getLeaderboard(): Promise<Contributor[]> {
    return request<Contributor[]>(
      "/api/reputation/admin/leaderboard"
    );
  },

  getContributors(): Promise<Contributor[]> {
    return request<Contributor[]>(
      "/api/reputation/admin/contributors"
    );
  },

  getReputation(
    wallet: string
  ): Promise<ReputationDetails> {
    return request<ReputationDetails>(
      `/api/reputation/${wallet}`
    );
  },
};

export default ReputationApi;
