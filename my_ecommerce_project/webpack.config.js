const Encore = require('@symfony/webpack-encore');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // Directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // Public path used by the web server to access the output path
    .setPublicPath('/build')
    
    // Copy font files
    .copyFiles({
        from: './public/fonts',
        to: 'fonts/[path][name].[ext]' // Copie les polices dans public/build/fonts
    })

    // Entry configuration
    .addEntry('app', './assets/app.js')
    // Enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge('./assets/controllers.json')
    
    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization
    .splitEntryChunks()
    // Will require an extra script tag for runtime.js
    .enableSingleRuntimeChunk()
    
    // Other configurations...
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })
    
    // Règle pour les fichiers de police
    .addRule({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]', // Format de nom
                outputPath: 'fonts/', // Dossier de sortie
                publicPath: 'fonts/', // Chemin d'accès public
            },
        },
    })
;

module.exports = Encore.getWebpackConfig();
