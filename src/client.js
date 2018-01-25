const process = require('child_process');

process.spawn('npm', ['start'], {
  stdio: 'inherit',
  cwd: 'src/react',
  shell: true,
});
