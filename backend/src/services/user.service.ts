import { HttpException, Injectable } from '@nestjs/common';
import { SigninRequest, User } from 'models';
import { Repository, RepositoryFactory } from 'mongo-nest';
import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { cryptPassword } from 'utils';
import { ConfigService } from '@nestjs/config';

const comparePassword = (plainPass, hashword) => {
    return compare(plainPass, hashword);
};

@Injectable()
export class UserService{
    userRepo: Repository<User>;

    constructor(private repositoryFactory: RepositoryFactory, private configService: ConfigService) {
        this.userRepo = this.repositoryFactory.getRepository<User>(User, 'users');
    }

    async addUser(userCred: SigninRequest) {
      const existUser = await this.userRepo.findOne({ email: userCred.email });

      let result = null;
      if (!existUser) {
        result = (await this.saveUser(userCred)) as any;
      }

      return result;
    }

    async validateUser(email, password) {
        const user = new User(
            await this.userRepo.collection.findOne({
                email,
            }),
        );
        if (!user.password || !(await comparePassword(password, user.password))) {
          throw new HttpException({}, 401);
        }

        return this.generateToken(user);
    }


    async getUserAuthenticated(email): Promise<User> {
        if (!email) {
            return undefined;
        }
        const foundUser = new User(
          await this.userRepo.collection.findOne({
              email,
          }),
        );

        if (!foundUser) {
            return undefined;
        }

        return foundUser;
    }

    private async saveUser(user: SigninRequest): Promise<{ ok: number }> {
      user.password = await cryptPassword(user.password);
      const { rePassword, ...userForDb } = user;
      const userDb = await this.userRepo.saveOrUpdateOne(userForDb);
      return (userDb).result;
    }

    private generateToken(user) {
      const today = new Date();
      const exp = new Date(today);
      exp.setDate(today.getDate() + 60);

      return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      }, this.configService.get<string>('JWT_SECRET'));
    }
}
