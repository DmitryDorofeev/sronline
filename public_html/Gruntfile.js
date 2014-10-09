module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            fest: {
                files: ['../templates/*.xml'],
                tasks: ['fest'],
                options: {
                    atBegin: true
                }
            },
            sass: {
                files: [
                  'css/sass/main.sass',
                  'css/sass/variables.sass',
                  'css/sass/app.sass',
                  'css/sass/game.sass',
                  'css/sass/fonts.sass'
                ],
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            },
//            requirejs: {
//                files: [
//                    'js/**/*.js',
//                    'js/*.js'
//                ],
//                tasks: ['requirejs'],
//                options: {
//                    atBegin: true
//                }
//            },
            server: {
                files: [
                    'js/**/*.js',
                    'css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true
                }
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: '../templates',
                    src: '*.xml',
                    dest: 'js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'css/main.css': 'css/sass/main.sass'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "js",
                    mainConfigFile: 'js/config.js',
                    paths: {
                        'requireLib': 'require'
                    },
                    name: "config",
                    out: "build/dist.js",
                    include: ["requireLib"],
                    optimize: "uglify"
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['watch']);

};
