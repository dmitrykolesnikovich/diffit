(async () => await main())()

async function main() {
    await loadFont('fonts/Filmotype_Major.otf');
    initializeContext()
    await firstLevel();
}
