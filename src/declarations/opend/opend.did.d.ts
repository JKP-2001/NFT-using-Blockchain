import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'Mint' : (arg_0: string, arg_1: Array<number>) => Promise<Principal>,
  'getAllNFT' : (arg_0: Principal) => Promise<Array<Principal>>,
  'getOpendId' : () => Promise<Principal>,
  'sellItem' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
