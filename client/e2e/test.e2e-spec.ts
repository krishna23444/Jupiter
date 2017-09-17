// list.po.ts
import { element, by, promise,
    ElementFinder, ElementArrayFinder } from 'protractor';

export class List {
    getContainer(): ElementFinder {
        return element(by.css('.list'));
    }
    getItems(): ElementArrayFinder {
        return element.all(by.css('app-todo'));
    }
    getItem(index: Number): ElementFinder {
        return this.getItems().get(index);
    }
    getEditButton(index: Number): ElementFinder {
        return this.getItem(index).element(by.css('.edit'));
    }
    getDeleteButton(index: Number): ElementFinder {
        return this.getItem(index).element(by.css('.delete'));
    }

    clickEditButton(index: Number): promise.Promise {
        return this.getEditButton(index).click();
    }
    clickDeleteButton(index: Number): promise.Promise {
        return this.getDeleteButton(index).click();
    }
}