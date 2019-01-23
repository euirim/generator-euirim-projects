const Generator = require('yeoman-generator');
const fs = require('fs-extra');

module.exports = class extends Generator {

  prompting() {
    const prompts = [{
      name: 'docId',
      message: 'What\'s your Google Doc ID?',
    }];

    return this.prompt(prompts).then((answers) => {
      this.docId = answers.docId;
    });
  }

  writing() {
    fs.appendFileSync(this.destinationPath('.env'), `\nARCHIEDOC=${this.docId}`);

    this.fs.copy(
      this.templatePath('gulp/tasks/archie.js'),
      this.destinationPath('gulp/tasks/archie.js'));

    this.fs.writeJSON('src/data/archie.json', {
      headline: 'Test Headline',
      subhead: 'This is a sample subhead. Make it yours!',
      sections: [{
          type: 'text',
          text: 'After the demise of the Second Triumvirate, Augustus restored the outward façade of the free Republic, with governmental power vested in the Roman Senate, the executive magistrates, and the legislative assemblies. In reality, however, he retained his autocratic power over the Republic as a military dictator. By law, Augustus held a collection of powers granted to him for life by the Senate, including supreme military command, and those of tribune and censor.',
        },
        {
          type: 'text',
          text: 'The reign of Augustus initiated an era of relative peace known as the Pax Romana. The Roman world was largely free from large-scale conflict for more than two centuries, despite continuous wars of imperial expansion on the Empire\'s frontiers and the year-long civil war known as the "Year of the Four Emperors" over the imperial succession. Augustus dramatically enlarged the Empire, annexing Egypt, Dalmatia, Pannonia, Noricum, and Raetia, expanding possessions in Africa, and completing the conquest of Hispania, but suffered a major setback in Germania. Beyond the frontiers, he secured the Empire with a buffer region of client states and made peace with the Parthian Empire through diplomacy.',
        }
      ],
    });
  }

  install() {
    const dependencies = [
      'archieml-pipe'
    ];

    this.yarnInstall(dependencies, {
      save: true
    });
  }
};