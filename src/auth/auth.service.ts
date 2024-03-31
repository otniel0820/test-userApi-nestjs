import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const {password, ...userData}= createUserDto

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10), //encriptar password
      });
      await this.userRepository.save(user);
      delete user.password
      return user;
      //Todo: retornar el jwt
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto){

    const {password, email} = loginUserDto

    const user = await this.userRepository.findOne({
      where:  {email},
      select: {email: true, password: true, id: true}
    })

    if(!user) throw new UnauthorizedException(`Credential are not valid ${email}`)

    if(!bcrypt.compareSync(password, user.password))  throw new BadRequestException('Invalid Password')

    return user
    //Todo: retornar jwt
  }

  private handleDBErrors(error: any): never{
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check server logs');
  }
}
