import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { CouchbaseService } from '../services/couchbase.service';

@Injectable()
export class FavoriteService {

    favorites: Array<number>;
    docId: string = "favorites";

    constructor(private dishservice: DishService,
        private couchbaseService: CouchbaseService) {
        this.favorites = [];

        let doc = this.couchbaseService.getDocument(this.docId);
        if (doc == null) {
            this.couchbaseService.createDocument({ "favorites": [] }, this.docId);
        }
        else {
            this.favorites = doc.favorites;
        }
    }

    isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
        // 遍历，只要在favorite列表中找到一个与它相同的id，就说明在列表中
    }

    addFavorite(id: number): boolean {
        if (!this.isFavorite(id)) {
            this.favorites.push(id);
            this.couchbaseService.updateDocument(this.docId, { "favorites": this.favorites });
        }

        return true;
    }

    getFavorites(): Observable<Dish[]> {
        return this.dishservice.getDishes()
            .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
    }

    deleteFavorite(id: number): Observable<Dish[]> {
        let index = this.favorites.indexOf(id);
        if (index >= 0) {
            this.favorites.splice(index, 1);
            this.couchbaseService.updateDocument(this.docId, { "favorites": this.favorites });
            return this.getFavorites();
        }
        else {
            console.log('Deleting non-existant favorite', id);
            return Observable.throw('Deleting non-existant favorite');
        }
    }
}