import { WS } from "../utils";
import type { Parser as P } from "../vendor/hotscript/dist";

export type VacuumStmt = P.Do<
  [
    P.Literal<"VACUUM">,
    P.Optional<P.Do<[WS, P.Let<"schema-name", P.Word>]>>,
    P.Optional<P.Do<[WS, P.Literal<"INTO">, WS, P.Let<"filename", P.Word>]>>
  ]
>;
