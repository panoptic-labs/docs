module.exports = function externalFonts() {
  return {
    name: "external-fonts",
    configureWebpack(config) {
      const fontRule = config.module.rules.find(
        (rule) => rule.test instanceof RegExp && rule.test.test("font.woff2"),
      );
      const fontLoader = fontRule?.use?.find(
        (entry) =>
          entry.options?.name === "assets/fonts/[name]-[contenthash].[ext]",
      );
      if (!fontLoader) {
        throw new Error("Could not locate the Docusaurus font asset loader");
      }
      // Unicode ranges can defer unused subsets only when fonts are separate assets.
      fontLoader.options.limit = 0;
      return {};
    },
  };
};
