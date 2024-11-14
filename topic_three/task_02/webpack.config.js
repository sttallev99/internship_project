import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default{
    mode: "development",
    entry: {
        index: './src/index.js',
        details: './src/details.js'
    },
    // entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/dist/[name]bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
