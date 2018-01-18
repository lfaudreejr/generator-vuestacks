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
      },
      {
        type: 'confirm',
        name: 'tsServer',
        message: 'Use Typescript with the backend?',
        defaults: false
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

    if (this.props.tsServer) {
      this._writeSrc();
      this._writeTSServer();
      this._writeSrcClientTSServer();
      this._writeSrcClientFoldersTSServer();
    } else {
      this._writeJSServer();
      this._writeSrcClientJSServer();
      this._writeSrcClientFoldersJSServer();
    }
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
        license: this.props.license,
        tsServer: this.props.tsServer
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

  _writeSrc() {
    mkdirp('src');
  }

  _writeJSServer() {
    this.fs.copyTpl(
      this.templatePath('src/js/server/**'),
      this.destinationPath('server')
    );
  }

  _writeTSServer() {
    this._writeTSConfig();
    this._writeTSLint();
    this._writeTSSrcServer();
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

  _writeTSSSrcServer() {
    this.fs.copyTpl(
      this.templatePath('src/ts/server/**'),
      this.destinationPath('src/server')
    );
  }

  _writeSrcClientTSServer() {
    this.fs.copyTpl(
      this.templatePath('src/ts/client/_babelrc'),
      this.destinationPath('src/client/.babelrc')
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/_eslintignore'),
      this.destinationPath('src/client/.eslintignore')
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/_eslintrc.js'),
      this.destinationPath('src/client/.eslintrc.js')
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/_postcssrc.js'),
      this.destinationPath('src/client/.postcssrc.js')
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/_index.html'),
      this.destinationPath('src/client/index.html'),
      {
        name: this.props.name
      }
    );
  }

  _writeSrcClientFoldersTSServer() {
    this.fs.copyTpl(
      this.templatePath('src/ts/client/build/**'),
      this.destinationPath('src/client/build')
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/config/**'),
      this.destinationPath('src/client/config')
    );
    this.fs.copy(
      this.templatePath('src/ts/client/src/assets/_logo.png'),
      this.destinationPath('src/client/src/assets/logo.png')
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/src/components/_HelloWorld.vue'),
      this.destinationPath('src/client/src/components/HelloWorld.vue'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/src/router/**'),
      this.destinationPath('src/client/src/router')
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/src/_App.vue'),
      this.destinationPath('src/client/src/App.vue'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/src/_main.js'),
      this.destinationPath('src/client/src/main.js')
    );
    this.fs.copy(
      this.templatePath('src/ts/client/static/_logo.png'),
      this.destinationPath('src/client/static/logo.png')
    );
    this.fs.copyTpl(
      this.templatePath('src/ts/client/test/**'),
      this.destinationPath('src/client/test')
    );
  }

  _writeSrcClientJSServer() {
    this.fs.copyTpl(
      this.templatePath('src/js/client/_babelrc'),
      this.destinationPath('client/.babelrc')
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/_eslintignore'),
      this.destinationPath('client/.eslintignore')
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/_eslintrc.js'),
      this.destinationPath('client/.eslintrc.js')
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/_postcssrc.js'),
      this.destinationPath('client/.postcssrc.js')
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/_index.html'),
      this.destinationPath('client/index.html'),
      {
        name: this.props.name
      }
    );
  }

  _writeSrcClientFoldersJSServer() {
    this.fs.copyTpl(
      this.templatePath('src/js/client/build/**'),
      this.destinationPath('client/build')
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/config/**'),
      this.destinationPath('client/config')
    );
    this.fs.copy(
      this.templatePath('src/js/client/src/assets/_logo.png'),
      this.destinationPath('client/src/assets/logo.png')
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/src/components/_HelloWorld.vue'),
      this.destinationPath('client/src/components/HelloWorld.vue'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/src/router/**'),
      this.destinationPath('client/src/router')
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/src/_App.vue'),
      this.destinationPath('client/src/App.vue'),
      {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/src/_main.js'),
      this.destinationPath('client/src/main.js')
    );
    this.fs.copy(
      this.templatePath('src/js/client/static/_logo.png'),
      this.destinationPath('client/static/logo.png')
    );
    this.fs.copyTpl(
      this.templatePath('src/js/client/test/**'),
      this.destinationPath('client/test')
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
