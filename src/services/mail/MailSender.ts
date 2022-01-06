import { MailConsoleFactory } from './factory/MailConsoleFactory';
import { MAIL_PROVIDER } from "../../configs/Configuration";
import { MailProvider } from "../../configs/ServiceProvider";
import { IMailProvider } from "./IMailProvider";
import { GoogleSmtpFactory } from './factory/GoogleSmtpFactory';

export class MailSender implements IMailProvider {
    private readonly _provider: IMailProvider;

    constructor() {
        switch(MAIL_PROVIDER) {
        case MailProvider.CONSOLE:
            this._provider = new MailConsoleFactory();
            break;
        case MailProvider.GOOGLE_SMTP:
            this._provider = new GoogleSmtpFactory();
            break;
        default:
            this._provider = new MailConsoleFactory();
            break;
        }
    }

    send(senderName: string, senderEmail: string, emails: string | string[], subject: string, content: string): Promise<any> {
        return this._provider.send(senderName, senderEmail, emails, subject, content);
    }

    sendHtml(senderName: string, senderEmail: string, emails: string | string[], subject: string, htmlContent: string): Promise<any> {
        return this._provider.sendHtml(senderName, senderEmail, emails, subject, htmlContent);
    }
}