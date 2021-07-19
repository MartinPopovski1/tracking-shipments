var enumCollection = [{
  default: true,
  key: -1,
  namedKey: 'notProcessed',
  description: 'Не процесирана',
  color: "#757575",
},{
  key: 0,
  namedKey: 'kreirana',
  description: 'Креирана',
  color: "#2196F3",
},{
  key: 1,
  namedKey: 'spremnaZaDostava',
  description: 'Спремна за достава',
  color: "#FFC107",
},{
  key: 2,
  namedKey: 'predadenaNaKurirZaDostava',
  description: 'Предадена на курир за достава',
  color: "#FF9800",
},{
  key: 3,
  namedKey: 'vratenaVoMagacin',
  description: 'Вратена во магацин',
  color: "#673AB7",
},{
  key: 4,
  namedKey: 'proverka',
  description: 'Проверка',
  color: "#673AB7",
},{
  key: 5,
  namedKey: 'otkazana',
  description: 'Откажана',
  color: "#E91E63",
},{
  key: 6,
  namedKey: 'vratena',
  description: 'Вратена',
  color: "#E91E63",
},{
  key: 7,
  namedKey: 'dostavena',
  description: 'Доставена',
  color: "#4CAF50",
},{
  key: 8,
  namedKey: 'dostavenaBezPovratenDokument',
  description: 'Доставена без повратен документ',
  color: "#4CAF50",
},{
  key: 9,
  namedKey: 'dostavenaBezPovratnaAdresnica',
  description: 'Доставена без повратна адресница',
  color: "#4CAF50",
},{
  key: 10,
  namedKey: 'nedostavena',
  description: 'Не доставена',
  color: "#F44336",
},{
  key: 12,
  namedKey: 'sporna',
  description: 'Спорна',
  color: "#F44336",
}];

function getAdresnicaStatusTypeByKey(key) {
   return enumCollection.find((enumObj) => enumObj.key === key) || {};
}


export default{
  enumCollection
}

export {
  getAdresnicaStatusTypeByKey,
}
