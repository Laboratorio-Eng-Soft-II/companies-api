import { AppDataSource } from '../utils/data-source'
import { NextFunction, Request, Response } from "express"
import { Company } from "../entities/Company"
import axios from 'axios'
import config from 'config'

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

    async postPosition(request: Request, response: Response, next: NextFunction){
        const positionsUrl = config.get<number>('positionsUrl');
        const {
            cnpj,
            type,
            description,
            main_work,
            required_skills,
            salary,
            benefits
        } = request.body
        let company = await this.companyRepository.findOneBy({ cnpj })

        if (!company) {
            return "This company does not exist!"
        }

        const axiosResponse = await axios.post(positionsUrl + '/positions', {
            cnpj,
            type,
            description,
            main_work,
            required_skills,
            salary,
            benefits
        })

        return {
            status: axiosResponse.status,
            id: axiosResponse.data.id,
            cnpj,
            description
        }
    }

    async deletePosition(request: Request, response: Response, next: NextFunction){
        const positionsUrl = config.get<number>('positionsUrl');
        const { cnpj } = request.params
        const { id } = request.body
        let company = await this.companyRepository.findOneBy({ cnpj })

        if (!company) {
            return "This company does not exist!"
        }

        const axiosResponse = await axios.delete(positionsUrl+ '/positions/' + id)

        return {
            status: axiosResponse.status,
            id,
            cnpj
        }
    }

}