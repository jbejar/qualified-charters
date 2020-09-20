require("./src/dump.json").forEach(s => {
    console.log(`     - { label: "${s.SchoolName}", value: "${s.SchoolID}" }`)
})
console.log(`- { label: "Qualified", value: "qualified" }`)
console.log(`- { label: "Transparency", value: "transparency" }`)