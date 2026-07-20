import MembershipNFT from "@/src/abi/MembershipNFT.json";
import Presale from "@/src/abi/Presale.json";
import PresaleToken from "@/src/abi/PresaleToken.json";
import DAOGovernance from "@/src/abi/DAOGovernance.json";

export const CONTRACTS = {
  /*
  =====================================
  MEMBERSHIP NFT
  =====================================
  */

  MembershipNFT: {
    address: "0xd906Ca726EbaB12c6ad627d12d70F4c5a8807922",
    abi: MembershipNFT.abi,
  },

  /*
  =====================================
  SET TOKEN
  =====================================
  */

  PresaleToken: {
    address: "0x0d81FF96550C692A77755B24C4a5bF86B6c9519A",
    abi: PresaleToken.abi,
  },

  /*
  =====================================
  PRESALE
  =====================================
  */

  Presale: {
    address: "0x967eEdb35704E692fe106b333c2d32479fbB11B7",
    abi: Presale.abi,
  },

  /*
  =====================================
  DAO GOVERNANCE
  =====================================
  */

  DAOGovernance: {
    address: "0xeDE65Cd7Cfb622B8d299A6982A77d514080dAf1A",
    abi: DAOGovernance.abi,
  },
};