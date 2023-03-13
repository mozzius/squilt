import {
  Compose,
  Constant,
  Identity,
  Parser as P,
  Objects,
  arg0,
  arg1,
  Tuples,
  Call,
} from "./vendor/hotscript/dist";

type JSON = P.OneOf<[NullLit, StrLit, NumLit, Obj, Arr]>;

type NumLit = P.Number;

type NullLit = P.Do<[P.Literal<"null">, P.Apply<Constant<null>, []>]>;

type StrLit = P.Do<
  [
    P.Literal<'"'>,
    P.Let<"key", P.Word>,
    P.Literal<'"'>,
    P.Apply<Identity, ["key"]>
  ]
>;

type Obj = P.Do<
  [
    P.Literal<"{">,
    P.Optional<P.WhiteSpaces>,
    P.Let<"key", StrLit>,
    P.Optional<P.WhiteSpaces>,
    P.Literal<":">,
    P.Optional<P.WhiteSpaces>,
    P.Let<"value", JSON>,
    P.Optional<P.WhiteSpaces>,
    P.Literal<"}">,
    P.Apply<
      Compose<[Objects.FromEntries, Objects.Create<[arg0, arg1]>]>,
      ["key", "value"]
    >
  ]
>;

type CSV = P.Do<
  [
    P.Let<"first", JSON>,
    P.Optional<P.WhiteSpaces>,
    P.Let<
      "rest",
      P.Optional<
        P.Do<[P.Literal<",">, P.Optional<P.WhiteSpaces>, P.Return<CSV>]>,
        []
      >
    >,
    P.Apply<Tuples.Prepend, ["first", "rest"]>
  ]
>;

type Arr = P.Do<
  [
    P.Literal<"[">,
    P.Optional<P.WhiteSpaces>,
    P.Let<"values", CSV>,
    P.Optional<P.WhiteSpaces>,
    P.Literal<"]">,
    P.Apply<Identity, ["values"]>
  ]
>;

type res1 = Call<CSV, 'null, 32, "helo"'>;
//    ^?
