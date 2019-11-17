import nearley from "nearley";
import grammar from "./grammar.js";
const parser = new nearley.Parser
(nearley.Grammar.fromCompiled(grammar));
parser.feed("foo\n");
console.log(parser.results); // [[[[ "foo" ],"\n" ]]]
