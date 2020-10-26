import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptUIChartModule } from 'nativescript-ui-chart/angular';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CurrentComponent } from './current/current.component';
import { DayComponent } from './day/day.component';
import { ImageLabelComponent } from './imageLabel/imageLabel.component';
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { LandingComponent } from './landing/landing.component';
import { LineGraphComponent } from './lineGraph/lineGraph.component';
import { PlaceComponent } from './place/place.component';
import { WindComponent } from './wind/wind.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        NativeScriptModule,
        NativeScriptUIChartModule
    ],
    declarations: [
        AppComponent,
        CurrentComponent,
        DayComponent,
        ImageLabelComponent,
        ItemsComponent,
        ItemDetailComponent,
        LandingComponent,
        LineGraphComponent,
        PlaceComponent,
        WindComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
