import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-tab',
    standalone: true,
    templateUrl: './tab.component.html',
})
export class TabComponent {
    @Input() label: string;
    @Output() tabRemove = new EventEmitter<void>();
    protected _isSelected = false;
    protected _isRemoved = false;

    remove() {
        this._isRemoved = true;
        this.tabRemove.emit();
    }

    select() {
        this._isSelected = true;
    }

    unselect() {
        this._isSelected = false;
    }

    get isSelected() {
        return this._isSelected;
    }

    get isRemoved() {
        return this._isRemoved;
    }
}
