import api from "./api";

const ReputationApi = {
  /*
  =====================================
  ADMIN
  =====================================
  */

  async getDashboard() {
    const { data } = await api.get(
      "/reputation/admin/dashboard"
    );

    return data;
  },

  async getLeaderboard() {
    const { data } = await api.get(
      "/reputation/admin/leaderboard"
    );

    return data;
  },

  async getContributors() {
    const { data } = await api.get(
      "/reputation/admin/contributors"
    );

    return data;
  },

  /*
  =====================================
  CONTRIBUTOR
  =====================================
  */

  async getReputation(wallet: string) {
    const { data } = await api.get(
      `/reputation/${wallet}`
    );

    return data;
  },
};

export default ReputationApi;