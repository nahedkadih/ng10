import { NgModule, Optional, SkipSelf, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DomSanitizer } from '@angular/platform-browser';
import { BidiModule } from '@angular/cdk/bidi'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge'; 
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ScrollingModule } from '@angular/cdk/scrolling';
 
export const MATERIAL_MODULES_CORE = [MatDialogModule, MatBadgeModule,
    MatToolbarModule, BidiModule, MatProgressBarModule,
    MatIconModule, MatProgressSpinnerModule, MatProgressBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule, FlexLayoutModule,
    MatButtonModule, MatDatepickerModule,
    MatNativeDateModule,
];
const MATERIAL_MODULES_SHARED = [
    MatTabsModule, MatChipsModule,  MatSlideToggleModule, MatDividerModule, MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatGridListModule, 
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatRippleModule
];

@NgModule({
  imports: [CommonModule,...MATERIAL_MODULES_SHARED, ...MATERIAL_MODULES_CORE],
    exports: [...MATERIAL_MODULES_SHARED, ...MATERIAL_MODULES_CORE],
    providers: [MatDatepickerModule],
})
export class MaterialModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/icons.svg'));
  }
}


