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
    if (!user) {
      return null;
    }
    if (validatePassword) {
      const { _id, username } = user.toObject();
      const access_token = this.jwtService.sign({ _id, username });
      const refresh_token = this.jwtService.sign({ _id }, { expiresIn: '7d' });
      return { access_token, refresh_token };
    }
  }
  async getAccessToken(token: string): Promise<any> {
    try {
      const data = await this.decodeToken(token);
      const user: UserDocument = await this.userService.findOne(data._id);
      const { _id, username } = user.toObject();
      const access_token = this.jwtService.sign({ _id, username });
      return { access_token };
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return null;
    }
  }
  decodeToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
