import { traitementModel } from "./traitementModel"
import { userModel } from "./userModels"

export class demandeModel{
id:number
dateDebut:Date  
duree: number
justification: string
typeConge: string
dateFin: Date
traitement1:traitementModel
traitement2:traitementModel
decision:boolean
owner:userModel
date:Date
pdf:boolean

}