
export default {

    mapGet(user) {
        return {
            ime: user.Ime,
            adresa: user.Adresa,
            opstina: user.Opstina,
            postenskiBroj: user.PostenskiBroj,
            telefon: user.Telefon,
            koristiGrupniPratki: user.koristi_grupni_pratki,
            token: user.Token,
        }
    },


}