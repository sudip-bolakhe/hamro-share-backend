import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException(`Provided email ${email} doesn't exists`);
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new BadRequestException(
        "Invalid credentails. Provided email and password doesn't match",
      );
    }
    const payload = { name: user.name, email: user.email, id: user._id };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
