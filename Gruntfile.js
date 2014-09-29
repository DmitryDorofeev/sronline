module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    atBegin: true
                }
            },
            sass: {
                files: ['public_html/css/main.sass'],
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            },
            requirejs: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/js/*.js',
                ],
                tasks: ['requirejs'],
                options: {
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 8080,
                    base: 'public_html'
                }
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
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
                    'public_html/css/main.css': 'public_html/css/main.sass'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public_html/js",
                    mainConfigFile: 'public_html/js/config.js',
                    paths: {
                        'requireLib': 'require'
                    },
                    name: "config",
                    out: "public_html/build/dist.js",
                    include: ["requireLib"],
                    optimize: "uglify"
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['connect', 'watch']);

};
