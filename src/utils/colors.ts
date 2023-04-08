export const colorHex = {
    green: "#00FF66",
    blue: "#00C2FF",
    purple: "#BD00FF",
    red: "#FF3D00",
    orange: "#ff9900",
    yellow: "#f7ff00",
}

export const colorHue = [
    {name: 'orange', range: [15, 45]},
    {name: 'yellow', range: [45, 80]},
    {name: 'green', range: [75, 165]},
    {name: 'blue', range: [165, 265]},
    {name: 'purple', range: [265, 340]},
    {name: 'red', range: [340, 360]},
    {name: 'red', range: [0, 15]},
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
        const hsl1 = rgbToHsl(this.r, this.g, this.b)
        const hsl2 = rgbToHsl(color.r, color.g, color.b)
        let h1 = hsl1[0]
        let h2 = hsl2[0]

        if (h1 > 0.5 && h2 < 0.04) {
            h2 = 0.97
        } else if (h2 > 0.5 && h1 < 0.04) {
            h1 = 0.97
        }
        const newH = (h1 + h2) / 2
        const newColor = hslToRgb(newH, hsl1[1], hsl1[2])
        this.r = newColor[0]
        this.g = newColor[1]
        this.b = newColor[2]
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

export function hslToRgb(h, s, l) {
    let r, g, b

    if (s == 0) {
        r = g = b = l
    } else {
        const hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}