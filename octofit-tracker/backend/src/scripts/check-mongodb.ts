import net from 'net'

const HOST = process.env.MONGO_HOST || '127.0.0.1'
const PORT = Number(process.env.MONGO_PORT || '27017')
const TIMEOUT_MS = 2000

function checkMongoRunning(host: string, port: number) {
  return new Promise<void>((resolve, reject) => {
    const socket = new net.Socket()
    let resolved = false

    socket.setTimeout(TIMEOUT_MS)
    socket.once('connect', () => {
      resolved = true
      socket.destroy()
      resolve()
    })
    socket.once('timeout', () => {
      if (!resolved) {
        resolved = true
        socket.destroy()
        reject(new Error('timeout'))
      }
    })
    socket.once('error', () => {
      if (!resolved) {
        resolved = true
        socket.destroy()
        reject(new Error('connection failed'))
      }
    })

    socket.connect(port, host)
  })
}

async function main() {
  try {
    await checkMongoRunning(HOST, PORT)
    console.log(`MongoDB is running at ${HOST}:${PORT}`)
    process.exit(0)
  } catch {
    console.error(`MongoDB is not running at ${HOST}:${PORT}`)
    console.log('Start MongoDB locally before seeding. Example commands:')
    console.log('  net start MongoDB')
    console.log('  OR')
    console.log('  mongod --dbpath C:\\data\\db')
    console.log('If MongoDB is not installed, install it from https://www.mongodb.com/try/download/community')
    process.exit(1)
  }
}

main()
