import { CompanyController } from "./controllers/company-controller"

export const Routes = [{
    method: "get",
    route: "/companies",
    controller: CompanyController,
    action: "all"
}, {
    method: "get",
    route: "/companies/:cnpj",
    controller: CompanyController,
    action: "one"
}, {
    method: "post",
    route: "/companies",
    controller: CompanyController,
    action: "save"
}, {
    method: "delete",
    route: "/companies/:cnpj",
    controller: CompanyController,
    action: "remove"
}, {
    method: "post",
    route: "/companies/:cnpj/positions",
    controller: CompanyController,
    action: "postPosition"
}, {
    method: "delete",
    route: "/companies/:cnpj/positions",
    controller: CompanyController,
    action: "deletePosition"
}, {
    method: "post",
    route: "/companies/:cnpj/feedback",
    controller: CompanyController,
    action: "postFeedbackReport"
}]