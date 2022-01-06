import { IMailProvider } from "./IMailProvider";

export class MailConsoleFactory implements IMailProvider {
    async send(senderName: string, senderMail: string, emails: string | string[], subject: string, content: string): Promise<any> {
        const data = {
            senderName,
            senderMail,
            emails,
            subject,
            content
        }
        return data;
    }
    async sendHtml(senderName: string, senderEmail: string, emails: string | string[], subject: string, htmlContent: string): Promise<any> {
        const data = {
            senderName,
            senderEmail,
            emails,
            subject,
            htmlContent
        }
        return data;
    }
    
}