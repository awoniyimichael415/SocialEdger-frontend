import MembershipNFT from "@/src/abi/MembershipNFT.json";
import Presale from "@/src/abi/Presale.json";
import PresaleToken from "@/src/abi/PresaleToken.json";

export const CONTRACTS = {
  MembershipNFT: {
    address: "0xe4353D2092B6bEbf7737227e405Ac7CcD3B212bD", // your latest deployed
    abi: MembershipNFT.abi,
  },

  PresaleToken: {
    address: "0x5a191cc17FCEC9791B23366f775fD8f8FA1BE3a8",
    abi: PresaleToken.abi,
  },

  Presale: {
    address: "0x8003365Ff5948fb33fE302332B5a2fc2DE2d116c",
    abi: Presale.abi,
  },
};