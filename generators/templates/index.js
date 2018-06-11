const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('title', {
      type: String,
      required: true,
      desc: 'Project title',
    });
  }

  prompting() {
    const questions = [
      {
        type: 'confirm',
        name: 'archie',
        message: 'Would you like to include an ArchieML configuration?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'spreadsheet',
        message: 'Would you like Google Spreadsheet integration?',
        default: false,
      },
    ];

    return this.prompt(questions).then((answers) => {
      this.archie = answers.archie;
      this.spreadsheet = answers.spreadsheet;
    });
  }

  template() {
    this.composeWith(require.resolve('../bundler-webpack'), {
      archie: this.archie,
    });
    this.composeWith(require.resolve('../router'), {
      context: true,
    });
    this.composeWith(require.resolve('../gulp-common'));
    this.composeWith(require.resolve('../gulp-statics'));
    if (this.archie) this.composeWith(require.resolve('../archie'));
    if (this.spreadsheet) this.composeWith(require.resolve('../spreadsheet'));
  }

  writing() {
    // Skeleton
    mkdirp('./src/data');
    mkdirp('./dist');
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'), {
        archie: this.archie,
        spreadsheet: this.spreadsheet,
      });
    // Nunjucks templates + js
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src'));

   // Template context
    this.fs.writeJSON('src/data/data.json', {});
    this.fs.writeJSON('src/data/archie.json', {
      headline: 'Test Maroon Headline',
      subhead: 'This is a sample subhead. Make it yours!',
    });

    // Images directories
    mkdirp('./src/images');
    this.fs.copy(
      this.templatePath('dist/images/apple-touch-icon.png'),
      this.destinationPath('dist/images/apple-touch-icon.png'));
    this.fs.copy(
      this.templatePath('dist/images/nameplate.svg'),
      this.destinationPath('dist/images/nameplate.svg'));
    this.fs.copy(
      this.templatePath('dist/images/favicon.ico'),
      this.destinationPath('dist/images/favicon.ico'));
  }

  installing() {
    const dependencies = [
      'gulp-env',
      'node-env-file',
      'run-sequence',
      'secure-keys',
    ];

    this.yarnInstall(dependencies, { dev: true });
  }

  end() {
    this.spawnCommand('gulp');
  }
};
