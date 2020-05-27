module.exports = {
    entry: __dirname + '/src',
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    }
}