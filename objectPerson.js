class Person {

    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    toHtml(parent){
        let space = " ";
        this.opt = $(`<option value="${this.firstname} ${space} ${this.lastname}">
                    ${this.firstname} ${space}${this.lastname}
                    </option>`);

        $(parent).append(this.opt);
    }

}