import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { MailService } from './../mail/mail.service';
import {hashpassword, isMatchPassword} from 'src/utils/hashpassword';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private  mailerService: MailService,
    private jwtService: JwtService

  ) {

  }


  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && await isMatchPassword(pass, user.password) ) {
      return user;
    }
    return null;
  }


  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

 async create(createAuthDto: CreateAuthDto) {
    // this.mailerService
    // .sendMail({
    //   to: 'danhtungit2@gmail.com', // list of receivers
    //   from: 'noreply@nestjs.com', // sender address
    //   subject: 'Testing Nest MailerModule ✔', // Subject line
    //   text: 'welcome', // plaintext body
    //   html: '<b>welcome</b>', // HTML body content
    // })
    // .then(() => {})
    // .catch(() => {});
    const hash = await hashpassword(createAuthDto.password);
    createAuthDto.password = hash;
    this.mailerService.sendUserConfirmation();
    return this.userService.create(createAuthDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
