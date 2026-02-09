import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Float "mo:core/Float";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Trade and Account Types
  public type Trade = {
    id : Nat;
    symbol : Text;
    direction : { #buy; #sell };
    entryPrice : Float;
    exitPrice : Float;
    quantity : Float;
    profitLoss : Float;
    timestamp : Time.Time;
  };

  public type ManagedAccount = {
    id : Nat;
    name : Text;
    balance : Float;
    riskProfile : Text;
  };

  // Add totalCapital field to PerformanceMetrics
  public type PerformanceMetrics = {
    totalPnl : Float;
    totalTrades : Nat;
    winningTrades : Nat;
    roi : Float;
    maxDrawdown : Float;
    totalCapital : Float;
  };

  public type UserProfile = {
    name : Text;
    email : ?Text;
  };

  // Persistence State
  let tradesMap = Map.empty<Nat, Trade>();
  let accountsMap = Map.empty<Nat, ManagedAccount>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextTradeId = 1;
  var nextAccountId = 1;

  // Set default totalCapital for new metrics
  var performanceMetrics : PerformanceMetrics = {
    totalPnl = 0.0;
    totalTrades = 0;
    winningTrades = 0;
    roi = 0.0;
    maxDrawdown = 0.0;
    totalCapital = 327.0;
  };

  // Include Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module Trade {
    public func compare(a : Trade, b : Trade) : Order.Order {
      Nat.compare(a.id, b.id);
    };

    public func compareByPnl(a : Trade, b : Trade) : Order.Order {
      Float.compare(a.profitLoss, b.profitLoss);
    };
  };

  // User Profile Methods
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Trade Methods (CRUD)
  public shared ({ caller }) func addTrade(trade : Trade) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can add trades");
    };
    let id = nextTradeId;
    nextTradeId += 1;
    let newTrade = { trade with id };
    tradesMap.add(id, newTrade);
    id;
  };

  public shared ({ caller }) func updateTrade(id : Nat, updatedTrade : Trade) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can update trades");
    };
    switch (tradesMap.get(id)) {
      case (null) { Runtime.trap("Trade not found") };
      case (?_) {
        tradesMap.add(id, { updatedTrade with id });
      };
    };
  };

  public shared ({ caller }) func deleteTrade(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can delete trades");
    };
    if (not tradesMap.containsKey(id)) {
      Runtime.trap("Trade not found");
    };
    tradesMap.remove(id);
  };

  // Managed Accounts Methods (CRUD)
  public shared ({ caller }) func addAccount(account : ManagedAccount) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can add accounts");
    };
    let id = nextAccountId;
    nextAccountId += 1;
    let newAccount = { account with id };
    accountsMap.add(id, newAccount);
    id;
  };

  public shared ({ caller }) func updateAccount(id : Nat, updatedAccount : ManagedAccount) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can update accounts");
    };
    switch (accountsMap.get(id)) {
      case (null) { Runtime.trap("Account not found") };
      case (?_) {
        accountsMap.add(id, { updatedAccount with id });
      };
    };
  };

  public shared ({ caller }) func deleteAccount(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can delete accounts");
    };
    if (not accountsMap.containsKey(id)) {
      Runtime.trap("Account not found");
    };
    accountsMap.remove(id);
  };

  // Performance Metrics
  public shared ({ caller }) func updatePerformanceMetrics(newMetrics : PerformanceMetrics) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can update metrics");
    };
    performanceMetrics := newMetrics;
  };

  // Public Read-Only Queries - Now Protected
  public query ({ caller }) func getTrade(id : Nat) : async ?Trade {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view trades");
    };
    tradesMap.get(id);
  };

  public query ({ caller }) func getAllTradesSorted() : async [Trade] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view trades");
    };
    tradesMap.values().toArray().sort();
  };

  public query ({ caller }) func getAllTradesSortedByPnl() : async [Trade] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view trades");
    };
    tradesMap.values().toArray().sort(Trade.compareByPnl);
  };

  public query ({ caller }) func getAccount(id : Nat) : async ?ManagedAccount {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view accounts");
    };
    accountsMap.get(id);
  };

  public query ({ caller }) func getAllAccounts() : async [ManagedAccount] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view accounts");
    };
    accountsMap.values().toArray();
  };

  public query ({ caller }) func getPerformanceMetrics() : async PerformanceMetrics {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view performance metrics");
    };
    performanceMetrics;
  };
};
