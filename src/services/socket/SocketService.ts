import { IChannelRepository } from "../../base/repository/IChannelRepository";

export class SocketService {
    static instance: SocketService;
    private _channelRepository: IChannelRepository;
    
    static getInstance(): SocketService {
        if(!SocketService.instance)
            SocketService.instance = new SocketService();
        return SocketService.instance;
    }

    public setChannelRepository(channelRepository: IChannelRepository): SocketService {
        this._channelRepository = channelRepository;
        return this;
    }

    public get channelRepository(): IChannelRepository {
        return this._channelRepository;
    }
}