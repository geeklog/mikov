export default function(handleFunction: (data: any) => any) {
  process.stdin.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === "EPIPE") {
      console.log('error: stdin broken pipe');
      process.exit(0);
    }
  });
  process.stdout.on('error', err => {
    if (err.code === "EPIPE") {
      console.log('error: stdout broken pipe');
      process.exit(0);
    }
  });

  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    data += chunk;
  });
  process.stdin.on('end', () => {
    data = handleFunction(data);
    process.stdout.write(data);
    data = '';
  });
  process.stdin.resume();
}
