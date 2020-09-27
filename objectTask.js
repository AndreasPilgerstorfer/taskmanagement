class Taskverwaltung{

    constructor() {
        this.tasks = [];
    }

    addTask() {   /////////////////////////////////////////////////////////////////////////////////////////
        let data = this.getData();

        if (data[0] == "") {
            alert("Task hat keinen Titel!");
            return false;
        }
        if (data[1] === "") {
            alert("Task hat keine Beschreibung!");
            return false;
        }
        if (data[2] === "") {
            alert("Task hat keine zugeordnete Person!");
            return false;
        }

        let t = new Task(data[0], data[1], data[2]);
        this.tasks.push(t);
        return t;
    }

    getData(){  ////////////////////////////////////////////////////////////////////////////////////////////
        let data = [];
        let namE = $("#task").val();
        data.push(namE);
        let descr = $("#description").val();
        data.push(descr);
        let persoN = $("#pers").val();
        data.push(persoN);
        return data;
    }

}

// ========================================================================================== //
let ids = 0;
let btnName = 100;

class Task {

    constructor(name, description, person, parent) { /////////////////////////////////////////////
        //Subtask
        if(parent != undefined){
            this.parent = parent;
            this.order = parent.order +1;
        }
        else{
            this.parent = "Main";
            this.order = 1;
        }

        this.id = ids;
        ids++;
        this.name = name;
        this.description = description;
        this.person = person;
        this.Subtasks = [];
        this.class = "open";
    }


    getData(){  //////////////////////////////////////////////////////////////////////////
        let data = [];
        let namE = $("#task").val();
        data.push(namE);
        let descr = $("#description").val();
        data.push(descr);
        let persoN = $("#pers").val();
        data.push(persoN);
        return data;
    }


    addSubtask(Maintask){ /////////////////////////////////////////////////////////////////
        let data = this.getData();

        if (data[0] == ""){
            alert("SubTask hat keinen Titel!");
            return false;
        }
        if(data[1] === ""){
            alert("SubTask hat keine Beschreibung!");
            return false;
        }
        if(data[2] === ""){
            alert("SubTask hat keine zugeordnete Person!");
            return false;
        }

        let sub = new Task(data[0], data[1], data[2], Maintask);
        Maintask.Subtasks.push(sub);
        return sub;
    }


    toHTML(parent, order){ /////////////////////////////////////////////////////////////////

        let checkOP = "";
        let checkDO = "";
        if(this.class == "open"){
            checkDO = "";
            checkOP = "checked";
        }
        else{
            checkOP = "";
            checkDO = "checked";
        }

        if(order == 1) {
            this.opt = $(`<div class="main ${this.class}" id=" ${this.id}">
                      <input type="radio" name="${btnName}" class="o" value="offen" ${checkOP}>
                      <span class ="Sp">offen</span>
                      <span class="Sp2"> ${this.name}</span>
                      <span class="Sp3">Person: </span>
                      <span class="Sp31"> ${this.person}</span>
                      <br>
                      <input type="radio" name="${btnName}" class="d" value="closed" ${checkDO}>
                      <span class ="Sp">erledigt</span>
                      <span class="Sp4">${this.description}</span>
                      <input type="button" class="delete" value="Löschen">
                      <hr>
                      </div>`);
        }
        else{
            this.opt = $(`<div class="Sub${order} ${this.class}" id="${this.id}">
                      <input type="radio" name="${btnName}" class="o" value="offen" ${checkOP} >
                      <span class ="Sp">offen</span>
                      <span class="Sp2">${this.name}</span>
                      <span class="Sp3">Person: </span>
                      <span class="Sp31">${this.person}</span>
                      <br>
                      <input type="radio" name="${btnName}" class="d" value="closed" ${checkDO}>
                      <span class ="Sp">erledigt</span>
                      <span class="Sp4">${this.description}</span>
                      <input type="button" class="delete" value="Löschen">
                      <hr>
                      </div>`);
        }


        btnName ++;
        $(parent).append(this.opt);
    }


    changeToOpen(){ //////////////////////////////////////////////////////////////////////////
        this.class = "open";
    }

    changeToDone(){ /////////////////////////////////////////////////////////////////////////
        this.class = "done";
    }

    checkSubtasksOpen(){ /////////////////////////////////////////////////////////////////////

        for (let elem of this.Subtasks){
            if(elem.class == "open"){
                alert("Es müssen zuerst alle Subtasks geschlossen werden!");
                return true;
            }
        }
        return false;
    }


    editTask(){ //////////////////////////////////////////////////////////////////////////////
        let data = this.getData();


        if (data[0] == ""){
            alert("Task hat keinen Titel! Geben Sie bitte alle Werte zur Bearbeitung ein!");
            return;
        }
        if(data[1] === ""){
            alert("Task hat keine Beschreibung! Geben Sie bitte alle Werte zur Bearbeitung ein! ");
            return;
        }
        if(data[2] === ""){
            alert("Task hat keine zugeordnete Person! Geben Sie bitte alle Werte zur Bearbeitung ein!");
            return;
        }

        this.name = data[0];
        this.description = data[1];
        this.person = data[2];
    }

}