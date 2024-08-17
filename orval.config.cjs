module.exports = {
    googoo: {
        input: './assets/api-docs.yaml',
        output: {
            target: './src/types.ts',
            override: {
                mutator: {
                    path: './src/shared/lib/custom_instance.ts',
                    name: 'customInstance',
                },
            },
            mock: true,
        }
    },
};
