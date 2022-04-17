export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'Mint' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
