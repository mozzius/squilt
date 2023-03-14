import { WS } from "../utils";
import { Parser as P } from "../vendor/hotscript/dist";

export type BeginStmt = P.Do<
  [
    P.Literal<"BEGIN">,
    P.Optional<
      P.OneOf<
        [
          P.Do<[WS, P.Literal<"DEFERRED">]>,
          P.Do<[WS, P.Literal<"IMMEDIATE">]>,
          P.Do<[WS, P.Literal<"EXCLUSIVE">]>
        ]
      >
    >,
    P.Optional<P.Do<[WS, P.Literal<"TRANSACTION">]>>
  ]
>;

export type CommitStmt = P.Do<
  [
    P.OneOf<[P.Literal<"COMMIT">, P.Literal<"END">]>,
    P.Optional<P.Do<[WS, P.Literal<"TRANSACTION">]>>
  ]
>;

export type RollbackStmt = P.Do<
  [
    P.Literal<"ROLLBACK">,
    P.Optional<P.Do<[WS, P.Literal<"TRANSACTION">]>>,
    P.Optional<
      P.Do<
        [
          WS,
          P.Literal<"TO">,
          P.Optional<P.Do<[WS, P.Literal<"SAVEPOINT">]>>,
          WS,
          P.Let<"savepoint-name", P.Word>
        ]
      >
    >
  ]
>;
