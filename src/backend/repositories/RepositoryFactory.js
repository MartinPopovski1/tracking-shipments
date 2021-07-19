
import UserRepository from "./user/user-repository";
import SpecificationRepository from "./specification/specification-repository";
import AdresnicaRepository from "./adresnica/adresnica-repository";


const repositories = {
    'user' : UserRepository,
    'specification' : SpecificationRepository,
    'adresnica' : AdresnicaRepository,

};

export const RepositoryFactory = {
    get: name => repositories[name]
};
