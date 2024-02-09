import { Input, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { FormGroup } from "@angular/forms";

export abstract class UserFormBase implements OnInit{

    abstract ngOnInit(): void;
    @Input()
    public userInfo!:User;

    @Input()
    public isReadOnly: boolean = true;

    public formGroup!: FormGroup;

    constructor(fg: FormGroup){
        this.formGroup = fg;
    }
}