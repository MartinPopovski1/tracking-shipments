const enumCollection = [{
  key: 1,
  namedKey: 'senderPaysCash',
  description: 'Sender Pays Cash',
},{
  key: 2,
  namedKey: 'senderPaysOnInvoice',
  description: 'Sender Pays On Invoice',
},{
  key: 3,
  namedKey: 'recipientPaysCash',
  description: 'Recipient Pays Cash',
},{
  key: 4,
  namedKey: 'recipientPaysOnInvoice',
  description: 'Recipient Pays On Invoice',
}];

function getPaymentByNamedKey(namedKey) {
   return enumCollection.find((enumObj) => enumObj.namedKey === namedKey)
}

function getPaymentByKey(key) {
   return enumCollection.find((enumObj) => enumObj.key === key)
}

function getAllPaymentEnums() {
   return enumCollection;
}


export default{
  enumCollection
}

export {
  getPaymentByNamedKey,
  getPaymentByKey,
  getAllPaymentEnums
}
