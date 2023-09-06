import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Fetch recent questions (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'Title 01',
          content: 'Content 01',
          slug: 'content-01',
          authorId: user.id,
        },
        {
          title: 'Title 02',
          content: 'Content 02',
          slug: 'content-02',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Title 01' }),
        expect.objectContaining({ title: 'Title 02' }),
      ],
    })
  })
})
