import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { DrawerPage } from '../shared/drawer/drawer.page';

@Component({
    selector: 'app-contact',
    moduleId: module.id,
    templateUrl: './contact.component.html',
    // styleUrls: ['./contact.component.css']
})
export class ContactComponent extends DrawerPage {
    errMess: string;

    constructor(private routerExtensions: RouterExtensions,
        private changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }
}