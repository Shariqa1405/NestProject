import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Body,
  Delete,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptor/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinuser.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.age,
      body.username,
    );
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  async signin(@Body() body: SigninDto, @Session() session: any) {
    const user = await this.authService.signin(body.signin, body.password);
    session.userId = user.id;
    return user;
  }

  // @Get('/whoami')
  // @UseGuards(AuthGuard)
  // WhoAmi(@CurrentUser() user: User) {
  //   return user;
  // }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId;
  }

  // TO DO
  // @Post('/:id')
  // createTemplateForUser(@Param('id') id: string) {
  //   return this.templateService.CreateTemplateForUser(id);
  // }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  // @Patch('/template/:id')
  // updateUserTemplate(
  //   @Param('id') id: number,
  //   @Body() templateDto: TemplateDto,
  // ) {
  //   return this.templateService.updateTemplate(id, templateDto.template);
  // }
}
