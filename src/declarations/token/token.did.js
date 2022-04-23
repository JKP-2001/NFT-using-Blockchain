export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'Balance' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'sendToken' : IDL.Func([], [IDL.Text], []),
    'transferMoney' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
