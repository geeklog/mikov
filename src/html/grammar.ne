main -> (statement "\n"):+
statement -> "foo" | "bar"

Chunk -> _ Block _
Block -> "pretty"
      | "unescape"
      | "removeEmptyLines"
      | Selector "=>" Action

SelectorStatement -> Selector _ "=>" _ Action

Selector -> on __ SelectorExp
      | SelectorExp

SelectorExp -> SingleSelectorExp
      | SingleSelectorExp __ SingleSelectorExp

SingleSelectorExp ->
      | "." word-word

pretty
unescape
removeEmptyLines
.items-area => select
on .items-area .item => json {
  title: dl dt a => encodeURIComponent(.href) => html,
  desc: dl dd => html,
  image: dl img => encodeURIComponent(.src) => html,
  label: div.meta-data label => text
  status: div.meta-data ul.status li => [0] => text
}

# Whitespace
_ -> null | _ [\s] {% function() {} %}
__ -> [\s] | __ [\s] {% function() {} %}