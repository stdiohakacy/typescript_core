import { Service } from "typedi";
import { MAIL_SENDER_EMAIL, MAIL_SENDER_NAME } from './../../configs/Configuration';
import { IMailService } from "./IMailService";
import { MailGenerator } from "./MailGenerator";
import { MailSender } from "./MailSender";
import { UserActivationTemplate } from "./templates/UserActivationTemplate";

@Service('mail.service')
export class MailService implements IMailService {
    private readonly _sender: MailSender
    private readonly _generator: MailGenerator;

    constructor() {
        this._sender = new MailSender();
        this._generator = new MailGenerator();
    }

    async sendUserActivation(name: string, email: string, activeKey: string): Promise<void> {
        const mailGenContent = UserActivationTemplate.getTemplate(name, email, activeKey);
        const content = this._generator.generateHtmlContent(mailGenContent);
        const result = await this._sender.sendHtml(MAIL_SENDER_NAME, MAIL_SENDER_EMAIL, email, 'Account Activation', content);

        return result;
    }
}
