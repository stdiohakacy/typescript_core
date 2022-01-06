import Mailgen from "mailgen";
import { DOMAIN, PROJECT_NAME, PROTOTYPE } from "../../configs/Configuration";

export class MailGenerator {
    private readonly _mailGenerator: Mailgen;

    constructor() {
        this._mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: PROJECT_NAME,
                link: `${PROTOTYPE}://${DOMAIN}`
            }
        })
    }

    generatePlaintext(params: Mailgen.Content): string {
        return this._mailGenerator.generatePlaintext(params);
    }

    generateHtmlContent(params: Mailgen.Content): string {
        return this._mailGenerator.generate(params);
    }
}