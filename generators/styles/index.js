const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('src/scss/_social.scss'),
      this.destinationPath('src/scss/_social.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_type.scss'),
      this.destinationPath('src/scss/_type.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_variables.scss'),
      this.destinationPath('src/scss/_variables.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_navbar.scss'),
      this.destinationPath('src/scss/_navbar.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_images.scss'),
      this.destinationPath('src/scss/_images.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_header.scss'),
      this.destinationPath('src/scss/_header.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_footer.scss'),
      this.destinationPath('src/scss/_footer.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_comments.scss'),
      this.destinationPath('src/scss/_comments.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_interstitials.scss'),
      this.destinationPath('src/scss/_interstitials.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_forms.scss'),
      this.destinationPath('src/scss/_forms.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_forms.scss'),
      this.destinationPath('src/scss/_forms.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_events.scss'),
      this.destinationPath('src/scss/_events.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_layout.scss'),
      this.destinationPath('src/scss/_layout.scss'));
    this.fs.copy(
      this.templatePath('src/scss/_bootstrap.scss'),
      this.destinationPath('src/scss/_bootstrap.scss'));
    this.fs.copy(
      this.templatePath('src/scss/main.scss'),
      this.destinationPath('src/scss/main.scss'));
  }
  install() {
    const dependencies = [
      'bootstrap',
    ];
    this.yarnInstall(dependencies, {
      save: true,
    });
  }
};
