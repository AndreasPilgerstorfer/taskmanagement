let Tasks = new Taskverwaltung();
let clickedTask = null;
let clickedTaskHTML = null;
let HilfsArraySubTasks = [];
let ebene = true;


$(document).ready(function () {

    // loading default Persons from the JSON File //////////////////////////////////////////////////////////////////////
    $.getJSON("persons.json", function (data) {
        for (let elem of data.elements){
            let p1 = new Person(elem.firstname, elem.lastname);
            let destination = $("#pers");
            p1.toHtml(destination);
        }
    });



    //createHTML ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // addBackground if closed or open
    function createHTML(){
        $("#textarea").empty();


        for (let elem of Tasks.tasks){
            elem.toHTML($("#textarea"), elem.order);
            for (let s of elem.Subtasks){
                s.toHTML($("#textarea"), s.order);
                for (let sa of s.Subtasks){
                    sa.toHTML($("#textarea"), sa.order);
                }
            }
        }

        //clickhandler for radio buttons
        $(".d").click(function (e) {

            let currTask = new Task();
            let idTask = $(this).parent().attr("id");


            for (let elem of Tasks.tasks){
                if(elem.id == idTask){
                    currTask = elem;
                }
                // Subtasks Ebene1
                for(let subs of elem.Subtasks){
                    if(subs.id == idTask){
                        currTask = subs;
                    }

                    //Subtasks Ebene 2
                    for(let subs2 of subs.Subtasks){
                        if(subs2.id == idTask){
                            currTask = subs2;
                        }
                    }
                }
            }

            //checking if Subtasks are closed
            let checker = currTask.checkSubtasksOpen();
            if(checker){
                createHTML();
                return;
            }

            currTask.changeToDone();
            createHTML();

        });

        //open //
        $(".o").click(function (e) {

            let currTask = new Task();
            let idTaskO = $(this).parent().attr("id");


            for (let elem of Tasks.tasks){
                if(elem.id == idTaskO){
                    currTask = elem;
                }
                // Subtasks
                for(let subs of elem.Subtasks){
                    if(subs.id == idTaskO){
                        currTask = subs;
                    }

                    //Subtasks
                    for(let subs2 of subs.Subtasks){
                        if(subs2.id == idTaskO){
                            currTask = subs2;
                        }
                    }
                }
            }

            currTask.changeToOpen();
            createHTML();

        });


        // delete Button /////////////////////////////////////////////////////////////////////////////////
        $(".delete").click(function (e) {
            clickedTask = null;

            let currTask = new Task();

            // MainTask
            if ($(this).parent().hasClass("main")){
                let idTask = $(this).parent().attr("id");

                for (let x of Tasks.tasks){
                    if (x.id == idTask){
                        currTask = x;
                    }
                }

                Tasks.tasks = $.grep(Tasks.tasks, function(value) {
                    return value != currTask;
                });
                createHTML();

            }
            else{
                // Subtask
                let idTask = $(this).parent().attr("id");

                for(let elem of HilfsArraySubTasks){
                    if(elem.id == idTask){
                        elem.Subtasks = [];
                        let currPar = elem.parent;

                        let base = currPar.Subtasks;

                        currPar.Subtasks = $.grep(currPar.Subtasks, function(value) {
                            return value != elem;
                        });

                        createHTML();
                    }
                }

            }

        })
    }


    //addTask //////////////////////////////////////////////////////////////////////////////////////////////////////////
    $("#btnadd").click(function () {

        let basis = Tasks.addTask();
        if(basis == false){
            return;
        }
        createHTML();
        clickedTask = null;
    });


    //selctedMainTask //////////////////////////////////////////////////////////////////////////////////////////////////
    //get the Task which was clicked on save it and mark it
    $("#textarea").click(function (e) {

        //removing the old clicked
        let Array = $("#textarea div");
        for (let ar of Array){
            $(ar).removeClass("selected");
        }

        //set global variable clickedTask and set selected to another entry
        if(Tasks.tasks.length > 0){
            let click = e.target;

            clickedTaskHTML = click;
            let clickId = $(click).attr("id");


            for (let elem of Tasks.tasks){
                if(elem.id == clickId){
                    clickedTask = elem;
                    $(click).addClass("selected");
                    ebene = true;
                    return;
                }
                // Subtasks Ebene1
                for(let subs of elem.Subtasks){
                    if(subs.id == clickId){
                        clickedTask = subs;
                        ebene = true;
                        $(click).addClass("selected");
                        return;
                    }

                    //Subtasks Ebene 2
                    for(let subs2 of subs.Subtasks){
                        if(subs2.id == clickId){
                            clickedTask = subs2;
                            ebene = false;
                            $(click).addClass("selected");
                            return;
                        }
                    }
                }
            }
        }

    });

    //addSubtask///////////////////////////////////////////////////////////////////////////////////////////////////////
    $("#btnsub").click(function (e) {


        // check if a Task is marked
        if (clickedTask == null){
            alert("Es wurde kein Task markiert !");
            return;
        }

        // checking if Main entry is open or not
        if ($(clickedTaskHTML).hasClass("done")){
            alert("Ein Subtask darf nur hinzugefügt werden, wenn der Haupttask noch nicht abgeschlossen ist !");
        }
        else if(ebene == false){
            alert("Max 3 Ebenen");
        }
        else{
            //check  and set the order for order
            let res = clickedTask.order;
            let ord = 1;
            let i = 0;
            while (i<res){
                ord ++;
                i++;
            }

            let s = new Task();

            if (clickedTask != null){
                let sub = s.addSubtask(clickedTask);
                HilfsArraySubTasks.push(sub);
                clickedTask = null;
                if (sub == false){
                    return;
                }

                createHTML()
            }
        }



    });


    // show open ///////////////////////////////////////////////////////////////////////////////////////////////////////
    $("#btnshowOpen").click(function (e) {

        let collection = $("#textarea div");
        clickedTask = null;
        for (let elem of collection){

            if ($(elem).hasClass("done")){
                $(elem).addClass("hide");
            }
        }

    });

    // show all ////////////////////////////////////////////////////////////////////////////////////////////////////////
    $("#btnshowAll").click(function (e) {

        let collection = $("#textarea div");
        clickedTask = null;
        for (let elem of collection){

            if ($(elem).hasClass("hide")){
                $(elem).removeClass("hide");
            }
        }

    })



    // bearbeiten Button ///////////////////////////////////////////////////////////////////////////////////////////////
    $("#btnEdit").click(() => {

        if (clickedTask == null){
            alert("Bitte markieren Sie den Task den Sie bearbeiten möchten!");
            return;
        }

        clickedTask.editTask();
        createHTML();
        clickedTask = null;
    })




});
