import { Roles } from './roles';


export interface Users {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    roles?: Roles;
}

