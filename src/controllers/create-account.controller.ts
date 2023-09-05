import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body) {
    const { name, email, password } = body

    const emailAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (emailAlreadyExists) {
      throw new ConflictException('Email already in use.')
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }
}
