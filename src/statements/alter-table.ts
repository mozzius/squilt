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
    P.Optional<P.Do<[TypeName, WS]>>,
    ColumnConstraint
  ]
>;

export type ColumnConstraint = P.Do<
  [
    P.Optional<
      P.Do<[P.Literal<"CONSTRAINT">, WS, P.Let<"constraint-name", P.Word>, WS]>
    >,
    P.OneOf<
      [
        // primary key (asc/desc)? conflict-cause autoincrement?
        P.Do<
          [
            P.Literal<"PRIMARY">,
            WS,
            P.Literal<"KEY">,
            WS,
            P.Optional<P.Do<[P.Literal<"ASC"> | P.Literal<"DESC">, WS]>>,
            ConflictCause,
            P.Optional<P.Do<[P.Literal<"AUTOINCREMENT">, WS]>>
          ]
        >,
        // not null conflict-cause
        P.Do<[P.Literal<"NOT">, WS, P.Literal<"NULL">, ConflictCause]>,
        // unique conflict-cause
        P.Do<[P.Literal<"UNIQUE">, ConflictCause]>,
        // check (expr)
        P.Do<
          [
            P.Literal<"CHECK">,
            WS,
            P.Literal<"(">,
            OptWS,
            Expr,
            OptWS,
            P.Literal<")">
          ]
        >,
        // default "(" expr ")" | literal-value | signed-number
        P.Do<
          [
            P.Literal<"DEFAULT">,
            WS,
            P.OneOf<
              [
                P.Do<[P.Literal<"(">, OptWS, Expr, OptWS, P.Literal<")">]>,
                LiteralValue,
                SignedNumber
              ]
            >
          ]
        >,
        // collate collation-name
        P.Do<[P.Literal<"COLLATE">, WS, P.Let<"collation-name", P.Word>]>,
        // foreign-key-clause

        // INCOMPLETE

        // (generated always)? as  "(" expr ")" (virtual | stored)
        P.Do<
          [
            P.Optional<
              P.Do<[P.Literal<"GENERATED">, WS, P.Literal<"ALWAYS">, WS]>
            >,
            P.Literal<"AS">,
            WS,
            P.Literal<"(">,
            OptWS,
            Expr,
            OptWS,
            P.Literal<")">,
            WS,
            P.Optional<P.OneOf<[P.Literal<"VIRTUAL">, P.Literal<"STORED">]>>
          ]
        >
      ]
    >
  ]
>;

type ConflictCause = P.Optional<
  P.Do<
    [
      P.Literal<"ON">,
      WS,
      P.Literal<"CONFLICT">,
      WS,
      P.OneOf<
        [
          P.Literal<"ROLLBACK">,
          P.Literal<"ABORT">,
          P.Literal<"FAIL">,
          P.Literal<"IGNORE">,
          P.Literal<"REPLACE">
        ]
      >,
      WS
    ]
  >
>;

// INCOMPLETE
export type TypeName = P.Word;

// INCOMPLETE
export type Expr = P.Word;

export type LiteralValue = P.OneOf<
  [
    P.Word,
    P.Literal<"NULL">,
    P.Literal<"TRUE">,
    P.Literal<"FALSE">,
    P.Literal<"CURRENT_TIME">,
    P.Literal<"CURRENT_DATE">,
    P.Literal<"CURRENT_TIMESTAMP">
  ]
>;

export type SignedNumber = P.Do<
  [P.Optional<P.Do<[P.Literal<"+" | "-">, WS]>>, P.Let<"number", P.Word>]
>;
