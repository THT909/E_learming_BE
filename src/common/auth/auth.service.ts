import { Injectable } from '@nestjs/common';
import { AuthPayLoadDto } from './dto/auth.dto';
import { UserDocument } from 'src/modules/user/user.schema';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayLoadDto) {
    const user: UserDocument = await this.userService.findByEmail(email);

    const validatePassword = await bcrypt.compare(password, user.password);
    // console.log(validatePassword);
    // console.log(password);
    // console.log(user.password);
    if (!user) {
      return null;
    }
    if (validatePassword) {
      const { _id, username, role } = user.toObject();
      const data = {
        header: this.jwtService.sign({ _id, username }),
        body: {
          username,
          role,
        },
      };

      return data;
    }
  }
}
