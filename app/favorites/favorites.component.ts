import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/dish';
import { ListViewEventData, RadListView } from 'nativescript-telerik-ui/listview';
import { RadListViewComponent } from 'nativescript-telerik-ui/listview/angular';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { View } from 'ui/core/view';
import { confirm } from "ui/dialogs";
import { Toasty } from 'nativescript-toasty';

@Component({
    selector: 'app-favorites',
    moduleId: module.id,
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent extends DrawerPage implements OnInit {

    // it's an array of Dish type which native script supports and using this ObservableArray, whenever you add items into the ObservableArray or delete items from this ObservableArray, the template view to which this is linked can then react to changes in this ObservableArray automatically using certain animations and the RadListView component actually does that. So when you add items the item will appear into the view and then when you delete items the item will disappear from the view using certain, already built-in animations that RadListView supports. So thats why I am using an ObservableArray here.
    favorites: ObservableArray<Dish>;
    errMess: string;

    @ViewChild('myListView') listViewComponent: RadListViewComponent;
    // 对应HTML中的#myListView

    constructor(private favoriteservice: FavoriteService,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject('BaseURL') private BaseURL) {
        super(changeDetectorRef);
    }

    ngOnInit() {
        this.favoriteservice.getFavorites()
            .subscribe(favorites => this.favorites = new ObservableArray(favorites),
                errmess => this.errMess = errmess);
    }

    deleteFavorite(id: number) {
        console.log('delete', id);

        let options = {
            title: "Confirm Delete",
            message: 'Do you want to delete Dish ' + id,
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        };

        confirm(options).then((result: boolean) => {
            if (result) {

                this.favorites = null;

                this.favoriteservice.deleteFavorite(id)
                    .subscribe(favorites => {
                        const toast = new Toasty("Deleted Dish " + id, "short", "bottom");
                        toast.show();
                        this.favorites = new ObservableArray(favorites);
                    },
                        errmess => this.errMess = errmess);
            }
            else {
                console.log('Delete cancelled');
            }
        });

    }

    public onCellSwiping(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;

        if (args.data.x > 200) {

        }
        else if (args.data.x < -200) {

        }
    }

    public onSwipeCellStarted(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];

        var leftItem = swipeView.getViewById<View>('mark-view');
        // HTML中有id="mark-view"
        var rightItem = swipeView.getViewById<View>('delete-view');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }


    public onSwipeCellFinished(args: ListViewEventData) {

    }

    public onLeftSwipeClick(args: ListViewEventData) {
        console.log('Left swipe click');
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onRightSwipeClick(args: ListViewEventData) {
        this.deleteFavorite(args.object.bindingContext.id);
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }
}
