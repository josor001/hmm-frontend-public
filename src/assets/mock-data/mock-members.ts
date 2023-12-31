import {Softwaresystem} from "../../app/shared/models/softwaresystem.model";
import {Member} from "../../app/shared/models/member.model";

export const MEMBERS: Member[] = [
    {
        firstname: 'Jonas',
        lastname: 'Sorgalla',
        email: 'jonas.sorgalla@fh-dortmund.de',
        profileLink: 'https://example.com/janedoe',
        expertise: 'Despair',
        sysId: 1,
        id: 1,
    },
    {
        firstname: 'Philip',
        lastname: 'Wizenty',
        email: 'philip.wizenty@fh-dortmund.de',
        profileLink: 'https://github.com/pwizenty',
        expertise: 'Operations, PaaS like AWS, Azure etc.',
        sysId: 1,
        id: 2,
    },
    {
        firstname: 'Florian',
        lastname: 'Rademacher',
        email: 'rademacher@se-rwth.de',
        profileLink: 'https://github.com/frademacher',
        expertise: 'Model-Driven Engineering and LEMMA',
        sysId: 1,
        id: 3,
    }, {
        firstname: 'Philipp',
        lastname: 'Heisig',
        email: 'philipp.heisig@fh-dortmund.de',
        expertise: 'Data-intensive Applications',
        sysId: 1,
        id: 4,
    }
];
