export const idlFactory = ({ IDL }) => {
  const NFT = IDL.Service({
    'getByte' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'getID' : IDL.Func([], [IDL.Principal], ['query']),
    'getName' : IDL.Func([], [IDL.Text], ['query']),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'transferOwnerShip' : IDL.Func([IDL.Principal], [IDL.Text], []),
  });
  return NFT;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Principal, IDL.Vec(IDL.Nat8)];
};
