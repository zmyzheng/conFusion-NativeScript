import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
// import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-dishdetail',
    moduleId: module.id,
    templateUrl: './dishdetail.component.html',
    // styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

    dish: Dish;
    comment: Comment;
    errMess: string;

    constructor(private dishservice: DishService,
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        @Inject('BaseURL') private BaseURL) { }

    ngOnInit() {

        this.route.params
            .pipe(switchMap((params: Params) => this.dishservice.getDish(+params['id'])))
            .subscribe(dish => this.dish = dish,
                errmess => { this.dish = null; this.errMess = <any>errmess; });
    }

    goBack(): void {
        this.routerExtensions.back();
    }
}