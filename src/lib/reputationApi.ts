const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

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

  return response.json();
}

const ReputationApi = {
  getDashboard() {
    return request("/api/reputation/admin/dashboard");
  },

  getLeaderboard() {
    return request("/api/reputation/admin/leaderboard");
  },

  getContributors() {
    return request("/api/reputation/admin/contributors");
  },

  getReputation(wallet: string) {
    return request(`/api/reputation/${wallet}`);
  },
};

export default ReputationApi;