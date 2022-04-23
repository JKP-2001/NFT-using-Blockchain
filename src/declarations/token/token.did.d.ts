import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'Balance' : (arg_0: Principal) => Promise<bigint>,
  'sendToken' : () => Promise<string>,
  'transferMoney' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
