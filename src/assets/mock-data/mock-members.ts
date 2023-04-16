import {Softwaresystem} from "../../app/shared/models/softwaresystem.model";
import {Member} from "../../app/shared/models/member.model";

export const MEMBERS: Member[] = [
    {
        firstname: 'Jonas',
        lastname: 'Sorgalla',
        email: 'jonas.sorgalla@fh-dortmund.de',
        profileLink: 'https://example.com/janedoe',
        expertise: ['Angular', 'JavaScript', 'CSS'],
        id: 1,
    },
    {
        firstname: 'Philip',
        lastname: 'Wizenty',
        email: 'philip.wizenty@fh-dortmund.de',
        profileLink: 'https://github.com/pwizenty',
        expertise: ['Vue.js', 'TypeScript', 'GraphQL'],
        id: 2,
    },
    {
        firstname: 'Florian',
        lastname: 'Rademacher',
        email: 'rademacher@se-rwth.de',
        profileLink: 'https://github.com/frademacher',
        expertise: ['React Native', 'Firebase', 'MongoDB'],
        id: 3,
    }, {
        firstname: 'Philipp',
        lastname: 'Heisig',
        email: 'philipp.heisig@fh-dortmund.de',
        expertise: ['Express', 'PostgreSQL', 'Docker'],
        id: 4,
    }
];
