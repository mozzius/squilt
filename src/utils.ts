import type { Call, Parser as P, Tuples } from "./vendor/hotscript/dist";

export type WS = P.WhiteSpaces;
export type OptWS = P.Optional<P.WhiteSpaces>;

export type WordList = P.Do<
  [
    P.Let<"first", P.Word>,
    P.Let<
      "rest",
      P.Optional<P.Do<[P.Literal<" ">, P.Return<WordList>]>, []>
    >,
    P.Apply<Tuples.Prepend, ["first", "rest"]>
  ]
>;

type res1 = Call<WordList, "hello  Woijasdji world a b c">;
//   ^?
