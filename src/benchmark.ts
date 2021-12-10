import autocannon from 'autocannon';
import { PassThrough } from 'stream';

function benchmark(url: string) {
    const buf: any = []
    const stream = new PassThrough()
    const inst = autocannon({
        url,
        connections: 100,
        duration: 20,
    })
    autocannon.track(inst, { stream })

    stream.on('data', (data: any) => buf.push(data))
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf))
    })
}
console.log('Benchmark...')
benchmark('https://localhost:8443/info')

benchmark('https://localhost:8443/info-block')