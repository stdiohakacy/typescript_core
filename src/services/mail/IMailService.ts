export interface IMailService {
    sendUserActivation(name: string, email: string, activeKey: string): Promise<void>;
}