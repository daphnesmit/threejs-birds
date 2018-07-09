const requireCached = require('../src/gulp/require-cached');
const config = require('../config');
const log = require('../src/debug/log');
const walkFileListSync = require('../src/node/file/walk-file-list-sync');
const path = require('path');

const gulp = requireCached('gulp');
const webpack = requireCached('webpack');
const UglifyJsPlugin = requireCached('uglifyjs-webpack-plugin');

const createAliasObject = () => {

    const components = getReferences('components');
    const utilities = getReferences('utilities');

    utilities['@utilities'] = path.resolve(__dirname, '../../', path.join(config.source.getPath('utilities'), '/'));

    return { ...components, ...utilities };

}

const getReferences = (folder) => {

    const components = walkFileListSync(config.source.getPath(folder), 'javascript');
    const stripPath = path.join(config.source.getPath(folder), '/');
    return [].reduce.call(components, (data, component) => {

        const moduleName = component.replace(stripPath, '').replace('\\', '/').split('/')[0];
        data[`@${folder}/${moduleName}`] = path.resolve(__dirname, '../../', component, moduleName);

        return data;

    }, {});

}

const compilerConfigs = {};

const configurePlugins = () => {

    const plugins = [];

    if (config.minify) {

        plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
        plugins.push(new webpack.NoEmitOnErrorsPlugin());
        plugins.push(new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                keep_classnames: true,
                keep_fnames: true,
                mangle: {
                    safari10: true
                }
            }
        }));

    }

    return plugins;
};

const configureBabelLoader = (browserlist) => {
    return {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                plugins: ['syntax-dynamic-import', 'transform-es2015-arrow-functions'],
                presets: [
                    ['env', {
                        modules: false,
                        useBuiltIns: true,
                        targets: {
                            browsers: browserlist,
                        },
                    }]
                ],
            },
        },
    };
};

const esLintConfig = {
    enforce: 'pre',
    test: /\.js?$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
}

const baseConfig = {
    context: path.resolve(__dirname),
    bail: config.throwError,
    output: {
        path: path.resolve(__dirname, '../../') + '/' + config.dest.getPath('javascript'),
        filename: '[name].js',
        publicPath: `${config.dest.getPath('javascript').replace(config.dest.getPath('root'), '')}/`
    },
    resolve: {
        alias: createAliasObject()
    },
    cache: {},
    devtool: config.sourcemaps ? 'source-map' : false
};


compilerConfigs.modernConfig = {
    ...baseConfig,
    ...{
        entry: {
            'main-es': path.resolve(__dirname, '../../source/javascript', 'main-es.js')
        },
        output: {
            ...baseConfig.output,
            ...{
                chunkFilename: '[name].chunk-es.js',
            },
        },
        plugins: configurePlugins(),
        module: {
            rules: [
                configureBabelLoader(config.browsers.modern),
                esLintConfig,
            ],
        },
    },
};

compilerConfigs.legacyConfig = {
    ...baseConfig,
    ...{
        entry: {
            'main': ['babel-polyfill', path.resolve(__dirname, '../../source/javascript', 'main.js')]
        },
        output: {
            ...baseConfig.output,
            ...{
                chunkFilename: '[name].chunk.js',
            },
        },
        plugins: configurePlugins(),
        module: {
            rules: [
                configureBabelLoader(config.browsers.legacy),
                esLintConfig,
            ],
        },
    },
};

const createCompiler = (config) => {
    const compiler = webpack(config);
    return () => {
        return new Promise((resolve, reject) => {
            compiler.run((error, stats) => {

                onWebpackCallback(error, stats);
                resolve();

            });
        });
    };
};

const onWebpackCallback = (error, stats, opt_prevStats) => {

    if (stats.stats) {
        stats.stats.forEach(stat => {
            logStats(stat);
        });
    } else {

        logStats(stats);
    }

    if (error) log.error({
        sender: 'js',
        data: [error]
    });

    if (config.verbose) log.info({
        sender: 'js',
        message: 'compiling...'
    });


}

function logStats(stats) {

    console.log(`\n ${stats.toString({ colors: true })} \n`);

}

const createCompilerPromise = () => {

    const promises = [];

    Object.keys(compilerConfigs).forEach(configName => {
        promises.push(createCompiler(compilerConfigs[configName])());
    });

    return promises;

}

gulp.task('js', function (callback) {

    Promise.all(createCompilerPromise())
        .then(() => callback())
        .catch(e => console.warn('Error whilst compiling JS', e));

});

module.exports = {
    compilerConfigs,
    onWebpackCallback
}
