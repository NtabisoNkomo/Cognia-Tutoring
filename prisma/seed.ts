import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminEmail = 'admin@cognia.com'
  const hashedPassword = await bcrypt.hash('Admin123!', 10)

  console.log('Seeding admin user...')
  
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'System Admin',
      password: hashedPassword,
      role: 'ADMIN',
      grade: 'N/A',
      curriculum: 'N/A'
    },
  })

  console.log('Admin user created/verified:', admin.email)

  console.log('Seeding sample courses...')
  const courses = [
    {
      title: 'Mathematics (IEB)',
      description: 'Advanced functions, calculus, and financial mathematics for Grade 12.',
      subject: 'Mathematics',
      level: 'Grade 12',
      curriculum: 'IEB'
    },
    {
      title: 'Physical Sciences (CAPS)',
      description: 'Physics and Chemistry fundamentals for high school achievers.',
      subject: 'Physical Sciences',
      level: 'Grade 12',
      curriculum: 'CAPS'
    },
    {
      title: 'English Home Language',
      description: 'Critical analysis of literature and advanced linguistics.',
      subject: 'English',
      level: 'Grade 11-12',
      curriculum: 'Cambridge/IEB'
    },
    {
      title: 'Advanced Programme Mathematics',
      description: 'University-level mathematics bridging the gap for high school students.',
      subject: 'Mathematics',
      level: 'Grade 12',
      curriculum: 'IEB/AP'
    },
    {
      title: 'Life Sciences (CAPS)',
      description: 'Comprehensive study of biological systems and environmental science.',
      subject: 'Life Sciences',
      level: 'Grade 11',
      curriculum: 'CAPS'
    },
    {
      title: 'Accounting (IEB)',
      description: 'Financial accounting principles and management reporting.',
      subject: 'Accounting',
      level: 'Grade 12',
      curriculum: 'IEB'
    },
    {
      title: 'Economics (CAPS)',
      description: 'Macro and micro-economics foundations for aspiring professionals.',
      subject: 'Economics',
      level: 'Grade 12',
      curriculum: 'CAPS'
    },
    {
      title: 'Computer Applications Technology',
      description: 'Mastering productivity tools and digital literacy.',
      subject: 'CAT',
      level: 'Grade 10-12',
      curriculum: 'IEB/CAPS'
    },
    {
      title: 'History (CAPS)',
      description: 'In-depth exploration of global and South African history.',
      subject: 'History',
      level: 'Grade 12',
      curriculum: 'CAPS'
    }
  ]

  for (const course of courses) {
    await prisma.course.upsert({
      where: { id: `sample-${course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
      update: {},
      create: {
        id: `sample-${course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        ...course
      }
    })
  }
  console.log('Sample courses seeded.')

  console.log('Seeding sample resources...')
  const mathCourse = await prisma.course.findFirst({ where: { title: 'Mathematics (IEB)' } })
  const scienceCourse = await prisma.course.findFirst({ where: { title: 'Physical Sciences (CAPS)' } })

  if (mathCourse) {
    await prisma.resource.upsert({
      where: { id: 'sample-math-1' },
      update: {},
      create: {
        id: 'sample-math-1',
        title: 'Calculus Cheat Sheet',
        type: 'PDF',
        url: 'https://example.com/math-calculus.pdf',
        courseId: mathCourse.id
      }
    })
    await prisma.resource.upsert({
      where: { id: 'sample-math-2' },
      update: {},
      create: {
        id: 'sample-math-2',
        title: 'Financial Maths Worksheet',
        type: 'WORKSHEET',
        url: 'https://example.com/math-finance.pdf',
        courseId: mathCourse.id
      }
    })
  }

  if (scienceCourse) {
    await prisma.resource.upsert({
      where: { id: 'sample-science-1' },
      update: {},
      create: {
        id: 'sample-science-1',
        title: 'Organic Chemistry Guide',
        type: 'PDF',
        url: 'https://example.com/science-chem.pdf',
        courseId: scienceCourse.id
      }
    })
  }
  console.log('Sample resources seeded.')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end() // Close the pool as well
  })
