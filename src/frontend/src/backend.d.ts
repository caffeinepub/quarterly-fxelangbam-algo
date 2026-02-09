import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PerformanceMetrics {
    roi: number;
    totalTrades: bigint;
    totalCapital: number;
    totalPnl: number;
    winningTrades: bigint;
    maxDrawdown: number;
}
export interface ManagedAccount {
    id: bigint;
    balance: number;
    name: string;
    riskProfile: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
    email?: string;
}
export interface Trade {
    id: bigint;
    direction: Variant_buy_sell;
    profitLoss: number;
    timestamp: Time;
    quantity: number;
    entryPrice: number;
    exitPrice: number;
    symbol: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_buy_sell {
    buy = "buy",
    sell = "sell"
}
export interface backendInterface {
    addAccount(account: ManagedAccount): Promise<bigint>;
    addTrade(trade: Trade): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAccount(id: bigint): Promise<void>;
    deleteTrade(id: bigint): Promise<void>;
    getAccount(id: bigint): Promise<ManagedAccount | null>;
    getAllAccounts(): Promise<Array<ManagedAccount>>;
    getAllTradesSorted(): Promise<Array<Trade>>;
    getAllTradesSortedByPnl(): Promise<Array<Trade>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPerformanceMetrics(): Promise<PerformanceMetrics>;
    getTrade(id: bigint): Promise<Trade | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAccount(id: bigint, updatedAccount: ManagedAccount): Promise<void>;
    updatePerformanceMetrics(newMetrics: PerformanceMetrics): Promise<void>;
    updateTrade(id: bigint, updatedTrade: Trade): Promise<void>;
}
