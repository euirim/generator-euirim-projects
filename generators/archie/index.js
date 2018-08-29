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
      headline: 'Test Maroon Headline',
      subhead: 'This is a sample subhead. Make it yours!',
      sections: [{
          type: 'text',
          text: 'Fraternity parties have no place at the University of Chicago. They are horrific, nauseating, and claustrophobic, rife with social anxieties and sweaty bodies weirdly undulating to suggestive music. They are a poor excuse for genuine camaraderie. Instead, through cheap liquor and obnoxiously loud music, they render their guests invincibly stupid and permanently deaf. I avoid them all at costs, particularly because of the music—which I can safely assume would be a sample of the latest noisome albums. But why am I right? For that, we must turn to a philosopher named Hannah Arendt.',
        },
        {
          type: 'text',
          text: 'Few political theorists of the 20th century were as ingenious, intuitive, and still sorely underappreciated as Hannah Arendt. Her almost three-decade-long enterprise in American academia (including teaching at the University of Chicago) produced a body of literature that masterfully schematized authoritarian regimes, critiqued the liberal nation-state, and offered a new model of politics that emulated the Athenian polis and its veneration of deliberative democracy and a robust public sphere.',
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