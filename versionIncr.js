// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

if (process.argv.length !== 4) {
  console.log('Wrong parameters: node versionIncr.js --new x.x.x');
  process.exit(0);
}

const newVersion = process.argv[3];

fs.readFile('./package.json', 'utf8', (err1, content) => {
  if (!err1) {
    const regex = /"version": "[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}",/g;
    const replaced = content.replaceAll(regex, `"version": "${newVersion}",`);
    fs.writeFile('./package.json', replaced, (err2) => {
      if (!err2) {
        fs.readFile(
          './src/views/Components/Sidebar/index.tsx',
          'utf8',
          (err5, content2) => {
            if (!err5) {
              const regex2 = /v[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}/g;
              const replaced2 = content2.replaceAll(regex2, `v${newVersion}`);
              fs.writeFile(
                './src/views/Components/Sidebar/index.tsx',
                replaced2,
                (err7) => {
                  if (!err7) {
                    fs.readFile(
                      './public/service-worker.js',
                      'utf8',
                      (err6, content3) => {
                        if (!err6) {
                          const replaced3 = content3.replaceAll(
                            regex2,
                            `v${newVersion}`,
                          );
                          fs.writeFile(
                            './public/service-worker.js',
                            replaced3,
                            (err8) => {
                              if (!err8) {
                                console.log(`Success: ${newVersion}`);
                                process.exit(0);
                              }
                            },
                          );
                        }
                      },
                    );
                  }
                },
              );
            }
          },
        );
      }
    });
  }
});
