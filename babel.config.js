module.exports = (api) => {
  const isEnvProduction = api.env('production');
  const isEnvDevelopment = api.env('development');
  return {
    presets: [
      [
        '@babel/preset-react',
        { runtime: 'automatic', development: isEnvDevelopment },
      ],
      [
        '@babel/preset-env',
        {
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: 'entry',
          // Set the corejs version we are using to avoid warnings in console
          corejs: 3,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { version: '2023-01' }],
      isEnvProduction && [
        'babel-plugin-jsx-remove-data-test-id',
        { attributes: ['data-testid'] },
      ],
    ].filter(Boolean),
  };
};
