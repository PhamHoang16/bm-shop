/** @type {import('next').NextConfig} */
const config = {
    webpack: (config, { dev }) => {
        if (dev) {
            config.devtool = 'source-map';
        }
        return config;
    },
};

export default config;