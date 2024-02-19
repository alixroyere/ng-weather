import {Component, computed, contentChildren, effect, Signal} from '@angular/core';
import {TabComponent} from '../tab/tab.component';

@Component({
    selector: 'app-tab-group',
    standalone: true,
    templateUrl: './tab-group.component.html',
    styleUrl: './tab-group.component.css',
})
export class TabGroupComponent {
    private tabs: Signal<readonly TabComponent[]> = contentChildren(TabComponent);
    protected visibleTabs: Signal<TabComponent[]> = computed(() =>
        this.tabs().filter(tab => !tab.isRemoved)
    );

    constructor() {
        effect(() => {
            this.selectFirstTabByDefault();
        });
    }

    select(tabToSelect: TabComponent): void {
        this.findSelectedTab().unselect();
        tabToSelect.select();
    }

    remove(tabToRemove: TabComponent): void {
        tabToRemove.remove();
    }

    private selectFirstTabByDefault(): void {
        if (!this.findSelectedTab()) {
            this.visibleTabs()[0]?.select();
        }
    }

    private findSelectedTab(): TabComponent {
        return this.visibleTabs().find(tab => tab.isSelected);
    }
}
