require("./src/dump.json").forEach(s => {
    console.log(`     - { label: "${s.SchoolName}", value: "${s.SchoolID}" }`)
})