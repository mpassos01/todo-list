//let banco = []

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];

const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice = ${indice}>
    <div>${tarefa}</div>
    <input type="button" value= '🗑️' data-indice = ${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
    item.style.padding = '15px'
    item.style.boxShadow = '5px 5px 10px black;'
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    console.log(tecla);
    if(tecla === 'Enter' && texto != '') {
        const banco = getBanco();
        banco.push({'tarefa': texto,'status':''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '' ;
    } else if(texto == '' && tecla == 'Enter') {
        alert('Preencha a tarefa!');
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status=== '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
} 
const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);


atualizarTela()