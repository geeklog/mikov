
import Compiler from '../html/scrape-rule-compiler2';

const compiler = new Compiler();

compiler.compile(`
  script => remove
  pretty
  json {
    pronounce: .in-base-top => text => cleanup,
    definition: .base-list => text => cleanup,
    examples: [
      on .article .text-sentence => text => cleanup,
    ]
  }
`);
