import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Nat "mo:core/Nat";

actor {
  type Quote = {
    id : Nat;
    text : Text;
    author : ?Text;
  };

  module Quote {
    public func compare(quote1 : Quote, quote2 : Quote) : Order.Order {
      Nat.compare(quote1.id, quote2.id);
    };
  };

  let quotes : [Quote] = [
    {
      id = 1;
      text = "The best way to predict the future is to invent it.";
      author = ?"Alan Kay";
    },
    {
      id = 2;
      text = "Why do programmers prefer dark mode? Because light attracts bugs!";
      author = null;
    },
    {
      id = 3;
      text = "To understand recursion, one must first understand recursion.";
      author = null;
    },
    {
      id = 4;
      text = "If at first you don’t succeed; call it version 1.0";
      author = null;
    },
    {
      id = 5;
      text = "Debugging: Removing the needles from the haystack.";
      author = null;
    },
  ];

  public query ({ caller }) func getJoke(id : Nat) : async Quote {
    switch (quotes.find(func(quote) { quote.id == id })) {
      case (?quote) { quote };
      case (null) { Runtime.trap("Joke not found") };
    };
  };

  public query ({ caller }) func getAllJokes() : async [Quote] {
    quotes.sort();
  };

  public query ({ caller }) func getTotalJokes() : async Nat {
    quotes.size();
  };
};
