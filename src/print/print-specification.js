import JsBarcode from 'jsbarcode'
function printSpec(entries, spec) {

    var canvas = document.createElement("canvas");
    JsBarcode(canvas, spec.barcode, {format: "CODE39"});
    let barcodeBase64 = canvas.toDataURL("image/png");

  let stylePage = '@page {size: landscape;}';
  let styleFont = '* {font-family: Arial, sans-serif;} p, td, .signDiv{font-size:0.8em;}';
  let styleContainer = '.cont {padding:1%;}';
  let styleHeader = '.header {text-align:center; }';
  let styleTh = 'th {width: 20px}';
  let styleTR = 'tr {border-bottom: 2px solid black;}';
  let styleTD = 'td {text-align:center; border-bottom: 1px solid lightgrey;}';
  let styleHeaderLogo = '.header-logo {position:absolute; right:0; max-width: 150px;}';
  let styleCaption = '.caption {text-align:center; max-width: 40%; margin:auto; margin-top:2%;}';
  let styleTable = 'table {margin:auto;width:100%;margin-top:2%;}';
  let styleThead = 'thead {background-color: lightgrey;}';
  let styleTrSum = '.tr_sum {font-weight:bold; border:0; text-align:left;}';
  let styleSignDiv = '.signDiv {display:flex; justify-content:space-between; margin-top:2%;}';
  let styleSignDivChildren = '.signDiv div {display:flex; align-items:center; justify-content:center; width:15%; padding:2% 10%; border-bottom:1px solid black;}';
  let styleBCimg = '.lbc {position:relative; max-width:15%;}';
  let style = stylePage + styleFont + styleContainer + styleBCimg + styleHeaderLogo + styleHeader + styleCaption +
    styleTable + styleTh + styleThead + styleTR + styleTD + styleTrSum + styleSignDiv + styleSignDivChildren;
  let docStart = '<html><head><style>' ;
   docStart += style;
   docStart += '</style></head><body><div class="cont">';
  let docEnd = "</body></html></div>";
  let header = '<div class="header">';
   header += '<img src="' + "logo.jpg" + '" class="header-logo">';
  header += '<h3 style="display:inline; margin: auto;">Потврда за прием на пратки</h3><br>';
  header += '<img class="lbc" src="' + barcodeBase64 + '">';
  // header += spec.barcode;
  header += '</div>';
  let caption = '<div style="text-align:center;"><p class="caption">Спецификација за превземени пратки од импорт листа ' +
        spec.barcode + ' на датум ' + spec.createdAt.split(' ')[0] + '</p></div>';

  let onLoadScript = "<script type='application/javascript'>window.onload = function(){window.print(); window.onfocus = function() {setTimeout(function(){window.close()},3);} } </script>";
  docEnd = onLoadScript + docEnd;

  let sumTezina = 0;
  let sumPostarina = 0;
  let sumOtkup = 0;
  let sumOtkupnina = 0;
    let ths = '';
    if(entries[0].pratkaBroj){
        ths = '<th>#</th><th>Пратка број</th><th>Сериски број</th><th>Примач</th><th>Адреса</th>' +
            '<th>Телефон</th><th>Тежина</th><th>Повратен документ</th><th>Поштарина</th><th>Повратен Откуп</th><th>Откупнина</th>';
    }else{
        ths = '<th>#</th><th>Сериски број</th><th>Примач</th><th>Адреса</th>' +
            '<th>Телефон</th><th>Тежина</th><th>Повратен документ</th><th>Поштарина</th><th>Повратен откуп</th><th>Откупнина</th>';
    }

  let povratenDokument = "";
      let trs = '';
  for(let i = 0; i<entries.length; i++){

    trs += '<tr>';
    //trs += '<td>' + '</td>';
    trs += '<td>' + (i + 1) + '</td>';
    if(entries[0].pratkaBroj){
        trs += '<td>' + entries[i].pratkaBroj + '</td>';
    }
    trs += '<td>' + entries[i].seriskiBroj + '</td>';
    trs += '<td>' + entries[i].imeNaPrimac + '</td>';
    trs += '<td>' + entries[i].adresaNaPrimac +', ' + entries[i].mestoNaPrimac + '</td>';
    trs += '<td>' + entries[i].telefonNaPrimac + '</td>';
    trs += '<td>' + entries[i].tezina + 'kg' + '</td>';
    povratenDokument = entries[i].povratenDokument == 1 ? 'Да' : 'Не';
    trs += '<td>' + povratenDokument + '</td>';
    trs += '<td>' + entries[i].postarina + 'ден' + '</td>';
    trs += '<td>' + entries[i].povratenOtkup + 'ден' + '</td>';
    trs += '<td>' + entries[i].otkupnina + 'ден' + '</td>';
    trs += '</tr>';
    sumTezina+= +entries[i].tezina;
    sumPostarina+= +entries[i].postarina;
    sumOtkup+= +entries[i].povratenOtkup;
    sumOtkupnina+= +entries[i].otkupnina;
  }
    let tr_sum = '';
  if(entries[0].pratkaBroj) {
    tr_sum = '<tr class="tr_sum">' + '<td>' + (entries.length) + '</td>' + '<td colspan="5">' + '</td>' +
          '<td>' + sumTezina + 'kg' + '</td>' + '<td>' + '</td>' +  '<td>' + sumPostarina + 'ден' + '</td>' +  '<td>' + sumOtkup + 'ден'
        +  '<td>' + sumOtkupnina + 'ден' + '</td>' + '</tr>';
     }else{
        tr_sum = '<tr class="tr_sum">' + '<td>' + (entries.length) + '</td>' + '<td colspan="4">' + '</td>' +
            '<td>' + sumTezina + 'kg' + '</td>' + '<td>' + '</td>' +  '<td>' + sumPostarina + 'ден' + '</td>' +  '<td>' + sumOtkup + 'ден'
            +  '<td>' + sumOtkupnina + 'ден' + '</td>' + '</tr>';
    }


  let sign_div = '<div class="signDiv"><div>Испраќач:</div><div>Курир:</div></div>';

  let table = '<table><thead>' + ths + '</thead><tbody>' + trs + tr_sum +  '</tbody></table>';

  let winHTML = docStart + header + caption + table + sign_div + docEnd;
  let printWindow = window.open();
  console.log('winHTML: ', winHTML);
  printWindow.document.write(winHTML);
  printWindow.document.close();

}

export {
  printSpec
}
