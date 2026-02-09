import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  type Trade = {
    id : Nat;
    symbol : Text;
    direction : { #buy; #sell };
    entryPrice : Float;
    exitPrice : Float;
    quantity : Float;
    profitLoss : Float;
    timestamp : Time.Time;
  };

  type ManagedAccount = {
    id : Nat;
    name : Text;
    balance : Float;
    riskProfile : Text;
  };

  // Add totalCapital field to PerformanceMetrics
  type PerformanceMetrics = {
    totalPnl : Float;
    totalTrades : Nat;
    winningTrades : Nat;
    roi : Float;
    maxDrawdown : Float;
    totalCapital : Float;
  };

  type UserProfile = {
    name : Text;
    email : ?Text;
  };

  type OldActor = {
    tradesMap : Map.Map<Nat, Trade>;
    accountsMap : Map.Map<Nat, ManagedAccount>;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextTradeId : Nat;
    nextAccountId : Nat;
    performanceMetrics : PerformanceMetrics;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    let updatedMetrics : PerformanceMetrics = {
      old.performanceMetrics with
      totalCapital = 327.0
    };
    { old with performanceMetrics = updatedMetrics };
  };
};
