export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'Mint' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Principal], []),
    'checkBalance' : IDL.Func([], [IDL.Nat], []),
    'claimed' : IDL.Func([], [IDL.Bool], []),
    'freeDang' : IDL.Func([], [IDL.Text], []),
    'getAllNFT' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'getListedNFT' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getOpendId' : IDL.Func([], [IDL.Principal], ['query']),
    'getOriginalOwner' : IDL.Func([IDL.Principal], [IDL.Principal], ['query']),
    'getPrice' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'isListed' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'sellItem' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
