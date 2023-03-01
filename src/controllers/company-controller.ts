import { AppDataSource } from '../utils/data-source'
import { NextFunction, Request, Response } from "express"
import { Company } from "../entities/Company"

export class CompanyController {

    private companyRepository = AppDataSource.getRepository(Company)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.companyRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const cnpj = request.params.cnpj
        const company = await this.companyRepository.findOne({
            where: { cnpj }
        })

        if (!company) {
            return "Company not found!"
        }
        return company
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { cnpj,
                corporateName,
                address,
                field,
                phone,
                hrContactName,
                hrContactEmail,
                hrContactPhone } = request.body;
        
        let companyToAdd = await this.companyRepository.findOneBy({ cnpj })
        if (companyToAdd) {
            return "Company already registered!"
        }

        const company = Object.assign(new Company(), {
            cnpj,
            corporateName,
            address,
            field,
            phone,
            hrContactName,
            hrContactEmail,
            hrContactPhone
        })

        return this.companyRepository.save(company)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const cnpj = request.params.cnpj
        let companyToRemove = await this.companyRepository.findOneBy({ cnpj })

        if (!companyToRemove) {
            return "This company does not exist!"
        }

        await this.companyRepository.remove(companyToRemove)

        return "Company has been removed!"
    }

}