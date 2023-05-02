class SOSchecker {
    constructor(i, j) {
        this.i = i
        this.j = j

        this.variantsForS = [
            {
                'O': { "y": this.i - 1, "x": this.j },
                'S': { "y": this.i - 2, "x": this.j }
            },
            {
                'O': { "y": this.i - 1, "x": this.j + 1 },
                'S': { "y": this.i - 2, "x": this.j + 2 }
            },
            {
                'O': { "y": this.i, "x": this.j + 1 },
                'S': { "y": this.i, "x": this.j + 2 }
            },
            {
                'O': { "y": this.i + 1, "x": this.j + 1 },
                'S': { "y": this.i + 2, "x": this.j + 2 }
            },
            {
                'O': { "y": this.i + 1, "x": this.j },
                'S': { "y": this.i + 2, "x": this.j }
            },
            {
                'O': { "y": this.i + 1, "x": this.j - 1 },
                'S': { "y": this.i + 2, "x": this.j - 2 }
            },
            {
                'O': { "y": this.i, "x": this.j - 1 },
                'S': { "y": this.i, "x": this.j - 2 }
            },
            {
                'O': { "y": this.i - 1, "x": this.j - 1 },
                'S': { "y": this.i - 2, "x": this.j - 2 }
            },
        ]

        this.variantsForO = [
            {
                'O': { "y": this.i - 1, "x": this.j },
                'S': { "y": this.i + 1, "x": this.j }
            },
            {
                'O': { "y": this.i - 1, "x": this.j + 1 },
                'S': { "y": this.i + 1, "x": this.j - 1 }
            },
            {
                'O': { "y": this.i, "x": this.j + 1 },
                'S': { "y": this.i, "x": this.j - 1 }
            },
            {
                'O': { "y": this.i - 1, "x": this.j - 1 },
                'S': { "y": this.i + 1, "x": this.j + 1 }
            }
        ]
    }
}