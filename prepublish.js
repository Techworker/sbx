// ./bundling/prepublish.js
const ora = require('ora');
const timeout = 1000 * 60 * 2;

function prePublish(packageAlias, packagePath) {
  const spinner = ora({
    text: `Building "${packageAlias}" library`,
    spinner: {interval: 0, frames: ['…']}
  }).start();

  try {
    require('child_process').execSync('yarn run test', {timeout, cwd: packagePath});
  } catch (error) {
    spinner.fail(`Could not finish building "${packageAlias}" library`);
    console.log(error.stdout.toString());
    process.exit();
  }

  try {
    require('child_process').execSync('yarn run build', {timeout, cwd: packagePath});
  } catch (error) {
    spinner.fail(`Could not finish building "${packageAlias}" library`);
    console.log(error.stdout.toString());
    process.exit();
  }

  try {
    require('child_process').execSync('git add *', {timeout, cwd: packagePath});
  } catch (error) {
    spinner.fail(`Could not finish building "${packageAlias}" library`);
    console.log(error.stdout.toString());
    process.exit();
  }

  try {
    require('child_process').execSync('git commit -m"package build"', {timeout, cwd: packagePath});
  } catch (error) {
    spinner.fail(`Could not finish building "${packageAlias}" library`);
    console.log(error.stdout.toString());
    process.exit();
  }

  try {
    require('child_process').execSync('git push', {timeout, cwd: packagePath});
  } catch (error) {
    spinner.fail(`Could not finish building "${packageAlias}" library`);
    console.log(error.stdout.toString());
    process.exit();
  }

  spinner.succeed(`Finished building "${packageAlias}" library`);
}

module.exports = prePublish;
