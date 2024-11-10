class TodoItem {
    private static idCounter = 1;
    public id: number;
    public title: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;
    public isCompleted: boolean;
    public requiresConfirmation: boolean;

    constructor(title: string, content: string, requiresConfirmation = false) {
        if (!title || !content) {
            throw new Error("Title and content cannot be empty.");
        }
        this.id = TodoItem.idCounter++;
        this.title = title;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.isCompleted = false;
        this.requiresConfirmation = requiresConfirmation;
    }

    update(content: string): void {
        if (this.requiresConfirmation) {
            const confirmation = confirm("Editing cannot be reversed. Are you sure about editing?");
            if (!confirmation) return;
        }
        this.content = content;
        this.updatedAt = new Date();
    }

    markAsCompleted(): void {
        this.isCompleted = true;
        this.updatedAt = new Date();
    }
}

class TodoList{
    protected items: TodoItem[] = [];

    addItem(title: string, content: string, requiresConfirmation = false): TodoItem {
        const newItem = new TodoItem(title, content, requiresConfirmation);
        this.items.push(newItem);
        return newItem;
    }

    removeItem(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    editItem(id: number, newContent: string): void {
        const item = this.getItemById(id);
        if (item) {
            item.update(newContent);
        }
    }

    getItemById(id: number): TodoItem | undefined {
        return this.items.find(item => item.id === id);
    }

    getAllItems(): TodoItem[] {
        return this.items;
    }

    getTotalCount(): number {
        return this.items.length;
    }

    getIncompleteCount(): number {
        return this.items.filter(item => !item.isCompleted).length;
    }

    sortByStatus(): TodoItem[] {
        return this.items.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    }

    sortByCreationTime(): TodoItem[] {
        return this.items.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}

class SearchableTodoList extends TodoList {
    searchByTitle(query: string): TodoItem[] {
        return this.items.filter(item => item.title.includes(query));
    }

    searchByContent(query: string): TodoItem[] {
        return this.items.filter(item => item.content.includes(query));
    }

    sortByStatus(): TodoItem[] {
        return this.items.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    }

    sortByCreationTime(): TodoItem[] {
        return this.items.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
}

const todoList = new SearchableTodoList();
todoList.addItem("Зробити завдання", "Розробити додаток TODO List", true);
todoList.addItem("Сходити в магазин", "Купити молоко, цукор, хліб");
todoList.addItem("Прочитати книгу", "Прочитати два розділи Хіба ревуть воли як ясла повні");

const item = todoList.getItemById(1);
if (item) {
    item.markAsCompleted();
}

console.log("Total items:", todoList.getTotalCount());

console.log("All:", todoList.getAllItems());

todoList.removeItem(1);

console.log("Total items after removing:", todoList.getTotalCount());

console.log("All after removing:", todoList.getAllItems());

todoList.editItem(2, "ITEM AFTER EDITING");

console.log("Item after editing: ", todoList.getItemById(2));

console.log("Incomplete items:", todoList.getIncompleteCount());

console.log("Search results by title:", todoList.searchByTitle("магазин"));

console.log("Search results by content:", todoList.searchByContent("воли"));

console.log("Sorted by status:", todoList.sortByStatus());

console.log("Sorted by creation time:", todoList.sortByCreationTime());


