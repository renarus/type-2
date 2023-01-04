"use strict";
class Pharmacy {
    constructor() {
        this.pills = [
            {
                id: "1",
                pillName: "Pill1",
                count: 2,
                price: 10,
                pharmacyId: "1",
            },
            {
                id: "2",
                pillName: "Pill2",
                count: 4,
                price: 4,
                pharmacyId: "1",
            },
            {
                id: "3",
                pillName: "Pill2",
                count: 4,
                price: 4,
                pharmacyId: "2",
            },
        ];
        this.pharmacies = [
            {
                id: "1",
                pharmacyName: "Soldi",
                pills: ["1", "2"],
            },
            {
                id: "2",
                pharmacyName: "Fikaroo",
                pills: ["2"],
            },
        ];
        this.addPillStorage = ({ id, pharmacyId, ...rest }) => {
            this.addPharmancyStorage(id, pharmacyId);
            const index = this.pills.push({ id, pharmacyId, ...rest });
            return this.pills[index - 1];
        };
        this.addPharmancyStorage = (pillId, pharmacyId) => {
            this.pharmacies.find(({ id }) => id === pharmacyId)?.pills.push(pillId);
        };
        this.getPillWithId = (pillId) => this.pills.find(({ id }) => id === pillId);
        /**
         *
         * @param pharmacyId
         * @returns pharmacy name
         */
        this.getPharmacyWithId = (pharmacyId) => this.pharmacies.find(({ id }) => id === pharmacyId)?.pharmacyName;
        /**
         *
         * @param inputPharmacyName user entered pharmacy name
         * @returns pharmacy id
         */
        this.getPharmacyIdWithName = (inputPharmacyName) => this.pharmacies.find(({ pharmacyName }) => pharmacyName === inputPharmacyName)?.id;
        /**
         *
         * @param inputPharmacyName user entered pharmacy name
         * @returns pharmacy name checking with user entered name and return boolean value
         */
        this.checkPharmacy = (inputPharmacyName) => this.pharmacies.find(({ pharmacyName }) => pharmacyName === inputPharmacyName) !== undefined
            ? true
            : false;
        this.addPill = () => {
            const inputPharmacyName = prompt("Enter pharmacy name: ");
            const isHave = inputPharmacyName
                ? this.checkPharmacy(inputPharmacyName)
                : false;
            if (isHave) {
                const inputPillName = prompt("Enter pill name: ");
                const addCount = prompt("Enter add count: ");
                const addPrice = prompt("Enter add price: ");
                const addPharmacyId = this.getPharmacyIdWithName(inputPharmacyName);
                return inputPillName && addCount && addPrice && addPharmacyId
                    ? this.addPillStorage({
                        id: this.pills.length.toString(),
                        pillName: inputPillName,
                        count: Number(addCount),
                        price: Number(addPrice),
                        pharmacyId: addPharmacyId,
                    })
                    : null;
            }
            return (alert("This pharmacy doesn't exists"),
                alert("We could't add a pill as there is no phamacy you indicated"));
        };
        this.addPharmacy = () => {
            const inputPharmacyName = prompt("Enter pharmacy name: ");
            const id = (this.pharmacies.length + 1).toString();
            const index = inputPharmacyName &&
                this.pharmacies.push({
                    id,
                    pharmacyName: inputPharmacyName,
                    pills: [],
                }) - 1;
            return index
                ? this.pharmacies[index]
                : alert("Something happened! we can't create pharmacy");
        };
        this.findPill = () => {
            const inputPillName = prompt("Enter pill name: ");
            const pill = this.pills.filter(({ pillName }) => pillName === inputPillName);
            console.log(pill);
            return pill !== undefined ? pill : alert("This pill doesn't exists");
        };
        this.findPharmacy = () => {
            const inputPharmacyName = prompt("Enter pharmacy name: ");
            const pharmacy = this.pharmacies.find(({ pharmacyName }) => pharmacyName === inputPharmacyName);
            return pharmacy !== undefined
                ? pharmacy
                : alert("This pharmacy doesn't exists");
        };
    }
}
const addPharmacyBtn = document.getElementById("addPharmacy");
const addPillBtn = document.getElementById("addPill");
const findPillBtn = document.getElementById("findPill");
const findPharmacyBtn = document.getElementById("findPharmacy");
const pillTBody = document.getElementById("pillTBody");
const pharmacyTBody = document.getElementById("pharmacyTBody");
const p = new Pharmacy();
addPharmacyBtn.onclick = () => {
    const data = p.addPharmacy();
    if (data) {
        const pharmacyName = document.getElementById("pharmacyName");
        pharmacyName.textContent += data.pharmacyName;
    }
};
addPillBtn.onclick = () => {
    const data = p.addPill();
    if (data) {
        const { pillName, count, price, pharmacyId } = data;
        const pharmacyName = p.getPharmacyWithId(pharmacyId);
        addDataToTable([pillName, count.toString(), , price + " AZN", pharmacyName], pillTBody);
    }
};
findPharmacyBtn.onclick = () => {
    const data = p.findPharmacy();
    if (data) {
        const pharmacyName = document.getElementById("pharmacyName");
        pharmacyName.textContent += data.pharmacyName;
        data.pills.map((item) => {
            const { pillName, count, price, pharmacyId } = p.getPillWithId(item);
            const pharmacyName = p.getPharmacyWithId(pharmacyId);
            addDataToTable([pillName, count.toString(), , price + " AZN", pharmacyName], pharmacyTBody);
        });
    }
};
findPillBtn.onclick = () => {
    const data = p.findPill();
    if (data) {
        data.map((item) => {
            const pharmacyName = p.getPharmacyWithId(item.pharmacyId);
            addDataToTable([
                item.pillName,
                item.count.toString(),
                ,
                item.price + " AZN",
                pharmacyName,
            ], pillTBody);
        });
    }
};
const addDataToTable = (data, tbody) => {
    const tr = document.createElement("tr");
    data.forEach((item) => {
        const td = document.createElement("td");
        td.textContent = item;
        tr.appendChild(td);
    });
    tbody.append(tr);
};
