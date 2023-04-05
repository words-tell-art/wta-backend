export const colorHex = {
    green: "#00FF66",
    blue: "#00C2FF",
    purple: "#BD00FF",
    red: "#FF3D00",
    orange: "#ff9900",
    yellow: "#f7ff00",
}

export const colorHue = [
    {name: 'green', range: [30, 90]},
    {name: 'blue', range: [90, 150]},
    {name: 'purple', range: [150, 210]},
    {name: 'red', range: [210, 270]},
    {name: 'orange', range: [270, 330]},
    {name: 'yellow', range: [330, 360]},
    {name: 'yellow', range: [0, 30]},
]

export const colorRarity = [
    18, 36, 54, 72, 90, 100
]

export class RGB {
    constructor(public r: number,
                public g: number,
                public b: number) {
    }

    add(color: RGB): RGB {
        this.r = (this.r + color.r) / 2
        this.g = (this.g + color.g) / 2
        this.b = (this.b + color.b) / 2
        return this
    }

    hue(): string | null {
        const h = rgbToHsl(this.r, this.g, this.b)[0] * 360
        for (const hue of colorHue) {
            if (h >= hue.range[0] && h < hue.range[1]) {
                return hue.name
            }
        }
        return null
    }
}

export function rgbToHex(color: RGB) {
    return "#" + (1 << 24 | color.r << 16 | color.g << 8 | color.b).toString(16).slice(1)
}

export function hexToRgb(hex): RGB {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!
    return new RGB(
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    )
}

export function rgbToHsl(r, g, b) {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const l = (max + min) / 2
    let h, s

    if (max == min) {
        h = s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return [h, s, l]
}