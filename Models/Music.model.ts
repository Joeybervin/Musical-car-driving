/* Création du model des données qui seront stocker sur notre base de données */

export class Music {
     photo!: string;
    constructor(public title: string, public artist: string) {}
}