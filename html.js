export const removeTag = tag =>
  str => str.replace(new RegExp(`<${tag}>`, 'g'), '')
            .replace(new RegExp(`<${tag} .+?>`, 'g'), '')
            .replace(new RegExp(`<\/${tag}>`, 'g'), '');

const parseTag = (tagExp, parser) => str => str.replace(new RegExp(tagExp, 'g'), parser);

const parseUl = parseTag('<ul>(.+?)<ul>', (g0, g1) => `${g1}\n`);

const parseLi = parseTag('<li>(.+?)</li>', (g0, g1) => `- ${g1}\n`);