export class FilterArray<T> {

    private _list_a: T[] = []
    private _list_b: T[] = []

    private target = ''

    constructor(private _reducer: (key: string, obj: T) => boolean) {
    }

    get origin(): T[] {
        return this._list_a
    }

    get filtered(): T[] {
        return this._list_b
    }

    update_origin(arr: T[]) {
        this._list_a = arr
        this._reduce()
    }

    update_target(target: string) {
        this.target = target
        this._reduce()
    }

    private _reduce() {
        this._list_b = this._list_a.filter(r => !this.target || this._reducer(this.target, r))
    }
}
