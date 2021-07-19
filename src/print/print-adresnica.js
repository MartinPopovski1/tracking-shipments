import JsBarcode from "jsbarcode";


function buildPrintAdresnica(adresnica, user, printAll, head, oznaka) {

  var canvas = document.createElement("canvas");
  JsBarcode(canvas, adresnica.seriskiBroj, {format: "CODE39"});
  let barcodeBase64 = canvas.toDataURL("image/png");


  //console.log('adresnica: ', adresnica);
  let povraten = adresnica.povratenDokument == 1 ? 'ДА' : 'НЕ';
  let povratenOtkup = adresnica.povratenOtkup;
  let oznacenaVrednost = adresnica.oznacenaVrednost;
  let provizija = adresnica.otkupnina;
  let zabeleska = adresnica.zabeleska ? adresnica.zabeleska : '\xa0';
  let postarina = adresnica.postarina;
/*  let t = parseFloat(adresnica.tezina);
  if (t >= 2 && t <= 5) postarina = 140;
  if (t > 5 && t <= 10) postarina = 160;
  if (t > 10 && t <= 20) postarina = 200;
  if (t > 20 && t <= 30) postarina = 265;
  if (t > 30 && t <= 40) postarina = 270;
  if (t > 40 && t <= 50) postarina = 320;
  if (t > 50) postarina = 500;*/

  // console.log('bc:');
  // console.log(bc);
  // console.log('adresnica', adresnica);
  // console.log('user', user);
  // console.log('printAll: ', printAll);
  // console.log('head: ', head);
  var styleArr = [];
  var style = '';
  styleArr.push('@page {size: portrait;}');
  styleArr.push('* {font-family: Arial, sans-serif;} p, td, .signDiv{font-size:0.9em;} div {font-size:0.93em;} .sm{font-size: 0.8em}');
  styleArr.push('.cont {border: 1px solid black;}');
  styleArr.push('.padded {padding:1%; display: flex; flex-direction: row; align-items:center} ');
  styleArr.push('.oznaka {padding:1%; margin-left: 3px; font-weight: bold; font-size: 1.1rem} ');
  styleArr.push('.padded-sides {padding:0 1%;}');
  styleArr.push('.margined {margin:1%;}');
  styleArr.push('.margined-top {margin-top:1%;}');
  styleArr.push('.margined-bottom {margin-bottom:1%;}');
  styleArr.push('.header {display:flex; justify-content:space-between; align-items:center;}');
  styleArr.push('.header-logo {max-width: 100px; border-right: 1px solid black;}');
  styleArr.push('.border-btn {border-bottom:1px solid black;}');
  styleArr.push('.bordered {border:1px solid black;}');
  styleArr.push('.inline-small {display:inline; width:30%;}');
  styleArr.push('.caption {background-color:lightgrey; width:60%;}');
  styleArr.push('.caption-full {background-color:lightgrey; width:100%;}');
  styleArr.push('.isprakac {width: 100%; display:flex;}');
  styleArr.push('.isprakac-levo {width: 60%;}');
  styleArr.push('.isprakac-desno {width: 40%;}');
  styleArr.push('.hs {display:flex; flex-direction:row;}');
  styleArr.push('.fhs {display:flex; flex-direction: column; width:50%;}');
  styleArr.push('.rhs {display:flex; width:50%;}');
  styleArr.push('.rhsls {display:flex; flex-direction: column; width:60%;}');
  styleArr.push('.rhsrs {display:flex; flex-direction: column; width:40%;}');
  styleArr.push('.lbc {position:relative; max-width:84%;}');
  styleArr.push('.text-right {text-align:right;}');
  styleArr.push('.text-right {text-align:right;}');

  if(adresnica.postarina_plakja && adresnica.postarina_plakja.namedKey === 'senderPaysCash')  styleArr.push('.postarina-plakja-sender-pays-cash {color: white; background-color: black}');
  if(adresnica.postarina_plakja && adresnica.postarina_plakja.namedKey === 'senderPaysOnInvoice')  styleArr.push('.postarina-plakja-sender-pays-on-invoice {color: white; background-color: black}');
  if(adresnica.postarina_plakja && adresnica.postarina_plakja.namedKey === 'recipientPaysCash')  styleArr.push('.postarina-plakja-recipient-pays-cash {color: white; background-color: black}');
  if(adresnica.postarina_plakja && adresnica.postarina_plakja.namedKey === 'recipientPaysOnInvoice')  styleArr.push('.postarina-plakja-recipient-pays-on-invoice {color: white; background-color: black}');

  if(adresnica.oznacena_vrednost_plakja && adresnica.oznacena_vrednost_plakja.namedKey === 'senderPaysCash')  styleArr.push('.oznacena_vrednost_plakja-sender-pays-cash {color: white; background-color: black}');
  if(adresnica.oznacena_vrednost_plakja && adresnica.oznacena_vrednost_plakja.namedKey === 'senderPaysOnInvoice')  styleArr.push('.oznacena_vrednost_plakja-sender-pays-on-invoice {color: white; background-color: black}');
  if(adresnica.oznacena_vrednost_plakja && adresnica.oznacena_vrednost_plakja.namedKey === 'recipientPaysCash')  styleArr.push('.oznacena_vrednost_plakja-recipient-pays-cash {color: white; background-color: black}');
  if(adresnica.oznacena_vrednost_plakja && adresnica.oznacena_vrednost_plakja.namedKey === 'recipientPaysOnInvoice')  styleArr.push('.oznacena_vrednost_plakja-recipient-pays-on-invoice {color: white; background-color: black}');

  if(adresnica.provizija_plakja && adresnica.provizija_plakja.namedKey === 'senderPaysCash')  styleArr.push('.provizija_plakja-sender-pays-cash {color: white; background-color: black}');
  if(adresnica.provizija_plakja && adresnica.provizija_plakja.namedKey === 'senderPaysOnInvoice')  styleArr.push('.provizija_plakja-sender-pays-on-invoice {color: white; background-color: black}');
  if(adresnica.provizija_plakja && adresnica.provizija_plakja.namedKey === 'recipientPaysCash')  styleArr.push('.provizija_plakja-recipient-pays-cash {color: white; background-color: black}');
  if(adresnica.provizija_plakja && adresnica.provizija_plakja.namedKey === 'recipientPaysOnInvoice')  styleArr.push('.provizija_plakja-recipient-pays-on-invoice {color: white; background-color: black}');

  if(adresnica.povraten_dokument_plakja && adresnica.povraten_dokument_plakja.namedKey === 'senderPaysCash')  styleArr.push('.povraten_dokument_plakja-sender-pays-cash {color: white; background-color: black}');
  if(adresnica.povraten_dokument_plakja && adresnica.povraten_dokument_plakja.namedKey === 'senderPaysOnInvoice')  styleArr.push('.povraten_dokument_plakja-sender-pays-on-invoice {color: white; background-color: black}');
  if(adresnica.povraten_dokument_plakja && adresnica.povraten_dokument_plakja.namedKey === 'recipientPaysCash')  styleArr.push('.povraten_dokument_plakja-recipient-pays-cash {color: white; background-color: black}');
  if(adresnica.povraten_dokument_plakja && adresnica.povraten_dokument_plakja.namedKey === 'recipientPaysOnInvoice')  styleArr.push('.povraten_dokument_plakja-recipient-pays-on-invoice {color: white; background-color: black}');


  for (let i = 0; i < styleArr.length; i++) {
    style += styleArr[i];
  }
  let docStart = '<html><head><style>';
  docStart += style;
  docStart += '</style></head><body>';
  let container = '<div class="cont">';
  let docEnd = "</div></body></html>";
  let onLoadScript = "<script type='application/javascript'>window.onload = function(){window.print(); window.onfocus = function() {setTimeout(function(){window.close()},3);} } </script>";
  docEnd = onLoadScript + docEnd;
  let header = '<div class="header">' +
      '<div class="padded">' +
      '<img class="lbc" src=' + barcodeBase64 + '>' + '<div class="oznaka">' + oznaka + '</div>' +
      '</div>' +
      '<h2 style="margin:0;text-align:center;width:100%;">Адресница</h2>' +
      '<img src=' + "logo.jpg" + ' class="header-logo">' +
      '</div>';

  let isprakac = '<h5 class="caption margined">1. Испраќач</h5>' +
      '<div class="isprakac margined">' +
      '<div class="isprakac-levo">' +
      '<label>Име и Презиме / Име на фирма</label>' +
      '<div class="border-btn">' + user.ime + '</div>' +
      '<label>Адреса</label>' +
      '<div class="border-btn">' + user.adresa + '</div>' +
      '<label>Општина</label>' +
      '<div class="border-btn">' + user.opstina + '</div>' +
      '<label>Поштенски број</label>' +
      '<div class="border-btn">' + user.postenskiBroj + '</div>' +
      '<label>Контакт лице / Телефон</label>' +
      '<div class="border-btn">' + user.telefon + '</div>' +
      '</div>' +
      '<div class="isprakac-desno padded-sides">' +
      '<label>Потпис на испраќач</label>' +
      '<div class="border-btn">' + '\xa0' + '</div>' +
      '<label>Време на прием</label>' +
      '<div class="bordered">' + '\xa0' + '</div>' +
      '<label>Датум на прием</label>' +
      '<div class="bordered">' + '\xa0' + '</div>' +
      '<label>' + '\xa0' + '</label>' +
      '<div>' + '\xa0' + '</div>' +
      '<label>Курир (шифра/потпис)</label>' +
      '<div class="border-btn">' + '\xa0' + '</div>' +
      '</div>' +
      '</div>';
  let currentDate = new Date().toLocaleDateString()
  let currentTime = new Date().toLocaleTimeString('en-GB')
  let primac = '<h5 class="caption margined">2. Примач</h5>' +
      '<div class="isprakac margined">' +
      '<div class="isprakac-levo">' +
      '<label>Име и Презиме / Име на фирма</label>' +
      '<div class="border-btn">' + adresnica.imeNaPrimac + '</div>' +
      '<label>Адреса</label>' +
      '<div class="border-btn">' + adresnica.adresaNaPrimac + '</div>' +
      '<label>Општина</label>' +
      '<div class="border-btn">' + adresnica.mestoNaPrimac + '</div>' +
      '<label>Поштенски број</label>' +
      '<div class="border-btn">'  + '</div>' +
      '<label>Контакт лице / Телефон</label>' +
      '<div class="border-btn">' + adresnica.telefonNaPrimac + '</div>' +
      '</div>' +
      '<div class="isprakac-desno padded-sides">' +
      '<label>Потпис на примач</label>' +
      '<div class="border-btn">' + '\xa0' + '</div>' +
      '<label>Време на испорака</label>' +
      '<div class="bordered">' + currentTime + '</div>' +
      '<label>Датум на испорака</label>' +
      '<div class="bordered">' + currentDate + '</div>' +
      '<label>' + '\xa0' + '</label>' +
      '<div>' + '\xa0' + '</div>' +
      '<label>Курир (шифра/потпис)</label>' +
      '<div class="border-btn">' + '\xa0' + '</div>' +
      '</div>' +
      '</div>';


  let lhs = '<div class="fhs">' + isprakac + primac + '</div>';

  let rhsls = '<div class="rhsls margined">' +
      '<h5 class="caption-full" style="margin:0;"> 3. Вид на услуга</h5>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">\xa0</div> <span>Ден за ден</span></div>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">\xa0</div> <span>Датум на достава</span></div>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">\xa0</div> <span>Денес за утре</span></div><br>' +

      '<h5 class="caption-full margined-top"> 4. Дополнителни услуги</h5>' +
      '<div class="hs">' +
      '<div class="fhs">' +
      '<span>Поштарина</span>' +
      '<div class="bordered text-right">' + postarina + '</div>' +
      '</div>' +
      '<div class="fhs">' +
      '<h5 class="caption-full margined" style="margin-top:0;"> 5. Плаќа (заокружи)</h5>' +
      '<div style="display:flex; justify-content:flex-end;">' +
      '<div class="bordered padded postarina-plakja-sender-pays-cash" >ИФ</div>' +
      '<div class="bordered padded postarina-plakja-sender-pays-on-invoice">ПФ</div>' +
      '<div class="bordered padded postarina-plakja-recipient-pays-cash">ИГ</div>' +
      '<div class="bordered padded postarina-plakja-recipient-pays-on-invoice">ПГ</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="hs">' +
      '<div class="fhs">' +
      '<span>Означена вредност</span>' +
      '<div class="bordered text-right">' + oznacenaVrednost + '</div>' +
      '</div>' +
      '<div class="fhs">' +
      '<h5 class="margined" style="margin-top:0;"> \xa0</h5>' +
      '<div style="display:flex; justify-content:flex-end;">' +
      '<div class="bordered padded oznacena_vrednost_plakja-sender-pays-cash">ИФ</div>' +
      '<div class="bordered padded oznacena_vrednost_plakja-sender-pays-on-invoice">ПФ</div>' +
      '<div class="bordered padded oznacena_vrednost_plakja-recipient-pays-cash">ИГ</div>' +
      '<div class="bordered padded oznacena_vrednost_plakja-recipient-pays-on-invoice">ПГ</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="hs">' +
      '<div class="fhs">' +
      '<span>Повратен откуп</span>' +
      '<div class="bordered text-right">' + povratenOtkup + '</div>' +
      '</div>' +
      '<div class="fhs">' +
      '<h5 class="margined" style="margin-top:0;"> \xa0</h5>' +
      '<div style="display:flex; justify-content:flex-end;">' +
      '<div class="padded">\xa0</div>' +
      '<div class="padded">\xa0</div>' +
      '<div class="padded">\xa0</div>' +
      '<div class="padded">\xa0</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="hs">' +
      '<div class="fhs">' +
      '<span>Провизија</span>' +
      '<div class="bordered text-right">' + provizija + '</div>' +
      '</div>' +
      '<div class="fhs">' +
      '<h5 class="margined" style="margin-top:0;"> \xa0</h5>' +
      '<div style="display:flex; justify-content:flex-end;">' +
      '<div class="bordered padded provizija_plakja-sender-pays-cash">ИФ</div>' +
      '<div class="bordered padded provizija_plakja-sender-pays-on-invoice">ПФ</div>' +
      '<div class="bordered padded provizija_plakja-recipient-pays-cash">ИГ</div>' +
      '<div class="bordered padded provizija_plakja-recipient-pays-on-invoice">ПГ</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="hs">' +
      '<div class="fhs">' +
      '<span>Повратен документ</span>' +
      '<div class="bordered text-right">' + povraten + '</div>' +
      '</div>' +
      '<div class="fhs">' +
      '<h5 class="margined" style="margin-top:0;"> \xa0</h5>' +
      '<div style="display:flex; justify-content:flex-end;">' +
      '<div class="bordered padded povraten_dokument_plakja-sender-pays-cash">ИФ</div>' +
      '<div class="bordered padded povraten_dokument_plakja-sender-pays-on-invoice">ПФ</div>' +
      '<div class="bordered padded povraten_dokument_plakja-recipient-pays-cash">ИГ</div>' +
      '<div class="bordered padded povraten_dokument_plakja-recipient-pays-on-invoice">ПГ</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="bordered margined-top">Тотал Пост Логистик дооел<br>улица БОРИС ТРАЈКОВСКИ 214А <br>078 207 878</div>' +

      '<h5 class="caption-full"> 8. Забелешка</h5>' +
      zabeleska +
      '</div>';
  let rhsrs = '<div class="rhsrs">' +
      '<span class="margined-top" style="margin-top: 25%;">Сериски број</span>' +
      '<div class="bordered">' + adresnica.seriskiBroj + '</div>' +
      '<div class="caption-full" style="margin-top:5%;"> 6. Вид на пратка</div>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">' + adresnica.broj_na_pisma + '</div> <span>Број на писма</span></div>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">' + adresnica.broj_na_paketi + '</div> <span>Број на пакети</span></div>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">' + adresnica.tezina + '</div> <span>Вк. тежина(kg)</span></div>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">\xa0</div> <span>Висина(m)</span></div>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">\xa0</div> <span>Должина(m)</span></div>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">\xa0</div> <span>Ширина(m)</span></div>' +
      '<div style="display:flex;" class="margined-top"><div class="bordered inline-small">\xa0</div> <span>Вк. волумен(m<sup>2</sup>)</span></div>' +

      '<div class="caption-full" style="margin-top:5%;"> 7. Начин на испорака(заокружи)</div>' +
      '<span>Адреса/Адреса</span>' +
      '<span>Адреса/Пошта</span>' +
      '<span>Пошта/Пошта</span>' +
      '<span>Пошта/Адреса</span>' +
      '</div>';

  let rhs = '<div class="rhs" style="border-bottom: 1px solid black; padding-bottom: 1.5%;">' + rhsls + rhsrs + '</div>';

  let hs = '<div class="hs" style="position:relative;">' + lhs + rhs + '</div>';

  let note = '<p style="padding: 1%;">сo потпис испраќачот и примачот потврдуваат дека сите наведени податоци се вистинити и точни со што Тотал Пост Логистик не одговара за евентуалните последици заради неисправно пополнета адресница</p>';

  let PS = '<!-- <span class="sm" style="position:relative; left: 60%;">info@novaposta.mk reklamacii@novaposta.mk</span> -->';

  let winHTML = head === true ? docStart + container + header + hs + note + PS + docEnd : container + header + hs + note + PS;
  if (printAll)
    return winHTML;
  let printWindow = window.open();
  printWindow.document.write(winHTML + '<br>' + winHTML);
  printWindow.document.close();

}




export {
  buildPrintAdresnica
}
