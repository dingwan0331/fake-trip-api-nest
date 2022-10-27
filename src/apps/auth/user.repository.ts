import {
  EntityManager,
  EntityRepository,
  Repository,
  TransactionManager,
} from 'typeorm';
import { CreateSocialPlatformDto } from './dtos/create-user-social-platform.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
import { UserSocialPlatform } from './entities/user-social-platform.entity';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUser(findUserDto: FindUserDto): Promise<User> {
    return await this.createQueryBuilder('user')
      .select()
      .leftJoinAndSelect('user.userSocialPlatform', 'userSocialPlatform')
      .where(
        'userSocialPlatform.pk =:pk and userSocialPlatform.type = :type',
        findUserDto,
      )
      .getOne();
  }

  async createUser(
    @TransactionManager() transactionManager: EntityManager,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const newUser = this.create(createUserDto);

    return await transactionManager.save(newUser);
  }

  async createSocialPlatform(
    @TransactionManager() transactionManager: EntityManager,
    socialPlatformDto: CreateSocialPlatformDto,
  ): Promise<UserSocialPlatform> {
    const userSocialPlatformRepository = UserSocialPlatform.getRepository();

    const newUserSocialPlatform =
      userSocialPlatformRepository.create(socialPlatformDto);

    return await transactionManager.save(newUserSocialPlatform);
  }
}
