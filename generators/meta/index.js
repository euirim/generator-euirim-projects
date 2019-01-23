const Generator = require('yeoman-generator');
const S = require('slugify');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('title', {
      type: String,
      required: true,
      desc: 'Project title',
    });
  }

  writing() {
    this.title = this.options.title;
    this.slug = S(this.title);

    const timestamp = new Date();
    const publishPath = `article/${timestamp.getFullYear()}/${this.slug}/`;
    const prodUrl = `https://euirim.org/${publishPath}`;
    const stagingUrl = `http://euirim.org/${publishPath}`;

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('./.gitignore'));

    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'));

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        slug: this.slug,
        userName: this.user.git.name(),
        userEmail: this.user.git.email(),
      });

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        slug: this.slug,
        title: this.title,
        userName: this.user.git.name(),
        userEmail: this.user.git.email(),
        url: prodUrl,
        urlStaging: stagingUrl,
        year: timestamp.getFullYear(),
      });

    const metaJSON = {
      id: (Math.floor(Math.random() * 100000000000) + 1).toString(),
      publishPath,
      stagingUrl,
      url: prodUrl,
      timestamp: '1996-09-06T08:13-0400',
      dateline: 'September 6, 1996',
      header: {
        headline: 'This is your headline in the metadata file',
        subhead: 'Subhead entices the reader.',
        bylines: [{
          name: 'Euirim Choi',
          link: 'https://www.euirim.org',
        }],
      },
      share: {
        fbook: {
          card_title: this.title,
          card_description: 'Euirim is an engineer, journalist, and aspiring scientist interested in cybersecurity, online abuse, artificial intelligence, market power.',
          author: 'euirim',
        },
        twitter: {
          card_title: this.title,
          share_tweet: 'Euirim is an engineer, journalist, and aspiring scientist interested in cybersecurity, online abuse, artificial intelligence, market power.',
          card_description: 'Euirim is an engineer, journalist, and aspiring scientist interested in cybersecurity, online abuse, artificial intelligence, market power.',
          author: '@euirim',
        },
        image: {
          url: `${prodUrl}images/share.jpg`,
          alt: '<Text>',
          type: 'image/jpeg',
          width: '600',
          height: '300',
        },
        keywords: 'Euirim, Choi, UChicago',
      },
    };

    this.fs.writeJSON('meta.json', metaJSON);
  }
};