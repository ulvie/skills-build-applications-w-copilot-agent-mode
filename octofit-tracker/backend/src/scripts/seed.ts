/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Workout from '../models/workout'
import Leaderboard from '../models/leaderboard'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'

async function run() {
  console.log('Connecting to', MONGO_URL)
  await mongoose.connect(MONGO_URL)

  console.log('Dropping existing collections (if any)')
  const collections = await mongoose.connection.db.listCollections().toArray()
  for (const c of collections) {
    await mongoose.connection.db.dropCollection(c.name)
  }

  console.log('Creating sample teams and users')
  const teamA = await Team.create({ name: 'Seahorse Sprinters' })
  const teamB = await Team.create({ name: 'Octo Climbers' })

  const users = await User.create([
    { name: 'Alice Marlow', email: 'alice@example.com', role: 'admin', team: teamA._id },
    { name: 'Bob Finch', email: 'bob@example.com', role: 'member', team: teamA._id },
    { name: 'Cara N.', email: 'cara@example.com', role: 'member', team: teamB._id }
  ])

  teamA.members = [users[0]._id, users[1]._id]
  teamB.members = [users[2]._id]
  await teamA.save()
  await teamB.save()

  console.log('Creating sample activities')
  await Activity.create([
    { user: users[0]._id, type: 'running', durationMinutes: 30, distanceKm: 5.2, calories: 320 },
    { user: users[1]._id, type: 'cycling', durationMinutes: 45, distanceKm: 18, calories: 520 },
    { user: users[2]._id, type: 'swimming', durationMinutes: 60, distanceKm: 2, calories: 600 }
  ])

  console.log('Creating sample workouts')
  await Workout.create([
    { title: 'Full Body Blast', description: 'High intensity circuit', exercises: [{ name: 'Push-up', reps: 15, sets: 3 }, { name: 'Squat', reps: 20, sets: 3 }], durationMinutes: 40 },
    { title: 'Morning Run', description: 'Easy paced run', exercises: [], durationMinutes: 25 }
  ])

  console.log('Creating leaderboard entries')
  await Leaderboard.create([
    { user: users[0]._id, score: 1240, rank: 1 },
    { user: users[1]._id, score: 980, rank: 2 },
    { user: users[2]._id, score: 860, rank: 3 }
  ])

  console.log('Seed complete')
  await mongoose.disconnect()
}

run().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
