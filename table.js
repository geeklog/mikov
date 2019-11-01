export default function makeTable(objs, format) {
  let heads = Object.keys(objs[0]);
  let attrLens = [];
  let datas = [];
  let border = format && format.border;

  for (let i in objs) {
    datas[i] = [];
    for (let j in heads)
      datas[i][j] = objs[i][heads[j]];
  }

  for (let i = 0; i < heads.length; i++) {
    let attrLen = wlen(heads[i]);
    for (let j = 0; j < datas.length; j++) {
      attrLen = Math.max(attrLen, wlen(datas[j][i]));
    }
    attrLens.push(attrLen);
  }

  let corner = border ? '+' : '';
  let vbar = border ? '|' : '';
  let hsplit = `${corner}${attrLens.map(l => repeat('-', l + 2)).join(corner)}${corner}`

  let tbl = [];
  if (border)
    tbl.push(hsplit)
  tbl.push(`${vbar} ${heads.map((d, j) => pad(d, attrLens[j])).join(` ${vbar} `)} ${vbar}`);
  if (border)
    tbl.push(hsplit)

  for (let i = 0; i < datas.length; i++) {
    tbl.push(`${vbar} ${datas[i].map((d, j) => pad(d, attrLens[j])).join(` ${vbar} `)} ${vbar}`);
  }
  if (border)
    tbl.push(hsplit);
  return tbl.join('\n');
}
