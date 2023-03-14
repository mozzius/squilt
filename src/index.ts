import { AlterTableStmt } from "./statements/alter-table";
import { AnalyzeStmt } from "./statements/analyze";
import {
  BeginStmt,
  CommitStmt,
  RollbackStmt,
} from "./statements/transaction-control";
import { VacuumStmt } from "./statements/vacuum";
import { OptWS, WS } from "./utils";
import { Parser as P, Call } from "./vendor/hotscript/dist";

type SqlStmt = P.Do<
  [
    OptWS,
    P.Optional<
      P.Do<
        [
          P.Literal<"EXPLAIN">,
          P.Optional<P.Do<[WS, P.Literal<"QUERY">, WS, P.Literal<"PLAN">]>>
        ]
      >
    >,
    WS,
    P.OneOf<
      [
        AlterTableStmt,
        AnalyzeStmt,
        //   AttachStmt,
        BeginStmt,
        CommitStmt,
        //   CreateIndexStmt,
        //   CreateTableStmt,
        //   CreateTriggerStmt,
        //   CreateViewStmt,
        //   CreateVirtualTableStmt,
        //   DeleteStmt,
        //   DeleteStmtLimited,
        //   DetachStmt,
        //   DropIndexStmt,
        //   DropTableStmt,
        //   DropTriggerStmt,
        //   DropViewStmt,
        //   InsertStmt,
        //   PragmaStmt,
        //   ReindexStmt,
        //   ReleaseStmt,
        RollbackStmt,
        //   SavepointStmt,
        //   SelectStmt,
        //   UpdateStmt,
        //   UpdateStmtLimited,
        VacuumStmt
      ]
    >
  ]
>;

type res1 = Call<SqlStmt, "VACUUM schema INTO file">;
//   ^?
