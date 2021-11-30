interface IRandom {
    [key: number]: number
}
const randoms = (nums: number) => {
    const obj:IRandom  = {}
    for (let i = 0; i < nums; i++) {
        let random = Math.floor(Math.random() * 1000) + 1;
        if (obj[random]) obj[random] += 1;
        else obj[random] = 1;
    }
    return obj
}
process.on("message", (message:any) => {
    const obj = randoms(message)
    // @ts-expect-error
    process.send(obj)
})
//un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno.
