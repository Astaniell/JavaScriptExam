let exceptNames = [];
exceptNames.push('')

LoadCurrency(exceptNames);

async function LoadCurrency(exceptId) {
    let curren = await GetAllCurrency();

    let table = document.getElementById('tableBody');
    table.innerHTML = '';
    let count = 1;

    start:for (let k in curren) {
        if (curren[k] instanceof Object) {

        for(let i=0;i<exceptId.length;i++){
                if(curren[k].id == exceptId[i]){
                    continue start;
                }
            }

            let tr = document.createElement('tr');

            let th = document.createElement('th');
            th.scope = 'row';
            th.innerHTML = count;
            tr.appendChild(th);

            let td = document.createElement('td'); 
            td.innerHTML = k;
            tr.appendChild(td);

            td = document.createElement('td'); 
            td.innerHTML = curren[k].name;
            td.classList.add('name');
            tr.appendChild(td);

            td = document.createElement('td'); 
            td.innerHTML = curren[k].humanType;
            tr.appendChild(td);
          
            td = document.createElement('td'); 
            td.innerHTML = curren[k].currencyType;
            tr.appendChild(td);

            td = document.createElement('td'); 
            td.innerHTML = curren[k].txFee;
            tr.appendChild(td);

            td = document.createElement('td'); 
            td.innerHTML = curren[k].minConf;
            tr.appendChild(td);

            td = document.createElement('td'); 
            let btn = document.createElement('button');
            btn.id = curren[k].id;
            btn.innerHTML = 'DELETE';
            btn.type = 'button';
            btn.classList.add('btn');
            btn.classList.add('btn-danger');
            btn.classList.add('btn-sm');      
            btn.addEventListener('click',function(){deleteCurren(curren[k].id)});
            td.appendChild(btn);
            tr.appendChild(td);
            

            table.appendChild(tr);
            count++;
        }
    }
}

async function GetAllCurrency() {
    let url = 'https://poloniex.com/public?command=returnCurrencies';
    let response = await fetch(url);
    let currencies = await response.json(); // читаем ответ в формате JSON
    return currencies;
}

function deleteCurren(id){
    console.log('Delete ' + id);
    exceptNames.push(id);
    LoadCurrency(exceptNames);
}