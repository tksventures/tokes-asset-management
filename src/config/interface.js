import readline from 'readline';

const appInterface = readline.createInterface(process.stdin, process.stdout);

export function ask(questionText) {
  return new Promise((resolve) => {
    appInterface.question(questionText, resolve);
  });
}

export default appInterface;
