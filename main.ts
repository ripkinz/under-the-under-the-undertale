enum SpriteKindCustom {
    Attack
}
function showUndertaleTextBubble(text: string, x: number, y: number, duration: number = 3000) {
    // The third parameter is max width in pixels
    // First line
    let bubble1 = textsprite.create("you feel like", 15, 1)
    bubble1.setOutline(1, 15) // white text, black outline
    bubble1.setPosition(box.x, box.y - box.height / 2 - 20)

    // Second line
    let bubble2 = textsprite.create("you're going to", 15, 1)
    bubble2.setOutline(1, 15)
    bubble2.setPosition(box.x, box.y - box.height / 2 - 10)

    // Third line
    let bubble3 = textsprite.create("have a bad time", 15, 1)
    bubble3.setOutline(1, 15)
    bubble3.setPosition(box.x, box.y - box.height / 2)

    
    
}


function spawnVerticalBoneWaves() {
    for (let i = 0; i < 6; i++) {
        let fromTop = i % 2 == 0
        let y = fromTop ? 95 : 65
        let bone = sprites.create(img`
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
                . 1 .
        `, SpriteKindCustom.Attack)

        bone.setPosition(160 + i * 20

        , y)
        bone.vx = -90
        bone.lifespan = 4000
        if (!fromTop) {
            bone.image.flipY()
        }
    }
}

// Example player sprite
let heart = sprites.create(img`
    . . . . . . . .
    . . . 2 2 . . .
    . 2 2 4 4 2 2 .
    . 2 4 5 5 4 2 .
    . 2 4 5 5 4 2 .
    . 2 2 4 4 2 2 .
    . . 2 2 2 2 . .
    . . . 2 2 . . .
`, SpriteKind.Player)
heart.setPosition(80, 80)
controller.moveSprite(heart, 60, 60)
heart.setFlag(SpriteFlag.StayInScreen, true)
// player
let box = sprites.create(image.create(80, 60), SpriteKind.Food)
box.image.drawRect(0, 0, 80, 60, 1)
box.setPosition(80, 80)

showUndertaleTextBubble("you feel like you're going to have a bad time", box.x, box.y - box.height / 2 - 10)


// ⛓ Keep heart inside box
game.onUpdate(function () {
    let minX = box.x - box.width / 2 + heart.width / 2
    let maxX = box.x + box.width / 2 - heart.width / 2
    let minY = box.y - box.height / 2 + heart.height / 2
    let maxY = box.y + box.height / 2 - heart.height / 2

    if (heart.x < minX) heart.x = minX
    if (heart.x > maxX) heart.x = maxX
    if (heart.y < minY) heart.y = minY
    if (heart.y > maxY) heart.y = maxY
})
// Collision
sprites.onOverlap(SpriteKind.Player, SpriteKindCustom.Attack, function (player, bone) {
    bone.destroy()
    info.changeLifeBy(-1)
})

// Spawn wave every 3 seconds
game.onUpdateInterval(3000, function () {
    spawnVerticalBoneWaves()
})

