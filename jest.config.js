module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // testTimeout: 30000, 
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.jest.json',  // Use the test-specific TypeScript config
        }],
        "^.+\\.svg$": "jest-transform-stub",
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@api/(.*)$': '<rootDir>/src/api/$1',
        '^@slices/(.*)$': '<rootDir>/src/slices/$1',
        '^@store/(.*)$': '<rootDir>/src/store/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub",
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};
