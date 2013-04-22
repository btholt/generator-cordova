'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var CordovaGenerator = module.exports = function CordovaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CordovaGenerator, yeoman.generators.NamedBase);

CordovaGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n' +
  '\n\nYeoman Cordova (Phonegap upstream) Generator'.red;

  console.log(welcome);

  var prompts = [{
    name: 'projectName',
    message: 'What is the name of your app?',
    default: 'Some App'
  },
  {
    name: 'iosApp',
    message: 'Would you like to scaffold iOS?',
    default: 'Y/n'
  },
  {
    name: 'androidApp',
    message: 'Would you like to scaffold Android?',
    default: 'Y/n'
  },
  {
    name: 'blackberryApp',
    message: 'Would you like to scaffold Blackberry?',
    default: 'Y/n'
  },];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.someOption = (/y/i).test(props.someOption);

    cb();
  }.bind(this));
};

CordovaGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/css');
  this.mkdir('app/img');
  this.mkdir('app/js');
  this.copy('_index.html', 'app/index.html');
  this.copy('_index.css', 'app/index.css');
  this.copy('_index.js', 'app/index.js');
  this.copy('_config.xml', 'app/config.xml');

  this.mkdir('platforms');
  this.mkdir('merges');

  this.copy('_package.json', 'package.json');
  this.copy('_component.json', 'component.json');
};

CordovaGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
