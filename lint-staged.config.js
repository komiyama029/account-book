export default {
	"**/*.ts?(x)": () => "tsc -p tsconfig.json --noEmit",
	"**/*.{js,jsx,ts,tsx}": ["biome check --apply", "biome format --write"],
};
