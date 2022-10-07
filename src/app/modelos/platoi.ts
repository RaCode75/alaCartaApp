export interface Platoi {
    id?: number | undefined,
    title?: string,
    image?: string,
    readyInMinutes?: number,
    healthScore?: number,
    pricePerServing?: number,
    summary?: string,
    vegan?: boolean,
    precioAcum?: number,
    minutosAcum?: number,
    MinutosProm?: number,
    HealthSAcum?: number,
    HealthProm?:number
}

export interface Etiqueta extends Platoi{
    title:string

}