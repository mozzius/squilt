import { OptWS, WS } from "../utils";
import type { Parser as P } from "../vendor/hotscript/dist";

export type AlterTableStmt = P.Do<
  [
    P.Literal<"ALTER">,
    WS,
    P.Literal<"TABLE">,
    WS,
    P.Optional<
      P.Do<[P.Let<"schema-name", P.Word>, OptWS, P.Literal<".">, OptWS]>
    >,
    P.Let<"table-name", P.Word>,
    WS,
    P.OneOf<
      [
        // rename to new-table-name
        P.Do<
          [
            P.Literal<"RENAME">,
            WS,
            P.Literal<"TO">,
            WS,
            P.Let<"new-table-name", P.Word>
          ]
        >,
        // rename column? column-name to new-column-name
        P.Do<
          [
            P.Literal<"RENAME">,
            WS,
            P.Optional<P.Do<[P.Literal<"COLUMN">, WS]>>,
            P.Let<"column-name", P.Word>,
            WS,
            P.Literal<"TO">,
            WS,
            P.Let<"new-column-name", P.Word>
          ]
        >,
        // add column? column-name column-def
        P.Do<
          [
            P.Literal<"ADD">,
            WS,
            P.Optional<P.Do<[P.Literal<"COLUMN">, WS]>>,
            ColumnDef
          ]
        >,
        // drop column? column-name
        P.Do<
          [
            P.Literal<"DROP">,
            WS,
            P.Optional<P.Do<[P.Literal<"COLUMN">, WS]>>,
            P.Let<"column-name", P.Word>
          ]
        >
      ]
    >
  ]
>;

// INCOMPLETE
export type ColumnDef = P.Do<
  [
    P.Let<"column-name", P.Word>,
    WS,
    P.Optional<P.Do<[TypeName, WS]>>
    // column constraint
  ]
>;


// INCOMPLETE
export type TypeName = P.Let<"type-name", P.Word>;
