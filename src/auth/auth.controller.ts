import { Controller, Post, Body, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { Auth, GetUser } from './decorators';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @Auth()
  testingPrivateRoute(
    @GetUser() user: User,
    ) {

    return {
      ok: true,
      user,
      
    };

  }
  @Get('private2')
  @Auth(ValidRoles.admin)
  privateRoute2(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      user
    }
  }
  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  privateRoute3(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      user
    }
  }
}
