'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the extraordinary ' + chalk.red('generator-vuestacks') + ' generator!'
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your app name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description',
        default: 'A fullstack vue app'
      },
      {
        type: 'input',
        name: 'author',
        message: "Author's name",
        default: ''
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Git repository',
        default: ''
      },
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: 'MIT'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    mkdirp(this.props.name);
    this.destinationRoot(this.destinationPath(this.props.name));
  }

  writing() {
    this._writePackageJSON();
    this._writeGitignore();
    this._writeReadMe();
    this._writeTSConfig();
    this._writeTSLint();
    this._writeSrc();
    this._writeSrcServer();
    this._writeSrcClient();
    this._writeSrcClientFolders();
  }

  _writePackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author,
        repository: this.props.repository,
        license: this.props.license
      }
    );
  }

  _writeGitignore() {
    this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
  }

  _writeReadMe() {
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), {
      name: this.props.name,
      author: this.props.author,
      description: this.props.description,
      license: this.props.license,
      year: new Date().getFullYear()
    });
  }

  _writeTSConfig() {
    this.fs.copyTpl(
      this.templatePath('_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
  }

  _writeTSLint() {
    this.fs.copyTpl(
      this.templatePath('_tslint.json'),
      this.destinationPath('tslint.json')
    );
  }

  _writeSrc() {
    mkdirp('src');
  }

  _writeSrcServer() {
    this.fs.copyTpl(
      this.templatePath('src/server/**'),
      this.destinationPath('src/server')
    );
  }

  _writeSrcClient() {
    this.fs.copyTpl(
      this.templatePath('src/client/_babelrc'),
      this.destinationPath('src/client/.babelrc')
    );
    this.fs.copyTpl(
      this.templatePath('src/client/_eslintignore'),
      this.destinationPath('src/client/.eslintignore')
    );
    this.fs.copyTpl(
      this.templatePath('src/client/_eslintrc.js'),
      this.destinationPath('src/client/.eslintrc.js')
    );
    this.fs.copyTpl(
      this.templatePath('src/client/_postcssrc.js'),
      this.destinationPath('src/client/.postcssrc.js')
    );
    this.fs.copyTpl(
      this.templatePath('src/client/_index.html'),
      this.destinationPath('src/client/index.html'),
      {
        name: this.props.name
      }
    );
  }

  _writeSrcClientFolders() {
    this.fs.copyTpl(
      this.templatePath('src/client/build/**'),
      this.destinationPath('src/client/build')
    );
    this.fs.copyTpl(
      this.templatePath('src/client/config/**'),
      this.destinationPath('src/client/config')
    );
    this.fs.copy(
      this.templatePath('src/client/src/assets/_logo.png'),
      this.destinationPath('src/client/src/assets/logo.png')
    );
    this.fs.copyTpl(
      this.templatePath('src/client/src/components/_HelloWorld.vue'),
      this.destinationPath('src/client/src/components/HelloWorld.vue'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/client/src/router/**'),
      this.destinationPath('src/client/src/router')
    );
    this.fs.copyTpl(
      this.templatePath('src/client/src/_App.vue'),
      this.destinationPath('src/client/src/App.vue'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/client/src/_main.js'),
      this.destinationPath('src/client/src/main.js')
    );
    this.fs.copy(
      this.templatePath('src/client/static/_logo.png'),
      this.destinationPath('src/client/static/logo.png')
    );
    this.fs.copyTpl(
      this.templatePath('src/client/test/**'),
      this.destinationPath('src/client/test')
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
