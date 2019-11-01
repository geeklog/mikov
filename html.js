exports.removeTag = tag =>
  str => str.replace(new RegExp(`<${tag}>`, 'g'), '')
            .replace(new RegExp(`<${tag} .+?>`, 'g'), '')
            .replace(new RegExp(`<\/${tag}>`, 'g'), '');

exports.parseTag = (tagExp, parser) => str => str.replace(new RegExp(tagExp, 'g'), parser);

// exports.parseUl = parseTag('<ul>(.+?)<ul>', (g0, g1) => `${g1}\n`);
// exports.parseLi = parseTag('<li>(.+?)</li>', (g0, g1) => `- ${g1}\n`);