import { OptWS, WS } from "../utils";
import { Parser as P } from "../vendor/hotscript/dist";

export type AnalyzeStmt = P.Do<
  [
    P.Literal<"ANALYZE">,
    P.Optional<
      P.Do<
        [WS, P.Word, P.Optional<P.Do<[OptWS, P.Literal<".">, OptWS, P.Word]>>]
      >
    >
  ]
>;
