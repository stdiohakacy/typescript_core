import { Channel } from '../../domain/chat/channel/Channel';
import { IBaseRepository } from './IBaseRepository';

export interface IChannelRepository extends IBaseRepository<Channel, string> {
    isChannelExist(name: string): Promise<boolean>;
}