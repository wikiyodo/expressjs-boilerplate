const pathResolver = require(process.env.resolver);
const Bank= require(pathResolver.model('bank')).Bank;


var getBanks = () => {
    return {
        "ACCESS BANK": "044",
        "ACCESSMOBILE": "323",
        "ASO SAVINGS AND LOANS": "401",
        "CELLULANT": "317",
        "CENTRAL BANK OF NIGERIA": "001",
        "CITIBANK": "023",
        "CORONATION MERCHANT BANK": "559",
        "CORPORETTI": "310",
        "COVENANT MICROFINANCE BANK": "551",
        "DIAMOND BANK": "063",
        "EARTHOLEUM(QIK QIK)": "302",
        "ECOBANK NIGERIA": "050",
        "ECOMOBILE": "307",
        "EKONDO MICROFINANCE BANK": "562",
        "ENTERPRISE BANK": "084",
        "EQUITORIAL TRUST BANK": "040",
        "E - TRANZACT": "306",
        "FBN M- MONEY": "309",
        "FBN MORTGAGES": "413",
        "FETS(MY WALLET)": "314",
        "FIDELITY BANK": "070",
        "FIDELITY MOBILE": "318",
        "FINATRUST MICROFINANCE BANK": "608",
        "FIRST BANK OF NIGERIA": "011",
        "FIRST CITY MONUMENT BANK": "214",
        "FIRST INLAND BANK": "085",
        "FORTIS MICROFINANCE BANK": "501",
        "FORTIS MOBILE": "308",
        "FSDH": "601",
        "GT MOBILE MONEY": "315",
        "GUARANTY TRUST BANK": "058",
        "HEDONMARK": "324",
        "HERITAGE BANK": "030",
        "IMPERIAL HOMES MORTGAGE BANK": "415",
        "INTERCONTINENTAL BANK": "069",
        "JAIZ BANK": "301",
        "JUBILEE LIFE": "402",
        "KEGOW": "303",
        "KEYSTONE BANK": "082",
        "MAINSTREET BANK": "014",
        "MIMONEY(POWERED BY INTELLIFIN)": "330",
        "M - KUDI": "313",
        "MONETIZE": "312",
        "MONEYBOX": "325",
        "NEW PRUDENTIAL BANK": "561",
        "NPF MFB": "552",
        "OCEANIC BANK": "056",
        "OMOLUABI SAVINGS AND LOANS": "606",
        "ONE FINANCE": "565",
        "PAGA": "327",
        "PAGE MFBANK": "560",
        "PARALLEX": "502",
        "PARKWAY(READY CASH)": "311",
        "PAYATTITUDE ONLINE": "329",
        "PAYCOM": "304",
        "PROVIDUS BANK": "101",
        "SAFETRUST MORTGAGE BANK": "403",
        "SEED CAPITAL MICROFINANCE BANK": "609",
        "SKYE BANK": "076",
        "STANBIC IBTC BANK": "221",
        "STANBIC MOBILE": "304",
        "STANDARD CHARTERED BANK": "068",
        "STERLING BANK": "232",
        "STERLING MOBILE": "326",
        "SUNTRUST": "100",
        "TEASY MOBILE": "319",
        "TRUSTBOND": "523",
        "U - MO": "316",
        "UNION BANK OF NIGERIA": "032",
        "UNITED BANK FOR AFRICA": "033",
        "UNITY BANK": "215",
        "VFD MICROFINANCE BANK": "566",
        "VISUAL ICT": "328",
        "VTNETWORK": "320",
        "WEMA BANK": "035",
        "ZENITH BANK": "057",
        "ZENITH MOBILE": "322"
    };
};

var locationSeed = () => {
    // get all banks 
    banks = getBanks();
    var insertables = [];
    for (var name in banks) {
        var code = banks[name];
        insertables.push({
            name,
            code
        });
    }

    Bank.insertMany(insertables, (err, docs) => {
        if (err) {
            console.error(err);
        }
    });
};

module.exports = locationSeed;