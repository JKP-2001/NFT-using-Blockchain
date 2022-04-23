import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'Mint' : (arg_0: string, arg_1: Array<number>) => Promise<Principal>,
  'checkBalance' : () => Promise<bigint>,
  'claimed' : () => Promise<boolean>,
  'freeDang' : () => Promise<string>,
  'getAllNFT' : (arg_0: Principal) => Promise<Array<Principal>>,
  'getListedNFT' : () => Promise<Array<Principal>>,
  'getOpendId' : () => Promise<Principal>,
  'getOriginalOwner' : (arg_0: Principal) => Promise<Principal>,
  'getPrice' : (arg_0: Principal) => Promise<bigint>,
  'isListed' : (arg_0: Principal) => Promise<boolean>,
  'sellItem' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
