import {promises as fs} from 'fs';
import {After, Before, When} from 'cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';
// import {lift, questionNames} from '../../../../lib/index.cjs';
import {lift, questionNames} from '../../../../src';

Before(async function () {
  stubbedFs({'README.md': ''});
});

After(function () {
  stubbedFs.restore();
});

When('the project is lifted', async function () {
  const chosenScaffolder = any.word();

  await fs.writeFile(`${process.cwd()}/README.md`, this.existingReadmeContent);

  await lift({
    scaffolders: {
      [chosenScaffolder]: () => ({
        badges: this.badges
      })
    },
    decisions: {[questionNames.SCAFFOLDER]: chosenScaffolder}
  });
});
