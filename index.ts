type PillType = {
  id: string;
  pillName: string;
  count: number;
  price: number;
  pharmacyId: string;
};

interface IPharmacy {
  id: string;
  pharmacyName: string;
  pills: string[];
}

type addedPillType = {
  id?: string;
  pillName: string;
  count: number;
  price: number;
  pharmacyName: string;
};

class Pharmacy {
  pills: PillType[] = [
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

  pharmacies: IPharmacy[] = [
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

  addPillStorage = ({ id, pharmacyId, ...rest }: PillType) => {
    this.addPharmancyStorage(id, pharmacyId);
    const index = this.pills.push({ id, pharmacyId, ...rest });

    return this.pills[index - 1];
  };

  addPharmancyStorage = (pillId: string, pharmacyId: string) => {
    this.pharmacies.find(({ id }) => id === pharmacyId)?.pills.push(pillId);
  };

  getPillWithId = (pillId: string) =>
    this.pills.find(({ id }) => id === pillId);

  /**
   *
   * @param pharmacyId
   * @returns pharmacy name
   */
  getPharmacyWithId = (pharmacyId: string): string | undefined =>
    this.pharmacies.find(({ id }) => id === pharmacyId)?.pharmacyName;

  /**
   *
   * @param inputPharmacyName user entered pharmacy name
   * @returns pharmacy id
   */
  getPharmacyIdWithName = (
    inputPharmacyName: string | null
  ): string | undefined =>
    this.pharmacies.find(
      ({ pharmacyName }) => pharmacyName === inputPharmacyName
    )?.id;

  /**
   *
   * @param inputPharmacyName user entered pharmacy name
   * @returns pharmacy name checking with user entered name and return boolean value
   */
  checkPharmacy = (inputPharmacyName: string): boolean =>
    this.pharmacies.find(
      ({ pharmacyName }) => pharmacyName === inputPharmacyName
    ) !== undefined
      ? true
      : false;

  addPill = () => {
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
    return (
      alert("This pharmacy doesn't exists"),
      alert("We could't add a pill as there is no phamacy you indicated")
    );
  };

  addPharmacy = () => {
    const inputPharmacyName = prompt("Enter pharmacy name: ");
    const id = (this.pharmacies.length + 1).toString();
    const index =
      inputPharmacyName &&
      this.pharmacies.push({
        id,
        pharmacyName: inputPharmacyName,
        pills: [],
      }) - 1;
    return index
      ? this.pharmacies[index]
      : alert("Something happened! we can't create pharmacy");
  };

  findPill = () => {
    const inputPillName = prompt("Enter pill name: ");

    const pill = this.pills.filter(
      ({ pillName }) => pillName === inputPillName
    );
    console.log(pill);
    return pill !== undefined ? pill : alert("This pill doesn't exists");
  };

  findPharmacy = () => {
    const inputPharmacyName = prompt("Enter pharmacy name: ");

    const pharmacy = this.pharmacies.find(
      ({ pharmacyName }) => pharmacyName === inputPharmacyName
    );
    return pharmacy !== undefined
      ? pharmacy
      : alert("This pharmacy doesn't exists");
  };
}

const addPharmacyBtn = document.getElementById("addPharmacy") as HTMLElement;
const addPillBtn = document.getElementById("addPill") as HTMLElement;
const findPillBtn = document.getElementById("findPill") as HTMLElement;
const findPharmacyBtn = document.getElementById("findPharmacy") as HTMLElement;
const pillTBody = document.getElementById("pillTBody") as HTMLElement;
const pharmacyTBody = document.getElementById("pharmacyTBody") as HTMLElement;
const p = new Pharmacy();

addPharmacyBtn.onclick = () => {
  const data = p.addPharmacy();
  if (data) {
    const pharmacyName = document.getElementById("pharmacyName") as HTMLElement;
    pharmacyName.textContent += data.pharmacyName;
  }
};

addPillBtn.onclick = () => {
  const data = p.addPill();
  if (data) {
    const { pillName, count, price, pharmacyId } = data;
    const pharmacyName = p.getPharmacyWithId(pharmacyId) as string;
    addDataToTable(
      [pillName, count.toString(), , price + " AZN", pharmacyName],
      pillTBody
    );
  }
};

findPharmacyBtn.onclick = () => {
  const data = p.findPharmacy();
  if (data) {
    const pharmacyName = document.getElementById("pharmacyName") as HTMLElement;
    pharmacyName.textContent += data.pharmacyName;
    data.pills.map((item) => {
      const { pillName, count, price, pharmacyId } = p.getPillWithId(
        item
      ) as PillType;
      const pharmacyName = p.getPharmacyWithId(pharmacyId) as string;

      addDataToTable(
        [pillName, count.toString(), , price + " AZN", pharmacyName],
        pharmacyTBody
      );
    });
  }
};

findPillBtn.onclick = () => {
  const data = p.findPill();
  if (data) {
    data.map((item) => {
      const pharmacyName = p.getPharmacyWithId(item.pharmacyId) as string;
      addDataToTable(
        [
          item.pillName,
          item.count.toString(),
          ,
          item.price + " AZN",
          pharmacyName,
        ],
        pillTBody
      );
    });
  }
};

const addDataToTable = (data: any[], tbody: HTMLElement) => {
  const tr = document.createElement("tr");
  data.forEach((item) => {
    const td = document.createElement("td");
    td.textContent = item;
    tr.appendChild(td);
  });
  tbody.append(tr);
};
