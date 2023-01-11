module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    verbose: true,
    testURL: "http://localhost/",
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,vue}",
        "!**/node_modules/**"
    ],
    coverageReporters: ["html", "text-summary"]
}
