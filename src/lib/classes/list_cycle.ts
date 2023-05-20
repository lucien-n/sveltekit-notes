export class ListCycle {
    current: string;
    values: string[];
    refresh: number = 0

    constructor(values: string[]) {
        this.values = values;
        this.current = this.values[0];
    }

    changed(): number {
        return this.refresh
    }


    add(value: string): void {
        if (this.values.includes(value)) return
        this.values.push(value)
    }

    getValues(): string[] {
        return this.values
    }

    next(): void {
        this.current = this.getNext();
    }

    getNext(): string {
        return this.values.indexOf(this.current) + 1 >= this.values.length
            ? this.values[0]
            : this.values[this.values.indexOf(this.current) + 1];
    }

    getCurrent(): string {
        return this.current
    }

    getCurrentUppered(): string {
        return this.getCurrent()[0].toUpperCase() + this.getCurrent().slice(1, this.getCurrent().length)
    }

    getNextUppered(): string {
        return this.getNext()[0].toUpperCase() + this.getNext().slice(1, this.getNext().length)
    }

    is(value: string): boolean {
        return value === this.getCurrent()
    }
}