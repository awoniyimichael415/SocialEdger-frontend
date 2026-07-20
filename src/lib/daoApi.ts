const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

async function request(
  endpoint: string,
  wallet: string,
  body: any = {},
  method: "POST" | "GET" = "POST"
) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST") {
    options.body = JSON.stringify({
      wallet,
      ...body,
    });
  }

  const response = await fetch(
    `${API_URL}/api/dao${endpoint}`,
    options
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Request failed."
    );
  }

  return data;
}

export const DAOApi = {
  /*
  =========================================================
  DASHBOARD
  =========================================================
  */

  overview(wallet: string) {
    return request("/overview", wallet);
  },

  analytics(wallet: string) {
    return request("/analytics", wallet);
  },

  treasury(wallet: string) {
    return request("/treasury", wallet);
  },

  activity(wallet: string) {
    return request("/activity", wallet);
  },

  /*
  =========================================================
  PROPOSALS
  =========================================================
  */

  proposals(wallet: string) {
    return request("/proposals", wallet);
  },

  createProposal(
    wallet: string,
    proposal: {
      title: string;
      description: string;
      category: string;
    }
  ) {
    return request(
      "/proposals/create",
      wallet,
      proposal
    );
  },

  proposalDetails(
    wallet: string,
    proposalId: string
  ) {
    return request(
      `/proposals/${proposalId}`,
      wallet,
      {},
      "GET"
    );
  },

  /*
  =========================================================
  VOTING
  =========================================================
  */

  vote(
    wallet: string,
    proposalId: string,
    decision:
      | "Approve"
      | "Reject"
      | "Abstain"
  ) {
    return request("/vote", wallet, {
      proposalId,
      decision,
    });
  },

  /*
  =========================================================
  MEMBER DAO
  =========================================================
  */

  myProposals(wallet: string) {
    return request(
      "/my-proposals",
      wallet
    );
  },

  governanceHistory(
    wallet: string
  ) {
    return request(
      "/governance-history",
      wallet
    );
  },
};

export default DAOApi;