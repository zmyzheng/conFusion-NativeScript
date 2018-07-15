import { Component, OnInit, Inject, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";

import { Page } from "ui/page";
import { View } from "ui/core/view";
import * as enums from "ui/enums";

import { CouchbaseService } from '../services/couchbase.service';


@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html'
})
export class ReservationComponent extends DrawerPage implements OnInit {

    reservation: FormGroup;

    showForm: boolean = true;
    showResults: boolean = false;
    reservationValue: null;
    formView: View;
    dataView: View;

    reservations: any[];

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private _modalService: ModalDialogService,
        private vcRef: ViewContainerRef,
        private page: Page,
        private couchbaseService: CouchbaseService) {
        super(changeDetectorRef);

        this.reservation = this.formBuilder.group({
            guests: 3,
            smoking: false,
            dateTime: ['', Validators.required]
        });
    }

    ngOnInit() {

    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text });
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text });
    }

    createModalView(args) {

        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this._modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({ guests: result });
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result });
                }
            });

    }

    onSubmit() {
        console.log(JSON.stringify(this.reservation.value));
        this.reservationValue = this.reservation.value;
        this.storeToDatabase();
        this.animationAfterStore();
    }

    animationAfterStore() {
        this.formView = this.page.getViewById<View>("formView");
        this.dataView = this.page.getViewById<View>("dataView");
        this.formView.animate({
            opacity: 0,
            scale: { x: 0, y: 0 },
            duration: 500,
            curve: enums.AnimationCurve.easeInOut
        })
            .then(() => {
                this.showForm = false;
                this.dataView.animate({
                    opacity: 1,
                    scale: { x: 1, y: 1 },
                    duration: 500,
                    curve: enums.AnimationCurve.easeInOut
                });
            });
    }

    storeToDatabase() {
        let doc = this.couchbaseService.getDocument('reservations');
        if (doc === null) {
            this.couchbaseService.createDocument({ "reservations": [] }, 'reservations');
            console.log('first reservation');
            doc = this.couchbaseService.getDocument('reservations');
        }

        console.log(JSON.stringify(doc))
        this.reservations = doc.reservations;
        this.reservations.push(this.reservationValue);
        this.couchbaseService.updateDocument('reservations', { 'reservations': this.reservations });
        console.log(JSON.stringify(this.couchbaseService.getDocument('reservations')))

    }
}
