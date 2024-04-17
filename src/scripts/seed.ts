import 'dotenv/config'

import { neon } from '@neondatabase/serverless'
import * as schema from '../db/schema'
import { drizzle } from 'drizzle-orm/neon-http'
import { env } from '@/env'

const sql = neon(env.DATABASE_URL)
const db = drizzle(sql, { schema })

async function main() {
  try {
    console.log('Seeding database...')

    await db.delete(schema.courses)
    await db.delete(schema.userProgress) // Erase data from clerk
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengesOptions)
    await db.delete(schema.challengesProgress)

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Spanish',
        imageSrc: '/es.svg',
      },
      {
        id: 2,
        title: 'Italian',
        imageSrc: '/it.svg',
      },
      {
        id: 3,
        title: 'French',
        imageSrc: '/fr.svg',
      },
      {
        id: 4,
        title: 'Croatian',
        imageSrc: '/hr.svg',
      },
    ])

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Spanish
        title: 'Unit 1',
        description: 'Learn the basics of Spanish',
        order: 1,
      },
    ])

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit of spanish
        title: 'Nouns',
        order: 1,
      },
      {
        id: 2,
        unitId: 1, // Unit of spanish
        title: 'Verbs',
        order: 2,
      },
      {
        id: 3,
        unitId: 1, // Unit of spanish
        title: 'Verbs',
        order: 3,
      },
      {
        id: 4,
        unitId: 1, // Unit of spanish
        title: 'Verbs',
        order: 4,
      },
      {
        id: 5,
        unitId: 1, // Unit of spanish
        title: 'Verbs',
        order: 5,
      },
    ])

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: 'SELECT',
        question: 'Which one of these is the "the man"?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: 'ASSIST',
        question: 'the man',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: 'SELECT',
        question: 'Which one of these is the "the robot"?',
        order: 3,
      },
    ])

    await db.insert(schema.challengesOptions).values([
      {
        challengeId: 1, // Which one of these is the "the man"?
        imageSrc: '/man.svg',
        correct: true,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 1, // Which one of these is the "the man"?
        imageSrc: '/woman.svg',
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 1, // Which one of these is the "the man"?
        imageSrc: '/robot.svg',
        correct: false,
        text: 'el robot',
        audioSrc: '/es_robot.mp3',
      },
    ])

    await db.insert(schema.challengesOptions).values([
      {
        challengeId: 2, // 'the man'
        correct: true,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 2, // 'the man'
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 2, // 'the man'
        correct: false,
        text: 'el robot',
        audioSrc: '/es_robot.mp3',
      },
    ])

    await db.insert(schema.challengesOptions).values([
      {
        challengeId: 3, // Which one of these is the "the robot"?
        imageSrc: '/man.svg',
        correct: false,
        text: 'el hombre',
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 3, // Which one of these is the "the robot"?
        imageSrc: '/woman.svg',
        correct: false,
        text: 'la mujer',
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 3, // Which one of these is the "the robot"?
        imageSrc: '/robot.svg',
        correct: true,
        text: 'el robot',
        audioSrc: '/es_robot.mp3',
      },
    ])

    console.log('🌱 Database Seeded!')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed the database')
  }
}

main()
