import { Injectable } from '@nestjs/common';
import { SigninRequest, User } from 'models';
import { Repository, RepositoryFactory } from 'mongo-nest';
import { compare } from 'bcryptjs';
import * as NodeCache from 'node-cache';
import { cryptPassword, getRandomToken } from 'utils';

const comparePassword = (plainPass, hashword) => {
    return compare(plainPass, hashword);
};

@Injectable()
export class UserService{
    userRepo: Repository<User>;
    // remove object after 10 minute
    private cache = new NodeCache({ stdTTL: 60 * 60 * 12 });

    constructor(private repositoryFactory: RepositoryFactory) {
        this.userRepo = this.repositoryFactory.getRepository<User>(User, 'users');
    }

    async addUser(userCred: SigninRequest) {
      const existUser = await this.userRepo.findOne({ email: userCred.email });

      const result = (await this.saveUser(userCred)) as any;
      if (!existUser) {
          const token = await getRandomToken();
          this.saveUserToken(userCred.email, token);
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
            return null;
        }
        delete user.password;
        // TODO use token instead of id.
        setTimeout(() => this.cache.set(user._id.toString(), user));
        return user;
    }

    async saveUser(user: SigninRequest): Promise<{ ok: number }> {
        user.password = await cryptPassword('123456');
        return (await this.userRepo.saveOrUpdateOne(user)).result;
    }

    async getUserAuthenticated(id): Promise<User> {
        if (!id) {
            return undefined;
        }
        const foundUser = this.cache.get<User>(id);
        if (!foundUser) {
            return undefined;
        }

        setTimeout(() => this.cache.set(foundUser._id.toString(), foundUser));
        return foundUser;
    }

    async getUsers(query: Partial<User>) {
        return this.userRepo.collection
            .find<User>(query)
            .project({ password: 0 })
            .toArray();
    }

    saveUserToken(email: string, token: string) {
        this.cache.set(email, token);
    }

    logout(user: User) {
        setTimeout(() => this.cache.del(user._id.toString()));
    }
}
