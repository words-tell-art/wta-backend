import {createCanvas, CanvasRenderingContext2D} from 'canvas'

function drawLine(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, weight: number, color = '#FFFFFF') {
    ctx.strokeStyle = color
    ctx.lineWidth = weight
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + width, y)
    ctx.stroke()
}

function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
    ctx.strokeStyle = color
    const textWidth = ctx.measureText(text).width
    ctx.strokeText(text, x - textWidth / 2, y)
}

export function craftWordNFT(words: { text: string, row: number }[]): Buffer {
    const rowSize = 72
    const fontSize = 48
    const startY = 70
    const colors = [
        "#00FF66",
        "#BD00FF",
        "#FF3D00",
        "#FAFF00",
        "#00C2FF"
    ]
    const canvas = createCanvas(500, 500)
    const ctx = canvas.getContext('2d')
    // fill the canvas with black color
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // drawLine(ctx, 0, 0, canvas.width, 3)
    // drawLine(ctx, 0, startY, canvas.width, 3)
    // drawLine(ctx, 0, startY + rowSize, canvas.width, 3)
    // drawLine(ctx, 0, startY + rowSize * 2, canvas.width, 3)
    // drawLine(ctx, 0, startY + rowSize * 3, canvas.width, 3)
    // drawLine(ctx, 0, startY + rowSize * 4, canvas.width, 3)
    // drawLine(ctx, 0, startY + rowSize * 5, canvas.width, 3)
    // drawLine(ctx, 0, startY + rowSize * 5 + 70, canvas.width, 3)

    ctx.font = `${fontSize}px "Bungee Shade"`
    words.forEach((word, index) => {
        drawText(ctx, word.text, canvas.width / 2, startY + (word.row * rowSize) + fontSize, colors[index])
    })

    // Write the image to file
    return canvas.toBuffer("image/png")
}