const enumCollection = [{
  key: 1,
  namedKey: 'monday',
  description: 'Monday',
  localIdShort: "daysOfWeek.short.monday",
  localIdFull: "daysOfWeek.monday"
},{
  key: 2,
  namedKey: 'tuesday',
  description: 'Tuesday',
  localIdShort: "daysOfWeek.short.tuesday",
  localIdFull: "daysOfWeek.tuesday"
},{
  key: 3,
  namedKey: 'wednesday',
  description: 'Wednesday',
  localIdShort: "daysOfWeek.short.wednesday",
  localIdFull: "daysOfWeek.wednesday"
},{
  key: 4,
  namedKey: 'thursday',
  description: 'Thursday',
  localIdShort: "daysOfWeek.short.thursday",
  localIdFull: "daysOfWeek.thursday"
},{
  key: 5,
  namedKey: 'friday',
  description: 'Friday',
  localIdShort: "daysOfWeek.short.friday",
  localIdFull: "daysOfWeek.friday"
},{
  key: 6,
  namedKey: 'saturday',
  description: 'Saturday',
  localIdShort: "daysOfWeek.short.saturday",
  localIdFull: "daysOfWeek.saturday"
},{
  key: 7,
  namedKey: 'sunday',
  description: 'Sunday',
  localIdShort: "daysOfWeek.short.sunday",
  localIdFull: "daysOfWeek.sunday"
}];

function getDayByNamedKey(namedKey) {
   return enumCollection.find((enumObj) => enumObj.namedKey === namedKey)
}

function getAllDaysOfWeek() {
   return enumCollection;
}


export default{
  enumCollection
}

export {
  getDayByNamedKey,
  getAllDaysOfWeek
}
