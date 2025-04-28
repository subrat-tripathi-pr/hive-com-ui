import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatList, MatListItem, MatListItemLine } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-contact-card',
    templateUrl: './contact-card.component.html',
    styleUrl: './contact-card.component.scss',
    imports: [MatCardModule,
        MatCardTitle,
        MatCardSubtitle,
        MatCardHeader,
        MatListItemLine,
        MatList,
        MatListItem,
        MatIconModule,
        MatTooltipModule, 
        MatDividerModule,]
})
export class ContactCardComponent {
    @Input() contact: any;
    @Output() selectedContact = new EventEmitter<string>();

    emitSelectedContact(contactId: string) {
        this.selectedContact.emit(contactId);
    }
}
