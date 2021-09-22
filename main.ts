namespace SpriteKind {
    export const GhostTarget = SpriteKind.create()
    export const Decoration = SpriteKind.create()
    export const Timer = SpriteKind.create()
    export const Plane = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    inGameLevel = false
    clearTime = game.runtime() - startTime
    if (blockSettings.exists("level" + currentLevelIndex + "times")) {
        times = blockSettings.readNumberArray("level" + currentLevelIndex + "times")
    } else {
        times = []
    }
    didInsert = false
    for (let index = 0; index <= times.length - 1; index++) {
        if (clearTime < times[index]) {
            times.insertAt(index, clearTime)
            didInsert = true
            break;
        }
    }
    if (!(didInsert)) {
        times.push(clearTime)
    }
    if (times.length > 3) {
        times.pop()
    }
    blockSettings.writeNumberArray("level" + currentLevelIndex + "times", times)
    if (clearTime <= times[0]) {
        blockSettings.writePositionBuffer("level" + currentLevelIndex + "x", recordedXPositions)
        blockSettings.writePositionBuffer("level" + currentLevelIndex + "y", recordedYPositions)
    }
    ghostTarget.destroy()
    playerGhost.destroy()
    thePlayer.destroy()
    fakePlayer = sprites.create(thePlayer.image, SpriteKind.Decoration)
    fakePlayer.lifespan = 4000
    tiles.placeOnTile(fakePlayer, location)
    animation.runImageAnimation(
    fakePlayer,
    [img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . c c . . . 
        . . . c 1 4 . . 
        . . . c c . . . 
        . . b b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . 4 . 4 . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . . c c . 
        . . . . . c 1 4 
        . . . . . c c . 
        . c b b b b 6 . 
        . c b b b b c . 
        . . c b b c . . 
        . . 4 c c . . . 
        . . 4 . 4 . . . 
        `],
    100,
    true
    )
    animation.runMovementAnimation(
    fakePlayer,
    "h 80",
    4000,
    false
    )
    tiles.setTileAt(location, assets.tile`myTile24`)
    timer.after(3000, function () {
        mySprite = sprites.create(img`
            ................................................................................................................................................................
            .............................................aaaaaaaaaaaa.......................................................................................................
            ............................................aaaaaaaaaaaaaa...........................................aaaaaaaaaaaa...............................................
            ...........................................aaa11aaaaaaaaaaa.........................................aaaaaaaaaaaaaa..............................................
            ..........................................aaaa1aaaaaaaaaaaaa.......................................aaaaaa1111aaaaaa.............................................
            ..........................................aaa11aaaaaaaaaaaaa......................................aaaa111aaaaaaaaaaa............................................
            .........................................aaa11aaaaaaaaaaaaaaaa.......aaaa.........................aaa11aaaaaaaaaaaaa...............aaaa.........................
            ..........aaaa...........................aaa1aaaaaaaaaaaaaaaaa.....aaaaaaaa......................aaa11aaaaaaaaaaaaaaaa............aaaaaa........................
            .........aaaaaa..........................aa1aaaaaaaaaaaaaaaaaaa...aaaaaaaaa...........aa.........aa11aaaaaaaaaaaaaaaaa...........aa11aaaa.......................
            ........aaaaaaaa........................aaaaaaaaaaaaaaaaaaaaaaa...aaa1aaaaaa........aaaaaaaa.....aaaaaaaaaaaaaaaaaaaaaa.........aaa1aaaaaa......................
            .......aaa11aaaaa.......................aaaaaaaaaaaaaaaaaaaaaaa...aa11aaaaaa........aaaaaaaaa...aaaaaaaaaaaaaaaaaaaaaaa........aaaaaaaaaaa......................
            ......aaa11aaaaaa.......................aaaaaaaaaaaaaaaaaaaaaaa...aa1aaaaaaa.......aa111aaaaa...aaaaaaaaaaaaaaaaaaaaaaa........aaaaaaaaaaa......................
            ......aa11aaaaaaa.......................aaaaaaaaaaaaaaaaaaaaaaa...aaaaaaaaaa.......aa1aaaaaaa...aaaaaaaaaaaaaaaaaaaaaaa........aaaaaaaaaaa......................
            ......aa1aaaaaaaa.......................aaaaaaaaaaaaaaaaaaaaaaa...aaaaaaaaaa.......aaaaaaaaaa...aaaaaaaaaaaaaaaaaaaaaaa........aaaaaaaaaaa......................
            ......aa1aaaaaaaa.......................aaaaaaaaaaaaaaaaaaaaaaa...aaaaaaaaaa.......aaaaaaaaaa...aaaaaaaaaaaaaaaaaaaaaaa........aaaaaaaaaaa......................
            ......aaaaaaaaaaa.......................aaaaaaaaaaaaaaaaaaaaaaa...aaaaaaaaaaa.....aaaaaaaaaaa...aaaaaaaaaaaaaaaaaaaaaaa.........aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaaa...aaaaaaaa....aaaaaaaaaaa.....aaaaaaaaaaa...aaaaaaaaaaaaaaaaaaaaaaa.........aaaaaaaaa.......................
            .......aaaaaaaaa........................aaaaaaaaaa......aaaaa.....aaaaaaaaaaa.....aaaaaaaaaa....aaaaaaaaaaa...aaaaaaaa..........aaaaaaaaa.......................
            .......aaaaaaaaa........................aaaaaaaaaa................aaaaaaaaaaaa....aaaaaaaaaa....aaaaaaaaaa......aaaaa...........aaaaaaaaa.......................
            .......aaaaaaaaa........................aaaaaaaaa..................aaaaaaaaaaa....aaaaaaaaaa....aaaaaaaaaa......................aaaaaaaaa.......................
            .......aaaaaaaaa........................aaaaaaaaa...................aaaaaaaaaa....aaaaaaaaaa....aaaaaaaaa.......................aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaa...................aaaaaaaaaa....aaaaaaaaaa....aaaaaaaaa.......................aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaa...................aaaaaaaaaa...aaaaaaaaaa....aaaaaaaaa.......................aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaaaaaaaaa............aaaaaaaaaaa..aaaaaaaaaa....aaaaaaaaaa......................aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaaaaaaaaa.............aaaaaaaaaa..aaaaaaaaaa....aaaaaaaaaaaaaaaaa...............aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaaaaaaaaaa............aaaaaaaaaaa.aaaaaaaaaa....aaaaaaaaaaaaaaaaa...............aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaaaaaaaaaa............aaaaaaaaaaaaaaaaaaaaa.....aaaaaaaaaaaaaaaaaa..............aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaaaaaaaaaa.............aaaaaaaaaaaaaaaaaaaa.....aaaaaaaaaaaaaaaaaa..............aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaaaaaaaaaa.............aaaaaaaaaaaaaaaaaaaa.....aaaaaaaaaaaaaaaaaa..............aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaaaaaaaaa...............aaaaaaaaaaaaaaaaaaa.....aaaaaaaaaaaaaaaaaa..............aaaaaaaaaa......................
            .......aaaaaaaaaa.......................aaaaaaaaaaaaaaaa................aaaaaaaaaaaaaaaaaaa.....aaaaaaaaaaaaaaaaa..............aaaaaaaaaaa......................
            ......aaaaaaaaaaa.......................aaaaaaaaaaaaaa...................aaaaaaaaaaaaaaaaaa.....aaaaaaaaaaaaaaaa...............aaaaaaaaaaa......................
            ......aaaaaaaaaaa.......................aaaaaaaaaaa......................aaaaaaaaaaaaaaaaaa.....aaaaaaaaaaaaaa.................aaaaaaaaaaa......................
            ......aaaaaaaaaaa........................aaaaaaaaaa.......................aaaaaaaaaaaaaaaaa.....aaaaaaaaaaa....................aaaaaaaaaaa......................
            ......aaaaaaaaaaa........................aaaaaaaaaa.......................aaaaaaaaaaaaaaaaa......aaaaaaaaaa....................aaaaaaaaaaa......................
            ......aaaaaaaaaaa........................aaaaaaaaaa........................aaaaaaaaaaaaaaaa......aaaaaaaaaa....................aaaaaaaaaaa......................
            ......aaaaaaaaaaa........................aaaaaaaaaaa.......................aaaaaaaaaaaaaaaa......aaaaaaaaaa...................aaaaaaaaaaaaa.....................
            .....aaaaaaaaaaaaa.......................aaaaaaaaaaa.......................aaaaaaaaaaaaaaaa......aaaaaaaaaaa..................aaaaaaaaaaaaa.....................
            .....aaaaaaaaaaaaa........................aaaaaaaaaaaaaaaaaaaaaaa...........aaaaaaaaaaaaaaa......aaaaaaaaaaa..................aaaaaaaaaaaaaa....................
            .....aaaaaaaaaaaaaa.......................aaaaaaaaaaaaaaaaaaaaaaaa...........aaaaaaaaaaaaa........aaaaaaaaaaaaaaaaaaaaaaa.....aaaaaaaaaaaaaaa...........aa......
            .....aaaaaaaaaaaaaaa...........aaaaaa.....aaaaaaaaaaaaaaaaaaaaaaaaa...........aaaaaaaaaaaa........aaaaaaaaaaaaaaaaaaaaaaaa....aaaaaaaaaaaaaaaa......aaaaaaa.....
            .....aaaaaaaaaaaaaaaa......aaaaaaaaaaa....aaaaaaaaaaaaaaaaaaaaaaaaa............aaaaaaaaaaa........aaaaaaaaaaaaaaaaaaaaaaaaa...aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...
            .....aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaaaaaaaaaaa............aaaaaaaaaaa........aaaaaaaaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...
            ....aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaaaaaaaaaaa.............aaaaaaaa..........aaaaaaaaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...
            ....aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...aaaaaaaaaaaaaaaaaaaaaaa..............aaaaaaaa..........aaaaaaaaaaaaaaaaaaaaaaaaa..aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...
            ....aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa....aaaaaaaaaaaaaaaaaaaaaa................aaaaaa............aaaaaaaaaaaaaaaaaaaaaaa...aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa....
            ....aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa......aaaaaaaaaaaaaaaaaaaa.................aaaaaa............aaaaaaaaaaaaaaaaaaaaaa.....aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa....
            .....aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...........aaaaaaaaaaaaaaa.....................aaaa..............aaaaaaaaaaaaaaaaaaaa......aaaaaaaaaaaaaaaaaaaaaaaaaaaa......
            .....aaaaaaaaaaaaaaaaaaaaaaaaaaaaa...............aaaaaa...............................................aaaaaaaaaaaaaaa.........aaaaaaaaaaaaaaaaaaaaaaaaaaaa......
            .....aaaaaaaaaaaaaaaaaaaaaaaaaaa.........................................................................aaaaaa................aaaaaaaaaaaaaaaaaaaaaaaa.........
            ......aaaaaaaaaaaaaaaaaaaaaaaa..................................................................................................aaaaaaaaaaaaaaaaaaa.............
            .......aaaaaaaaaaaaaaaaaa............................................................................................................aaaaa......................
            ............aaaaa...............................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            .................................................................................................................................444............................
            ..............................................................................................................................44444444..........................
            ..........................................................................................................444................4444444444.........................
            .......................................4444............................................................4444444..............44444444444.........................
            ......................................444444................................444444....................444444444...........44441144444444........................
            .....................................44444444...........................44444444444..................4444444444..........444414444444444........................
            .....................................44444444........................444444444444444................444411444444........4444144444444444...........44444........
            ...............4444444...............444114444......................44441111144444444..............44441444444444.......4441444444444444..........444444........
            .............444444444444...........4441444444.....................4444144444444444444............4444144444444444......44414444444444444.........4414444.......
            ............444411114444444........444414444444....................44414444444444444444...........4441444444444444......44444444444444444.........4144444.......
            ............44114444444444444......444144444444...................4444444444444444444444.........44441444444444444......44444444444444444.........4444444.......
            ...........44144444444444444444....444144444444...................4444444444444444444444........4444444444444444444.....44444444..4444444.........4444444.......
            ..........441444444444444444444....444444444444...................4444444444444444444444........4444444444444444444.....44444444..4444444.........44444444......
            ..........414444444444444444444....444444444444...................444444444444444444444.........4444444444444444444.....4444444...4444444.........44444444......
            .........4444444444444444444444...4444444444444...................444444444444444444444........444444444444444444444....4444444...4444444.........44444444......
            .........4444444444444444444444...4444444444444...................44444444444444444444.........444444444444444444444....4444444...444444..........44444444......
            .........4444444444444444444444...4444444444444...................44444444444....444...........444444444444444444444.....444444...444444..........44444444......
            ........444444444444444444444.....4444444444444...................4444444444..................44444444444444444444444....44444444444444...........44444444......
            ........444444444444444...........4444444444444...................4444444444..................4444444444....444444444....44444444444444............4444444......
            ........4444444444444.............4444444444444...................4444444444..................4444444444....444444444....44444444444444............4444444......
            ........4444444444444.............4444444444444...................4444444444..................444444444.....444444444....4444444444444.............4444444......
            ........444444444444..............4444444444444...................44444444444.................444444444.....4444444444...444444444444..............4444444......
            ........444444444444..............4444444444444...................4444444444444444............44444444......4444444444...444444444444444...........4444444......
            ........444444444444..............444444444444....................4444444444444444............44444444....444444444444....444444444444444..........4444444......
            ........444444444444..............444444444444....................4444444444444444............444444444444444444444444....4444444444444444..........444444......
            ........444444444444..............444444444444....................4444444444444444............444444444444444444444444....4444444444444444..........444444......
            ........444444444444..............444444444444....................4444444444444444............444444444444444444444444....44444444444444444.........444444......
            ........444444444444...............44444444444....................4444444444444444............444444444444444444444444.....4444444444444444..........44444......
            ........4444444444444..............444444444444...................4444444444444444............444444444444444444444444.....4444444444444444.....................
            ........44444444444444.............444444444444444......4444......444444444444444.............444444444444444444444444.....4444444444444444.....................
            .........44444444444444............4444444444444444444444444......4444444444..................444444444...444444444444.....4444444444444444.....................
            .........4444444444444444444.......4444444444444444444444444......4444444444.........444......44444444.....44444444444.....4444444...444444.....................
            .........444444444444444444444.....4444444444444444444444444......4444444444.......444444.....44444444......4444444444.....4444444....444444....................
            .........444444444444444444444.....4444444444444444444444444......44444444444444444444444.....44444444......4444444444.....4444444....444444........4444........
            ..........44444444444444444444.....444444444444444444444444.......44444444444444444444444.....44444444.......44444444......4444444....444444.......441444.......
            ...........4444444444444444444......444444444444444444444.........444444444444444444444444....44444444.......44444444......4444444....444444.......4144444......
            ............44444444444444444........4444444444444444444..........444444444444444444444444....44444444.......44444444......4444444....444444.......4144444......
            .............4444444444444444..........4444444444444444.............4444444444444444444444....44444444........444444.......4444444....444444.......4444444......
            ..............444444444444444............44444444444.................44444444444444444444.....44444444..........444........4444444....444444.......4444444......
            ...............4444444444444..............444........................44444444444444444444.....4444444.......................444444.....444..........44444.......
            .................444444444...........................................4444444444444444444......4444444.......................44444...............................
            ......................................................................44444444444444444........44444............................................................
            .......................................................................4444444444444............................................................................
            .........................................................................444444.................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `, SpriteKind.Decoration)
        mySprite.setFlag(SpriteFlag.RelativeToCamera, true)
        mySprite.setFlag(SpriteFlag.AutoDestroy, true)
        mySprite.setFlag(SpriteFlag.Ghost, true)
        pause(2000)
        mySprite.vy = -100
        if (darkMode) {
            scoreBG = sprites.create(img`
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaa
                affffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffaaaaaaaaaaaaa
                fffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffaaaaaaaaaaaa
                ffffffffffffffaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffffffaaaaaaaaaaaaaaaaffffffffffffffffffffffffaaaaaaaaaaa
                fffffffffffffffaaaaaaaaaaaaaaaaaaaaaffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffaaaaaaaaaaaaffffffffffffffffffffffffffffaaaaaaaaa
                fffffffffffffffffaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffaaaaaaffffffffffffffffffffffffffffffffffffaaaaaffffffffffffffffffffffffffffffffffffffff
                fffffffffffffffffffaaaaaaaaaaaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                `, SpriteKind.Decoration)
        } else {
            scoreBG = sprites.create(img`
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333999999333333333333333333333333333333333333399999993333333333333333333
                3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333999999999999333333333333333333333333333333999999999999999333333333333333
                3333333333333333333333333333333333333333333333339999999993333333333333333333333333333339999999999999999333333333333333333333333339999999999999999933333333333333
                3999999999933333333333333333333333333333399999999999999999333333333333333333333333333999999999999999999993333333333333333333333399999999999999999993333333333333
                9999999999999333333333333333333333333339999999999999999999999333333333333333333333333999999999999999999999933333333333333333333999999999999999999999333333333333
                9999999999999933333333333333333333333999999999999999999999999933333333333333333333333999999999999999999999999333333333333333399999999999999999999999933333333333
                9999999999999993333333333333333333339999999999999999999999999999993333333333333333339999999999999999999999999993333333333339999999999999999999999999999333333333
                9999999999999999933333333333333399999999999999999999999999999999999999999333333999999999999999999999999999999999999333339999999999999999999999999999999999999999
                9999999999999999999333333333339999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
                `, SpriteKind.Decoration)
        }
        scoreBG.setFlag(SpriteFlag.RelativeToCamera, true)
        scoreBG.setFlag(SpriteFlag.Ghost, true)
        scoreBG.top = 120
        moveTo(scoreBG, 80, 60, 100, true)
        createHighScoreEntry(-1, "top times")
        for (let index = 0; index <= times.length - 1; index++) {
            createHighScoreEntry(index, formatTime(times[index]))
        }
        pause(1000)
        pressAForNext = sprites.create(img`
            .111111111111111111111111111111111.
            1111ccc1ccc1ccc11cc11cc11111c111111
            1111c1c1c1c1c111c111c111111c1c11111
            1111ccc1ccc1cc111c111c11111ccc11111
            1111c111cc11c11111c111c1111c1c11111
            1111c111c1c1ccc1cc11cc11111c1c11111
            11111111111111111111111111111111111
            11111111111111111111111111111111111
            11ccc1ccc1ccc111c111c1ccc1c1c1ccc11
            11c111c1c1c1c111cc11c1c111c1c11c111
            11cc11c1c1ccc111c1c1c1cc111c111c111
            11c111c1c1cc1111c11cc1c111c1c11c111
            11c111ccc1c1c111c111c1ccc1c1c11c111
            .111111111111111111111111111111111.
            ...................................
            ...................................
            `, SpriteKind.Decoration)
        pressAForNext.setFlag(SpriteFlag.RelativeToCamera, true)
        pressAForNext.setFlag(SpriteFlag.Ghost, true)
        pressAForNext.bottom = 118
        pressAForNext.right = 158
        waitingForA = true
    })
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (inGameLevel) {
        if (tiles.tileAtLocationEquals(location, assets.tile`myTile7`) || (tiles.tileAtLocationEquals(location, assets.tile`myTile8`) || tiles.tileAtLocationEquals(location, assets.tile`myTile9`))) {
            if (thePlayer.isHittingTile(CollisionDirection.Top) && tiles.locationXY(location, tiles.XY.row) == tiles.locationXY(tiles.locationOfSprite(thePlayer), tiles.XY.row) - 1) {
                tiles.setWallAt(location, false)
                tiles.setTileAt(location, assets.tile`transparency8`)
                for (let index = 0; index < 4; index++) {
                    if (Math.percentChance(50)) {
                        brickParticle = sprites.create(img`
                            . c 
                            c b 
                            `, SpriteKind.Decoration)
                    } else {
                        brickParticle = sprites.create(img`
                            b b 
                            c . 
                            `, SpriteKind.Decoration)
                    }
                    spriteutils.setVelocityAtAngle(brickParticle, spriteutils.degreesToRadians(randint(240, 300)), randint(100, 90))
                    brickParticle.ay = gravity
                    brickParticle.setFlag(SpriteFlag.AutoDestroy, true)
                    tiles.placeOnTile(brickParticle, location)
                    brickParticle.x += randint(-4, 4)
                    brickParticle.y += randint(-4, 4)
                }
            }
        } else if (tiles.tileAtLocationEquals(location, assets.tile`myTile10`) || (tiles.tileAtLocationEquals(location, assets.tile`myTile11`) || tiles.tileAtLocationEquals(location, assets.tile`myTile12`))) {
            if (thePlayer.isHittingTile(CollisionDirection.Bottom) && tiles.locationXY(location, tiles.XY.row) == tiles.locationXY(tiles.locationOfSprite(thePlayer), tiles.XY.row) + 1) {
                controller.moveSprite(thePlayer, moveSpeed / 2, 0)
            }
        } else {
            controller.moveSprite(thePlayer, moveSpeed, 0)
        }
    }
})
function loadMap () {
    tiles.destroySpritesOfKind(SpriteKind.Plane)
    tiles.loadMap(tiles.copyMap(levels[currentLevelIndex]))
    for (let tiles2 of [
    assets.tile`myTile7`,
    assets.tile`myTile8`,
    assets.tile`myTile9`,
    assets.tile`myTile10`,
    assets.tile`myTile11`,
    assets.tile`myTile12`,
    assets.tile`myTile14`,
    assets.tile`myTile15`,
    assets.tile`myTile16`,
    assets.tile`myTile`
    ]) {
        for (let value of tiles.getTilesByType(tiles2)) {
            tiles.setWallAt(value, true)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile13`)) {
        tiles.setWallAt(value, false)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile25`)) {
        tiles.setWallAt(value, false)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile26`)) {
        tiles.setWallAt(value, false)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile27`)) {
        tiles.setWallAt(value, false)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        createPlane(0, tiles.locationXY(value, tiles.XY.x), tiles.locationXY(value, tiles.XY.y))
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        createPlane(1, tiles.locationXY(value, tiles.XY.x), tiles.locationXY(value, tiles.XY.y))
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        createPlane(2, tiles.locationXY(value, tiles.XY.x), tiles.locationXY(value, tiles.XY.y))
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
        createPlane(3, tiles.locationXY(value, tiles.XY.x), tiles.locationXY(value, tiles.XY.y))
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    if (sprite.bottom > tiles.locationXY(location, tiles.XY.top) + 2) {
        reloadCheckpoint()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (onStartScreen) {
        onStartScreen = false
    } else if (inGameLevel) {
        if (inPlane) {
            doPlaneLaunch()
        } else if (thePlayer.isHittingTile(CollisionDirection.Bottom)) {
            thePlayer.vy = jumpVelocity
        }
    } else if (waitingForA) {
        waitingForA = false
        tiles.destroySpritesOfKind(SpriteKind.Timer)
        pressAForNext.destroy()
        scoreBG.destroy()
        currentLevelIndex += 1
        if (currentLevelIndex < levels.length) {
            startLevel(currentLevelIndex)
        } else {
            game.over(true)
        }
    }
})
function showTitleScreen () {
    if (darkMode) {
        scene.setBackgroundImage(img`
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffff55ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffff55fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffff555ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffff5ffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111111111111111fffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111111111111111111ffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5ffffffff11111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffff111111111111111111111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffff1ffffffff
            ffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffffffff1111111111111111111111111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1111111111111111111111111111111111ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111111111111111111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111111111111111111111111111111ffffffff55fffffffffffffffffffffffffffffffffffffffffffff
            ffffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111111118888888111111111111111111ffffffff55fffffffffffffffffffffffffffffffffffffffffffff
            fbbbbbbfbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111111888886666666888811111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fb55bbbfbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111188666666666666666688111111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fbbbb5bfbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111f66666666666666666666811111111111fffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fbbbb5bbbbffffffffbbbbbfffffffffffffffffffffffffffffffffffffffffffffff1f886666666666666666666811111111111ffffffffffffffffffffffffffffffffffffbfffffffffbbbffffff
            fb55bbbbbbffffffffbbbbbfffffffffffffffffffffffffffffffffffffffffffffff1f88666666666666666666881111111111ffffffffffffffffffffffffffffffffffffbbfffffffffbbbffffff
            fbbbbbbbbbffbffbffbbbbbfffffffffffffffffffffffffffffffffffffffffffffff1f88866666666666666688881111111111ffffffffffffffffffffffffffffffffffffbbfffffffffbbbffffff
            bb5555bbbbbbbfbbbfbbbbbfffffffffffffffffffffffffffffffffffffffffffffffff88888888888888888888881111111111ffffffffffffffffffffffffffffffffffbbbbbbbfffffbbbbbfffff
            bbbbbbbbbbbbbfbbbffbb5bffffffffffffffffffffffffffffffffffffffffffffffffff888888888888888888f81111111111fffffffffffffffffffffffffffffffffffbbbbbbbfffffbbbbbfffff
            bbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffffffffffffffffffff8888888888888f8fff8111111111ffffffffffffffffffffffffffffffffffffbbbbbbbfffffbbbbbfffff
            bbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffffffffffff5fffffffffffffffffffff1ffff888888888888888881111111ffffffffffffffffffffffffffffffffffffbbbbbbbffffbbbbbbbbfff
            bbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffff888888888888888811111fffffffffffffffffffffffffffffffffffffbbbbbbbffffbbbbbbbbfff
            bbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88888888888888111ffffffffffffffffffffffffffffffbbbbffffbbb5bbbffffbbbbbbbbfff
            bbbbbbbbbbb555bbbb5bb5bfffffffffffffffffbbfffffffffffffffffffffffffffffffffffffffffff88888888888111fffffffffffffffffffffffffffffffbbbbffffbbb5bbbffffbbbbbbbbfff
            bbbbbbbbbbbb55bbbbbbbbbfffffbbbfffffffffbbbfffffffffffffffffffffffffffffffffccfffffffffffff111111ffffffffffffffffffffffffffffffffbbbbbbfffbbbbbbbffffbbbbbbbbfff
            bbbbbbbbbbbbbbbbbbbbbbbfffffbbbfffffffffbbbfffffffffffffffffffffffffffffffffcccffffffffffff11111fffffffffffffffffffffffffffffffffbbbbbbfffbbb5bbbffffbbbbbbbbfff
            bbbbbbbbbbb5bbbbbbbbbbbfffbbbbbbbffffffbbbbbffffffffffffffffffffffffffffffffccccccffffffffee1ffffffffffffffffffffffffffffffffffffbbbbbbbffbbbbbbbffbbbbbbbbbbbbb
            bbbbbbbbbbb555bbbbbbbbbfffbbbbbbbffffffbbbbbfffffffffffffffffffffffffffffffcccccccccccf44444eefffffffffffffffffffffffffffffffffffbbbbbbbffbbbb5bbffbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbffffffbbbbbfffffffffffffffffffffffffffffffcccccccccccf4444444eeefffffffffffffffffffff5ffffffffffbbbbbbbffbbbbbbbffbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbfffb55bbbbfffffbbbbbbbfffffffffffffffffffffffffffffcccccccccccccf444444444eeffffffffffffffffffffffffffffffbbbbbbbffbbbbbbbffbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbfffffbbbbbbbfffffffffffffffffffffffffffffccccccccccccccffe44444444efffffff5fffffffffffffffffffffbbbbbbbffbbbbbbbffbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbb5bbfffb5bbbbbfffffbbbbbbbfffffffffffffffffffffffffffffccccccccccccccccfeeeeeeeeffffffffffffffffffffffffffffffbbbbbbbffbbbbbbbffbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbfffffbbbbbbbffffffffffffffffffffffffffffcccccccccccccccccfffffffffffffffffffffffffffffffffffffffbbbbbbbffbbbb5bbffbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbfffffbbbbbbbffffffffffffffffffffffffffffcccccccccccccccccfffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbffbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbfffffbbbbbbbfffffffffbbfffffffffffffffffccccccccccccccccccffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbfffbbbbbbbbbbfbbffffbbbbbbbbbfffffffffffccccccccccccccccccffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbffbb5bbbbfffbbbbbbbbbbbbbffffbb5bbb5bbfffffffffffccccccccccccccccccfffffffffffffffffffffff1fffff1ffffffffbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbfffbbbbbbbbbbb5bffffbbbb5b55bfffffffffffccccccccccccccccccffffffffffffffffffffffffffff1fffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbfffbbbbbbbbbbbbbffffbbbbbbbbbfffffffffffccccccccccccccccccffffffffffffccccccccfffff1111fffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbfffbbbbbbbbbbb5bffffbbbbbbbbbfffffffffffccccccccccccccccccffffffffffffccccceeeeeffff111fffffffffbb5bbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbfffbbbbbbbbbbbbbbbfbbb5bbbbbbffffffffffcccccccccccccccccccffffffffffffceeee11dddefffff111fffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbfffbbbbbbbbbbbbbbbfbbbbbbbbbbffffffffffcccccccccccccccccccfffffeeeeeeee11111dddddeffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbfbbbbbbbbbbffffffffffcccccccccccccccccccfeeee1111111111111ddddddeccff1ffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbfbbbbbbbbbbffffffffffcccccccccccccccccccf11111111111111111ddcccc222cddffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbfbbbbbbbbbbffffffffffccccccccccccccccccccf11111111111111cccc2222222cddffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbfbbbbbbbbbbffffffffffccccccccccccccccccccf1111111111cccc22222222222cddffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbfbbbbbbbbbbffffffffffccccccccccccccccccccf11111111cc2222222222222222cdffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbfbbbbbbbbbbffffffffff66ccccccccccccccccccf1111111c2222222222cc222222cdffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffff6666ccccccccccccccccf1111111c222222ccccddc222222cffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffff666666ccccccccccccccf1111111c22cccc11ddddc2222ccbffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffff6666666666ccccccccccf11111111cc1111111dddc22ccebbfffffbffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffff6666666666666cccccccf11111111111111111ddddccdddebfbbfbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffff66666fff666666666666811111111111111111ddddddddebbfbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffff6666fff6666666666668111111111111111111ddddddebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffff6ffff6666666666668111111111111111111dddddebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffff6666666666c81111111111111111111ddddebbbbbbbbbb5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffffffffccccccccccccf1111111111111111111ddebbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffffffffcccccccccccccf11111111111111111eeebbbbbbb55b5b5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbffcffffffffffffffffffccccccccccccccf11111111111ccceebbbbbbbbbbbbb5b5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbffccfffbbbbbbbffffffffccccccccccccccf111111ccccceecbbbbbbbbbbbbbbbbb5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbffbbbcbbbbbbbbbbbffffffcccccccccccccf111eeeeceeeeeecbbbbbbbbbbbbb5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbcffffffcccccccccccfeeebbbbceeeeeecbbbbbbbbbbbb55b5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbcffffcccccccccccfbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbcfffcccccccccccccfbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbbbbbbbbcffccccccccccccccfbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbbbbbbbbbcffccccccccccccccfbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbbbbbffffccccccccccccccfbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbbbbbbbbbbbffffccccccccccccccfbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbbbbbbbbbbbbffffccccccccccccccfbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffbbbbbbbbbbbbbbbbbbbbbbbbbffffffccfccccfcccccfbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffcbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffccffccccccfbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffcccbbbbbbbbbbbbbbbbbbbbbbbffffffffcccffccccccfbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffccccccbbbbbbbbbbbbbbbbbbbbfffffffcccccffffccccfbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffcccccccccbbbfbbbbbbbbbbbbfffffffcccccccffcccccfbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffcccccccccbbfbbbbbbbbbbbbbffffffcccccccccccccccfbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffccccccbbbbbfbbbbbbbbbbbbffffffccccccccccccccccfbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffccffbbbbbffbbbfbbbbbbbffffffccccccccffcccccccfbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffbbbbbbfffffbbbbbbbbffffffcccccccffccccccccfbbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffbbbbbbbffbbbbbbbbbfffffffccccccffcccccccccfbbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffcbbbbbbbbbbbbbbbbcffffffffccccccfffccfcccccfbbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffffffcbbbbbbbbbbbbbbbcfffffffffcccccccffffcccccfbbbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffcbbbbbbbbbbbccfffffffffffffccccccccccccccfbbbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffffffffffffffcbbbbbbbbbcccfffffffffffffffffcccccccccccfbbbbbbbbbbbceeeeeecbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            `)
        mySprite = sprites.create(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ......................cccccccccccccc........ccc........ccccccccccccccc.....cccccccccccccccc......ccccccccccccccccc.......ccc............ccc.....................
            ......................cccccccccccccccc......ccc.......cccccccccccccccc.....cccccccccccccccc.....ccccccccccccccccccc.....ccccc...........ccc.....................
            ......................ccccccccccccccccc.....ccc.....cccccccccccccccccc.....cccccccccccccccc....ccccccccccccccccccccc...ccccccc..........ccc.....................
            ......................cccfffffffffccccc.....ccc.....ccccc..................cccc................ccccfffffffffffffcccc...cccccccc.........ccc.....................
            ......................cccfffffffffffccc.....ccc.....cccc...................cccc................cccfffffffffffffffccc...ccccccccc........ccc....ccc..............
            ......................cccfffffffffffccc.....ccc.....ccc....................cccc................cccfffffffffffffffccc...ccc..ccccc.......ccc....ccc..............
            ......................cccfffffffffccccc.....ccc.....ccc....................cccc................cccfffffffffffffffccc...ccc...cccccc.....ccc....ccc..............
            ......................ccccccccccccccccc.....ccc.....ccc...cccccccccccc.....ccccccccccccc.......cccfffffffffffffffccc...ccc....cccccc....ccc.....................
            ......................cccccccccccccccc......ccc.....ccc...cccccccccccc.....ccccccccccccc.......cccfffffffffffffffccc...ccc.....cccccc...ccc.....................
            ......................cccccccccccc..........ccc.....ccc...cccccccccccc.....ccccccccccccc.......cccfffffffffffffffccc...ccc.......ccccc..ccc.....................
            ......................ccc...................ccc.....ccc............ccc.....cccc................cccfffffffffffffffccc...ccc........ccccccccc....ccc..............
            ......................ccc...................ccc.....cccc...........ccc.....cccc................cccfffffffffffffffccc...ccc.........cccccccc....ccc..............
            ......................ccc...................ccc.....ccccc..........ccc.....cccc................ccccfffffffffffffcccc...ccc..........ccccccc....ccc..............
            ......................ccc...................ccc......ccccccccccccccccc.....cccccccccccccccc....ccccccccccccccccccccc...ccc...........cccccc.....................
            ......................ccc...................ccc......ccccccccccccccccc.....cccccccccccccccc.....ccccccccccccccccccc....ccc............ccccc.....................
            ......................ccc...................ccc........ccccccccccccccc.....cccccccccccccccc......ccccccccccccccccc.....ccc.............ccc......................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ......................cccccccc.....ccccccc...cc........cc....cc.........c.....cccccccc...ccccccc......cccccc......cc.....c...ccccccc...cccccccc.................
            ......................ccffffffc...cc.........cc........cc....cc.........c....cc..........cc.....c....ccfffffc....cc.c....c..cc........cc........................
            ......................ccfffffffc..cc.........cc........cc....cc.........c....cc..........cc.....c....ccfffffc....cc..c...c..cc........cc........................
            ......................ccfffffffc..ccccc......cc........cc.....cc.......c.....ccccc.......ccccccc....cccccccccc...cc...c..c..cc........ccccc.....................
            ......................ccffffffc...cc.........cc........cc......ccc...cc......cc..........cc.....c...cc.......c...cc....c.c..cc........cc........................
            ......................cccccccc....cccccccc...cccccccc..cc........cccc........ccccccccc...cc......c..cc.......c...cc.....c....ccccccc..ccccccccc.................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................8888888.........................................................................
            ...........................................................................8888866666668888.....................................................................
            .........................................................................88666666666666666688...................................................................
            ........................................................................f666666666666666666668..................................................................
            .......................................................................f8866666666666666666668..................................................................
            .......................................................................f8866666666666666666688..................................................................
            .......................................................................f8886666666666666668888..................................................................
            .......................................................................f8888888888888888888888..................................................................
            ........................................................................f888888888888888888f8...................................................................
            .........................................................................f8888888888888f8fff8...................................................................
            ..........................................................................ffff88888888888888888.................................................................
            ..........................................................................ffffff8888888888888888................................................................
            .........................................................................ffffffffff88888888888888...............................................................
            .........................................................................ffffffffffff88888888888................................................................
            .........................................................................fffccfffffffffffff.....................................................................
            ........................................................................ffffcccffffffffffff.....................................................................
            ........................................................................ffffccccccffffffffee....................................................................
            .......................................................................ffffcccccccccccf44444ee..................................................................
            .......................................................................ffffcccccccccccf4444444eee...............................................................
            .......................................................................fffcccccccccccccf444444444ee.............................................................
            ......................................................................ffffccccccccccccccffe44444444e............................................................
            ......................................................................ffffccccccccccccccccfeeeeeeee.............................................................
            ......................................................................fffcccccccccccccccccf.....................................................................
            .....................................................................ffffcccccccccccccccccf.....................................................................
            .....................................................................ffffccccccccccccccccccf....................................................................
            .....................................................................ffffccccccccccccccccccf....................................................................
            .....................................................................ffffccccccccccccccccccf......................1.....1.......................................
            ....................................................................fffffccccccccccccccccccf...........................1........................................
            ....................................................................fffffccccccccccccccccccf........................1111........................................
            ....................................................................fffffccccccccccccccccccf................eeeee....111........................................
            ....................................................................ffffcccccccccccccccccccf............eeee11ddde.....111......................................
            ...................................................................fffffcccccccccccccccccccf....eeeeeeee11111ddddde.............................................
            ...................................................................fffffcccccccccccccccccccfeeee1111111111111ddddddecc..1.......................................
            ...................................................................fffffcccccccccccccccccccf11111111111111111ddcccc222c.........................................
            ..................................................................ffffffccccccccccccccccccccf11111111111111cccc2222222c.........................................
            ..................................................................ffffffccccccccccccccccccccf1111111111cccc22222222222c.........................................
            ..................................................................ffffffccccccccccccccccccccf11111111cc2222222222222222c........................................
            ..................................................................ffffff66ccccccccccccccccccf1111111c2222222222cc222222c........................................
            .................................................................fffffff6666ccccccccccccccccf1111111c222222ccccddc222222c.......................................
            .................................................................fffffff666666ccccccccccccccf1111111c22cccc11ddddc2222cc........................................
            ................................................................ffffffff6666666666ccccccccccf11111111cc1111111dddc22cce.........................................
            ................................................................ffffffff6666666666666cccccccf11111111111111111ddddccddde........................................
            ...............................................................fffffffff66666fff666666666666811111111111111111dddddddde.........................................
            ...............................................................ffffffffff6666fff6666666666668111111111111111111dddddde..........................................
            ..............................................................fffffffffffff6ffff6666666666668111111111111111111ddddde...........................................
            .............................................................fffffffffffffffffff6666666666c81111111111111111111dddde............................................
            .............................................................fffffffffffffffffffccccccccccccf1111111111111111111dde.............................................
            ............................................................ffffffffffffffffffffcccccccccccccf11111111111111111eee..............................................
            ...........................................................ffcffffffffffffffffffccccccccccccccf11111111111cccee.................................................
            ..........................................................ffccfffbbbbbbbffffffffccccccccccccccf111111ccccceec...................................................
            .........................................................ffbbbcbbbbbbbbbbbffffffcccccccccccccf111eeeeceeeeeec...................................................
            ........................................................ffbbbbbbbbbbbbbbbbbcffffffcccccccccccfeee....ceeeeeec...................................................
            .......................................................ffbbbbbbbbbbbbbbbbbbbbcffffcccccccccccf.......ceeeeeec...................................................
            ......................................................ffbbbbbbbbbbbbbbbbbbbbbcfffcccccccccccccf.......ceeeeeec..................................................
            ....................................................fffbbbbbbbbbbbbbbbbbbbbbbcffccccccccccccccf.......ceeeeeec..................................................
            ...................................................fffbbbbbbbbbbbbbbbbbbbbbbbcffccccccccccccccf.......ceeeeeec..................................................
            ..................................................ffbbbbbbbbbbbbbbbbbbbbbbbbbffffccccccccccccccf......ceeeeeec..................................................
            .................................................fffbbbbbbbbbbbbbbbbbbbbbbbbbffffccccccccccccccf......ceeeeeec..................................................
            ................................................fffbbbbbbbbbbbbbbbbbbbbbbbbbbffffccccccccccccccf.......ceeeeeec.................................................
            ..............................................fffffbbbbbbbbbbbbbbbbbbbbbbbbbffffffccfccccfcccccf.......ceeeeeec.................................................
            .............................................fffffcbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffccffccccccf.......ceeeeeec.................................................
            ............................................ffffffcccbbbbbbbbbbbbbbbbbbbbbbbffffffffcccffccccccf.......ceeeeeec.................................................
            ............................................fffffccccccbbbbbbbbbbbbbbbbbbbbfffffffcccccffffccccf........ceeeeeec................................................
            ...........................................ffffffcccccccccbbbfbbbbbbbbbbbbfffffffcccccccffcccccf........ceeeeeec................................................
            ..........................................fffffffcccccccccbbfbbbbbbbbbbbbbffffffcccccccccccccccf........ceeeeeec................................................
            ..........................................fffffffccccccbbbbbfbbbbbbbbbbbbffffffccccccccccccccccf........ceeeeeec................................................
            .........................................fffffffffccffbbbbbffbbbfbbbbbbbffffffccccccccffcccccccf........ceeeeeec................................................
            ........................................fffffffffffffbbbbbbfffffbbbbbbbbffffffcccccccffccccccccf.........ceeeeeec...............................................
            ........................................fffffffffffffbbbbbbbffbbbbbbbbbfffffffccccccffcccccccccf.........ceeeeeec...............................................
            ........................................ffffffffffffcbbbbbbbbbbbbbbbbcffffffffccccccfffccfcccccf.........ceeeeeec...............................................
            .......................................fffffffffffffcbbbbbbbbbbbbbbbcfffffffffcccccccffffcccccf..........ceeeeeec...............................................
            .......................................ffffffffffffffcbbbbbbbbbbbccfffffffffffffccccccccccccccf..........ceeeeeec...............................................
            .......................................ffffffffffffffcbbbbbbbbbcccfffffffffffffffffcccccccccccf...........ceeeeeec..............................................
            `, SpriteKind.Projectile)
    } else {
        scene.setBackgroundImage(img`
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999555555555559999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999995555555555555555559999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999955555555555555555555999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999555555555555555555555559999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999955555555555555555555555555999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999555555555555555555555555555599999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999995555555555555555555555555555599999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999995555555555555555555555555555559999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999955555555555555555555555555555555999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999955555555555555555555555555555555599999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999555555555555555555555555555555555599999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999555555555555555555555555555555555599999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999995555555555555555555555555555555555559999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999995555555555555555555555555555555555559999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999995555555555555555555555555555555555559999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999995555555555555555555555555555555555559999999999999999999999999999999999999999999999999999999
            9999999996999999999999999999999999999999999999999999999999999999999995555555555555555555555555555555555559999999999999999999999999999999999999999999999999999999
            9999999966999999999999999999999999999999999999999999999999999999999995555555555555555555555555555555555559999999999999999999999999999999999999999999999999999999
            9999999966999999999999999999999999999999999999999999999999999999999995555555555555555555555555555555555559999999999999999999999999999999999999999999999999999999
            9666666966999999999999999999999999999999999999999999999999999999999995555555555566666665555555555555555559999999999999999999999999999999999999999999999999999999
            9699666966999999999999999999999999999999999999999999999999999999999995555556666666666666666555555555555559999999999999999999999999999999999999999999999999999999
            9666696966999999999999999999999999999999999999999999999999999999999995555666666666666666666665555555555559999999999999999999999999999999999999999999999999999999
            9666696666999999996666699999999999999999999999999999999999999999999999588866666666666666666668555555555559999999999999999999999999999999999996999999999666999999
            9699666666999999996666699999999999999999999999999999999999999999999999558866666666666666666688555555555599999999999999999999999999999999999966999999999666999999
            9666666666996996996666699999999999999999999999999999999999999999999999558886666666666666668888555555555599999999999999999999999999999999999966999999999666999999
            6699996666666966696666699999999999999999999999999999999999999999999999958888888888888888888888555555555599999999999999999999999999999999996666666999996666699999
            6666666666666966699669699999999999999999999999999999999999999999999999995888888888888888888885555555555999999999999999999999999999999999996666666999996666699999
            6666666666666666666666699999999999999999999999999999999999999999999999999588888888888888888885555555559999999999999999999999999999999999996666666999996666699999
            66666666666666666666666999999999999999999999999999999999999999999999999995ffff8888888888888888855555559999999999999999999999999999999999996666666999966666666999
            66666666666666666666666999999999999999999999999999999999999999999999999999ffffff88888888888888885555599999999999999999999999999999999999996666666999966666666999
            6666666666666666666666699999999999999999999999999999999999999999999999999ffffffffff88888888888888555999999999999999999999999999999666699996669666999966666666999
            6666666666699966669669699999999999999999669999999999999999999999999999999ffffffffffff888888888885559999999999999999999999999999999666699996669666999966666666999
            6666666666669966666666699999666999999999666999999999999999999999999999999fffccfffffffffffff555555999999999999999999999999999999996666669996666666999966666666999
            666666666666666666666669999966699999999966699999999999999999999999999999ffffcccffffffffffff555559999999999999999999999999999999996666669996669666999966666666999
            666666666669666666666669996666666999999666669999999999999999999999999999ffffccccccffffffff5559999999999999999999999999999999999996666666996666666996666666666666
            66666666666999666666666999666666699999966666999999999999999999999999999ffffcccccccccccc4444499999999999999999999999999999999999996666666996666966996666666666666
            66666666666666666666666999666666699999966666999999999999999999999999999ffffcccccccccccc4444444999999999999999999999999999999999996666666996666666996666666666666
            66666666666666666666666999699666699999666666699999999999999999999999999fffcccfcccccccccc444444444999999999999999999999999999999996666666996666666996666666666666
            6666666666666666666666699966666669999966666669999999999999999999999999ffffccfccccccccccccc9444444449999999999999999999999999999996666666996666666996666666666666
            6666666666666666666696699969666669999966666669999999999999999999999999ffffcfcccccccccccccc9999999999999999999999999999999999999996666666996666666996666666666666
            6666666666666666666666699966666669999966666669999999999999999999999999fffcfccfcccccccccccc9999999999999999999999999999999999999996666666996666966996666666666666
            666666666666666666666669996666666999996666666999999999999999999999999fffffccfccccccccccccc9999999999999999999999999999999999999996666666666666666996666666666666
            666666666666666666666669996666666999996666666999999999669999999999999fffffcfccccccccccccccc999999999999999999999999999999999999996666666666666666696666666666666
            666666666666666666666666996666666999666666666696699996666666669999999ffffcfcccccccccccccccc999999999999999999999999999999999999996666666666666666696666666666666
            666666666666666666666666996696666999666666666666699996696669669999999ffffcfcccccccccccccccc999999999999999999999999999999999999996666666666666666696666666666666
            66666666666666666666666699666666699966666666666969999666696996999999fffffffcccccccccccccccc999999999999999999999999999999999999996666666666666666666666666666666
            66666666666666666666666699666666699966666666666669999666666666999999ffffffccfcccccccccccccc999999999999666666669999999999999999996666666666666666666666666666666
            66666666666666666666666699666666699966666666666969999666666666999999fffffcccfcccccccccccccc999999999999666666669999999999999999996696666666666666666666666666666
            66666666666666666666666699666666699966666666666666696669666666999999ffffcccfccccccccccccccc9999999999996666611dddd9999999999999996666666666666666666666666666666
            6666666666666666666666669966666669996666666666666669666666666699999fffffccfcccccccccccccccc999999999999611111ddddd9999999999999996666666666666666666666666666666
            6666666666666666666666666666666669996666666666666669666666666699999fffffccfcccccccccccccccc999991111111111111dddddd999999999999996666666666666666666666666666666
            6666666666666666666666666666666666696666666666666669666666666699999fffffcfccccccccccccccccc111111111111111111dddddd222966999999996666666666666666666666666666666
            666666666666666666666666666666666669666666666666666966666666669999ffffffcfcccccccccccccccccc11111111111111111dd2222222966999999996666666666666666666666666666666
            666666666666666666666666666666666669666666666666666966666666669999fffffffccfcccccccccccccccc11111111111111122222222222666999999996666666666666666666666666666666
            666666666666666666666666666666666669666666666666666966666666669999ffffffccfccccccccccccccccc11111111111222222222222222266999999996666666666666666666666666666666
            666666666666666666666666666666666669666666666666666966666666669999ffffff6fcccccccccccccccccc1111111112222222222dd22222266999999996666666666666666666666666666666
            66666666666666666666666666666666666966666666666666666666666666999fffffffff66cccccccccccccccc11111111122222211ddddd2222226999999996666666666666666666666666666666
            66666666666666666666666666666666666966666666666666666666666666999ffffffff66666cccccccccccccc11111111122111111ddddd2222666999999996666666666666666666666666666666
            6666666666666666666666666666666666696666666666666666666666666699ffffffff6666666666cccccccccc111111111111111111dddd22dd666999996996666666666666666666666666666666
            6666666666666666666666666666666666696666666666666666666666666699ffffffff666f666666666ccccccc111111111111111111ddddddddd66966966696666666666666666666666666666666
            666666666666666666666666666666666669666666666666666666666666666fffffffff66f66fff666666666666111111111111111111dddddddd666966966666666666666666666666666666666666
            666666666666666666666666666666666669666666666666666666666666666fffffffffff666fff6666666666661111111111111111111dddddd6666666666666666666666666666666666666666666
            66666666666666666666666666666666666966666666666666666666666666fffffffffffff6ffff6666666666661111111111111111111ddddd66666666666666666666666666666666666666666666
            6666666666666666666666666666666666696666666666666666666666666fffffffffffffffffff6666666666c11111111111111111111dddd666666666669666666666666666666666666666666666
            6666666666666666666666666666666666696666666666666666666666666fffffffffffffffffffcccccccccccc11111111111111111111dd6666666666666666666666666666666666666666666666
            666666666666666666666666666666666669666666666666666666666666ffffffffffffffffffffccccccccccccc1111111111111111116666666666996969666666666666666666666666666666666
            66666666666666666666666666666666666966666666666666666666666ffbffffffffffffffffffcccccccccccccc111111111111ee6666666666666666969666666666666666666666666666666666
            6666666666666666666666666666666666696666666666666666666666ffbbfffbbbbbbbffffffffcccccfcccccccc11111116eeeeee6666666666666666669666666666666666666666666666666666
            666666666666666666666666666666666669666666666666666666666ffbbbbbbbbbbbbbbbffffffcccffcccccccc111166666eeeeee6666666666666696666666666666666666666666666666666666
            66666666666666666666666666666666666666666666666666666666ffbbbfbbbbbbbbbbbbbbfffffffcccccccccc666666666eeeeee6666666666666996966666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666666ffbbffbbbbbbbbbbbbbbbbbffffccccccccccc666666666eeeeee6666666666666666666666666666666666666666666666666666
            666666666666666666666666666666666666666666666666666666fffffbbbbbbbbbbbbbbbbbbbfffcccccfccccccc666666666eeeeee666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666666fffbbbbbbbbbbbbbbbbbbbbbbbffcccccfcccccccc666666666eeeeee666666666666666666666666666666666666666666666666666
            666666666666666666666666666666666666666666666666666fffbbffffbbbbbbbbbbbbbbbbbbffccccfccccccccc666666666eeeeee666666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666666666666666666ffbbffbbbbbbbbbbbbbbbbbbbbbffffccfccccccccccc66666666eeeeee666666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666666ffffffbbbbbbbbbbbbbbbbbbbbbbffffffcccccccccccc66666666eeeeee666666666666666666666666666666666666666666666666666
            666666666666666666666666666666666666666666666666ffffbbbbbfbbbbbbbbbbbbbbbbbbbffffcccccfcccccccc666666666eeeeee66666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666666fffffbbbbffbbbbbbbbbbbbbbbbbbbffffffccffcccfccccc666666666eeeeee66666666666666666666666666666666666666666666666666
            666666666666666666666666666666666666666666666fffffcbbffbbbbbbbbbbbbbbbbbbbbbfffffffffccffcccccc666666666eeeeee66666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666666666666fffffffffbbbbbbbbbbbbbbbbbbbbbbbffffffffcccffcccccc666666666eeeeee66666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666666666666fffffffccccbbbbbbbbbbbbbbbbbbbbfffffffcccccffffcccc6666666666eeeeee6666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666666ffffffcccccccfcbbbfbbbbbbbbbbbbfffffffcccccccffccccc6666666666eeeeee6666666666666666666666666666666666666666666666666
            666666666666666666666666666666666666666666fffffffcccccffccbbfbbbbbbbbbbbbbffffffccccccccccccccc6666666666eeeeee6666666666666666666666666666666666666666666666666
            666666666666666666666666666666666666666666fffffffcccffcbbbbbfbbbbbbbbbbbbffffffcccccccccccccccc6666666666eeeeee6666666666666666666666666666666666666666666666666
            66666666666666666666666666666666666666666fffffffffffffbbbbbffbbbfbbbbbbbffffffccccccccffccccccc6666666666eeeeee6666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666fffffffffffffbbbbbbfffffbbbbbbbbffffffcccfcccffcccccccc66666666666eeeeee666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666fffffffffffffbbbbbbbffbbbbbbbbbfffffffccfcccffccccccccc66666666666eeeeee666666666666666666666666666666666666666666666666
            6666666666666666666666666666666666666666ffffffffffffbbbbffbbbbbbbbbbbbffffffffffccccfffccfccccc66666666666eeeeee666666666666666666666666666666666666666666666666
            666666666666666666666666666666666666666fffffffffffffbbbbfbbbbbbbbbbbbffffffffffccccccffffccccc666666666666eeeeee666666666666666666666666666666666666666666666666
            666666666666666666666666666666666666666ffffffffffffffbbfbbbbbbbbbbbfffffffffffffccccffcccccccc666666666666eeeeee666666666666666666666666666666666666666666666666
            666666666666666666666666666666666666666ffffffffffffffffbbbbbbbbbbbfffffffffffffffffffccccccccc6666666666666eeeeee66666666666666666666666666666666666666666666666
            `)
        mySprite = sprites.create(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ......................cccccccccccccc........ccc........ccccccccccccccc.....cccccccccccccccc......ccccccccccccccccc.......ccc............ccc.....................
            ......................cccccccccccccccc......ccc.......cccccccccccccccc.....cccccccccccccccc.....ccccccccccccccccccc.....ccccc...........ccc.....................
            ......................ccccccccccccccccc.....ccc.....cccccccccccccccccc.....cccccccccccccccc....ccccccccccccccccccccc...ccccccc..........ccc.....................
            ......................ccc999999999ccccc.....ccc.....ccccc..................cccc................cccc9999999999999cccc...cccccccc.........ccc.....................
            ......................ccc99999999999ccc.....ccc.....cccc...................cccc................ccc999999999999999ccc...ccccccccc........ccc....ccc..............
            ......................ccc99999999999ccc.....ccc.....ccc....................cccc................ccc999999999999999ccc...ccc..ccccc.......ccc....ccc..............
            ......................ccc999999999ccccc.....ccc.....ccc....................cccc................ccc999999999999999ccc...ccc...cccccc.....ccc....ccc..............
            ......................ccccccccccccccccc.....ccc.....ccc...cccccccccccc.....ccccccccccccc.......ccc999999999999999ccc...ccc....cccccc....ccc.....................
            ......................cccccccccccccccc......ccc.....ccc...cccccccccccc.....ccccccccccccc.......ccc999999999999999ccc...ccc.....cccccc...ccc.....................
            ......................cccccccccccc..........ccc.....ccc...cccccccccccc.....ccccccccccccc.......ccc999999999999999ccc...ccc.......ccccc..ccc.....................
            ......................ccc...................ccc.....ccc............ccc.....cccc................ccc999999999999999ccc...ccc........ccccccccc....ccc..............
            ......................ccc...................ccc.....cccc...........ccc.....cccc................ccc999999999999999ccc...ccc.........cccccccc....ccc..............
            ......................ccc...................ccc.....ccccc..........ccc.....cccc................cccc9999999999999cccc...ccc..........ccccccc....ccc..............
            ......................ccc...................ccc......ccccccccccccccccc.....cccccccccccccccc....ccccccccccccccccccccc...ccc...........cccccc.....................
            ......................ccc...................ccc......ccccccccccccccccc.....cccccccccccccccc.....ccccccccccccccccccc....ccc............ccccc.....................
            ......................ccc...................ccc........ccccccccccccccc.....cccccccccccccccc......ccccccccccccccccc.....ccc.............ccc......................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ......................cccccccc.....ccccccc...cc........cc....cc.........c.....cccccccc...ccccccc......cccccc......cc.....c...ccccccc...cccccccc.................
            ......................cc999999c...cc.........cc........cc....cc.........c....cc..........cc.....c....cc99999c....cc.c....c..cc........cc........................
            ......................cc9999999c..cc.........cc........cc....cc.........c....cc..........cc.....c....cc99999c....cc..c...c..cc........cc........................
            ......................cc9999999c..ccccc......cc........cc.....cc.......c.....ccccc.......ccccccc....cccccccccc...cc...c..c..cc........ccccc.....................
            ......................cc999999c...cc.........cc........cc......ccc...cc......cc..........cc.....c...cc.......c...cc....c.c..cc........cc........................
            ......................cccccccc....cccccccc...cccccccc..cc........cccc........ccccccccc...cc......c..cc.......c...cc.....c....ccccccc..ccccccccc.................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................8888888.........................................................................
            ...........................................................................8888866666668888.....................................................................
            .........................................................................88666666666666666688...................................................................
            ........................................................................f666666666666666666668..................................................................
            .......................................................................f8866666666666666666668..................................................................
            .......................................................................f8866666666666666666688..................................................................
            .......................................................................f8886666666666666668888..................................................................
            .......................................................................f8888888888888888888888..................................................................
            ........................................................................f888888888888888888f8...................................................................
            .........................................................................f8888888888888f8fff8...................................................................
            ..........................................................................ffff88888888888888888.................................................................
            ..........................................................................ffffff8888888888888888................................................................
            .........................................................................ffffffffff88888888888888...............................................................
            .........................................................................ffffffffffff88888888888................................................................
            .........................................................................fffccfffffffffffff.....................................................................
            ........................................................................ffffcccffffffffffff.....................................................................
            ........................................................................ffffccccccffffffffee....................................................................
            .......................................................................ffffcccccccccccf44444ee..................................................................
            .......................................................................ffffcccccccccccf4444444eee...............................................................
            .......................................................................fffcccccccccccccf444444444ee.............................................................
            ......................................................................ffffccccccccccccccffe44444444e............................................................
            ......................................................................ffffccccccccccccccccfeeeeeeee.............................................................
            ......................................................................fffcccccccccccccccccf.....................................................................
            .....................................................................ffffcccccccccccccccccf.....................................................................
            .....................................................................ffffccccccccccccccccccf....................................................................
            .....................................................................ffffccccccccccccccccccf....................................................................
            .....................................................................ffffccccccccccccccccccf......................1.....1.......................................
            ....................................................................fffffccccccccccccccccccf...........................1........................................
            ....................................................................fffffccccccccccccccccccf........................1111........................................
            ....................................................................fffffccccccccccccccccccf................eeeee....111........................................
            ....................................................................ffffcccccccccccccccccccf............eeee11ddde.....111......................................
            ...................................................................fffffcccccccccccccccccccf....eeeeeeee11111ddddde.............................................
            ...................................................................fffffcccccccccccccccccccfeeee1111111111111ddddddecc..1.......................................
            ...................................................................fffffcccccccccccccccccccf11111111111111111ddcccc222c.........................................
            ..................................................................ffffffccccccccccccccccccccf11111111111111cccc2222222c.........................................
            ..................................................................ffffffccccccccccccccccccccf1111111111cccc22222222222c.........................................
            ..................................................................ffffffccccccccccccccccccccf11111111cc2222222222222222c........................................
            ..................................................................ffffff66ccccccccccccccccccf1111111c2222222222cc222222c........................................
            .................................................................fffffff6666ccccccccccccccccf1111111c222222ccccddc222222c.......................................
            .................................................................fffffff666666ccccccccccccccf1111111c22cccc11ddddc2222cc........................................
            ................................................................ffffffff6666666666ccccccccccf11111111cc1111111dddc22cce.........................................
            ................................................................ffffffff6666666666666cccccccf11111111111111111ddddccddde........................................
            ...............................................................fffffffff66666fff666666666666811111111111111111dddddddde.........................................
            ...............................................................ffffffffff6666fff6666666666668111111111111111111dddddde..........................................
            ..............................................................fffffffffffff6ffff6666666666668111111111111111111ddddde...........................................
            .............................................................fffffffffffffffffff6666666666c81111111111111111111dddde............................................
            .............................................................fffffffffffffffffffccccccccccccf1111111111111111111dde.............................................
            ............................................................ffffffffffffffffffffcccccccccccccf11111111111111111eee..............................................
            ...........................................................ffcffffffffffffffffffccccccccccccccf11111111111cccee.................................................
            ..........................................................ffccfffbbbbbbbffffffffccccccccccccccf111111ccccceec...................................................
            .........................................................ffbbbcbbbbbbbbbbbffffffcccccccccccccf111eeeeceeeeeec...................................................
            ........................................................ffbbbbbbbbbbbbbbbbbcffffffcccccccccccfeee....ceeeeeec...................................................
            .......................................................ffbbbbbbbbbbbbbbbbbbbbcffffcccccccccccf.......ceeeeeec...................................................
            ......................................................ffbbbbbbbbbbbbbbbbbbbbbcfffcccccccccccccf.......ceeeeeec..................................................
            ....................................................fffbbbbbbbbbbbbbbbbbbbbbbcffccccccccccccccf.......ceeeeeec..................................................
            ...................................................fffbbbbbbbbbbbbbbbbbbbbbbbcffccccccccccccccf.......ceeeeeec..................................................
            ..................................................ffbbbbbbbbbbbbbbbbbbbbbbbbbffffccccccccccccccf......ceeeeeec..................................................
            .................................................fffbbbbbbbbbbbbbbbbbbbbbbbbbffffccccccccccccccf......ceeeeeec..................................................
            ................................................fffbbbbbbbbbbbbbbbbbbbbbbbbbbffffccccccccccccccf.......ceeeeeec.................................................
            ..............................................fffffbbbbbbbbbbbbbbbbbbbbbbbbbffffffccfccccfcccccf.......ceeeeeec.................................................
            .............................................fffffcbbbbbbbbbbbbbbbbbbbbbbbbbfffffffffccffccccccf.......ceeeeeec.................................................
            ............................................ffffffcccbbbbbbbbbbbbbbbbbbbbbbbffffffffcccffccccccf.......ceeeeeec.................................................
            ............................................fffffccccccbbbbbbbbbbbbbbbbbbbbfffffffcccccffffccccf........ceeeeeec................................................
            ...........................................ffffffcccccccccbbbfbbbbbbbbbbbbfffffffcccccccffcccccf........ceeeeeec................................................
            ..........................................fffffffcccccccccbbfbbbbbbbbbbbbbffffffcccccccccccccccf........ceeeeeec................................................
            ..........................................fffffffccccccbbbbbfbbbbbbbbbbbbffffffccccccccccccccccf........ceeeeeec................................................
            .........................................fffffffffccffbbbbbffbbbfbbbbbbbffffffccccccccffcccccccf........ceeeeeec................................................
            ........................................fffffffffffffbbbbbbfffffbbbbbbbbffffffcccccccffccccccccf.........ceeeeeec...............................................
            ........................................fffffffffffffbbbbbbbffbbbbbbbbbfffffffccccccffcccccccccf.........ceeeeeec...............................................
            ........................................ffffffffffffcbbbbbbbbbbbbbbbbcffffffffccccccfffccfcccccf.........ceeeeeec...............................................
            .......................................fffffffffffffcbbbbbbbbbbbbbbbcfffffffffcccccccffffcccccf..........ceeeeeec...............................................
            .......................................ffffffffffffffcbbbbbbbbbbbccfffffffffffffccccccccccccccf..........ceeeeeec...............................................
            .......................................ffffffffffffffcbbbbbbbbbcccfffffffffffffffffcccccccccccf...........ceeeeeec..............................................
            `, SpriteKind.Projectile)
    }
    mySprite.z = 10
    onStartScreen = true
    timer.background(function () {
        while (onStartScreen) {
            projectile = sprites.createProjectileFromSide(img`
                . c c c c c c c c c c c c . 
                c b 1 1 1 1 1 1 1 1 1 1 b c 
                c d b 1 1 1 1 1 1 1 1 b d c 
                c d d b 1 1 1 1 1 1 b d d c 
                c d d d b 1 1 1 1 b d d d c 
                c d d b d b 1 1 b d b d d c 
                c d b d d d b b d d d b d c 
                c b d d d d d d d d d d b c 
                . c c c c c c c c c c c c . 
                `, 30, 0)
            while (Math.abs(next_x - last_x) < 20) {
                next_x = randint(50, 110)
            }
            projectile.y = next_x
            last_x = next_x
            pause(500)
        }
        tiles.destroySpritesOfKind(SpriteKind.Projectile)
        setup()
        createLevels()
        startLevel(0)
    })
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile25`, function (sprite, location) {
    if (sprite.left < tiles.locationXY(location, tiles.XY.right) - 2) {
        reloadCheckpoint()
    }
})
function returnPlaneHome (plane: Sprite) {
    plane.setFlag(SpriteFlag.Ghost, true)
    animation.runImageAnimation(
    plane,
    [img`
        . . . . . . . . 
        2 . . b b d . d 
        2 2 2 b b b 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        `,img`
        . . . . . . . . 
        2 . . b b d . c 
        2 2 2 b b b 2 c 
        2 2 2 2 2 2 2 d 
        . 2 2 c 2 2 . d 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        2 . . b b d . d 
        2 2 2 b b b 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        2 . . b b d . c 
        2 2 2 b b b 2 c 
        2 2 2 2 2 2 2 d 
        . 2 2 c 2 2 . d 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        `,img`
        . . . . . . . . 
        2 . . b b d . d 
        2 2 2 b b b 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        `,img`
        . . . . . . . . 
        2 . . b b d . c 
        2 2 2 b b b 2 c 
        2 2 2 2 2 2 2 d 
        . 2 2 c 2 2 . d 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        `,img`
        2 . . b b d . d 
        2 2 2 b b b 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        . . . . . . . . 
        `,img`
        2 . . b b d . c 
        2 2 2 b b b 2 c 
        2 2 2 2 2 2 2 d 
        . 2 2 c 2 2 . d 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        . . . . . . . . 
        `],
    50,
    true
    )
    animation.runMovementAnimation(
    plane,
    "L " + sprites.readDataNumber(plane, "homex") + " " + sprites.readDataNumber(plane, "homey"),
    1000,
    false
    )
    timer.after(1000, function () {
        plane.setFlag(SpriteFlag.Ghost, false)
    })
}
function getBubbleLetter (letter: string) {
    if (letter == "a") {
        return img`
            ........222.........
            ......222222........
            .....221222222......
            ....22122222222.....
            ...2212222222222....
            ...222222...22222...
            ..222222....22222...
            ..222222....222222..
            .2222222....222222..
            .22222222...2222222.
            .222222222.22222222.
            .222222222222222222.
            2222222222222222222.
            22222222222222222222
            2222222...2222222222
            222222......22222222
            222222.......2222222
            222222........222222
            222222........222222
            .2222.........222222
            ...............2222.
            `
    } else if (letter == "b") {
        return img`
            ....................
            .....222222222......
            ....22212222222.....
            ....221222222222....
            ...221222...2222....
            ...22222.....222....
            ...2222......2222...
            ...2222.....22222...
            ..22222...222222....
            ..222222..22222.....
            ..222222222222......
            ..222222222222222...
            ..2222222222222222..
            ..222222......2222..
            ...22222......2222..
            ...222222.....2222..
            ...2222222..222222..
            ...22222222222222...
            ....222222222222....
            .....2222222222.....
            ....................
            `
    } else if (letter == "c") {
        return img`
            ......22222222......
            ....222222222222....
            ....2211122222222...
            ..2221222222222222..
            ..2212222222222222..
            ..212222222222222...
            .2222222222222222...
            .22222222222........
            .2222222222.........
            .222222222..........
            .22222222...........
            .22222222...........
            .22222222.....222...
            .22222222....22222..
            .222222222..2222222.
            .222222222222222222.
            ..22222222222222222.
            ...222222222222222..
            ....2222222222222...
            ......2222222222....
            ..........22222.....
            `
    } else if (letter == "d") {
        return img`
            ....................
            ....22222222........
            ...22122222222......
            ..2212222222222.....
            ..21222222222222....
            ..222222222222222...
            ..2222222222222222..
            ..2222222222222222..
            ..2222222.22222222..
            ..222222...22222222.
            ..222222....2222222.
            ..222222....2222222.
            ..222222....2222222.
            ..222222...22222222.
            ..2222222222222222..
            ..2222222222222222..
            ..222222222222222...
            ..22222222222222....
            ...2222222222222....
            ....222222222222....
            .......2222222......
            `
    } else if (letter == "e") {
        return img`
            ....2222222222......
            ...2222222222222....
            ..22221222222222....
            ..2221222222222222..
            .22212222222222222..
            .22222222...222222..
            .22222222.....2222..
            222222222......222..
            222222222222........
            2222222222222.......
            2222222222222.......
            2222222222222.......
            222222222222........
            2222222222..........
            222222222...........
            .22222222....2222...
            .2222222222.222222..
            ..2222222222222222..
            ..2222222222222222..
            ..222222222222222...
            ....2222222222......
            `
    } else if (letter == "f") {
    	
    } else if (letter == "g") {
        return img`
            ....................
            ....222222222222....
            ...2212222222222....
            ..221222222222222...
            ..2122222222222222..
            .22222222222222222..
            .2222222222222222...
            .22222222...22222...
            .222222.............
            .222222.............
            .222222......222....
            .222222...2222222...
            .222222...22222222..
            .222222...22222222..
            .2222222...2222222..
            .22222222222222222..
            ..2222222222222222..
            ..2222222222222222..
            ...22222222222222...
            ......2222222222....
            ....................
            `
    } else if (letter == "h") {
        return img`
            ....................
            ..2222.......222....
            ..22122.....22122...
            ..21222....221222...
            ..22222....2222222..
            ..22222....2222222..
            ..22222....2222222..
            ..22222....2222222..
            .222222....2222222..
            .2222222.222222222..
            .22222222222222222..
            .22222222222222222..
            .22222222222222222..
            .22222222222222222..
            .22222222222222222..
            .222222...22222222..
            .22222.....2222222..
            .22222.....2222222..
            .22222.....2222222..
            ..222......222222...
            ....................
            `
    } else if (letter == "i") {
        return img`
            ....................
            ..222222222222222...
            222122222222222222..
            2212222222222222222.
            2222222222222222222.
            222222222222222222..
            .222222222222222....
            ..2222.222222.......
            .......222222.......
            .......222222.......
            .......222222.......
            .......222222.......
            .......222222.......
            .......222222.......
            .......2222222......
            ......222222222222..
            ...2222222222222222.
            .222222222222222222.
            .222222222222222222.
            ..2222222222222222..
            ....................
            `
    } else if (letter == "j") {
    	
    } else if (letter == "k") {
    	
    } else if (letter == "l") {
        return img`
            ...22...............
            .22222..............
            .221122.............
            .212222.............
            .222222.............
            .222222.............
            .222222.............
            .222222.............
            .222222.............
            .222222.............
            .222222.............
            .222222.............
            ..22222.............
            ..222222...22222....
            ..222222222222222...
            ..2222222222222222..
            ..22222222222222222.
            ..22222222222222222.
            ...222222222222222..
            ......22222222222...
            ....................
            `
    } else if (letter == "m") {
        return img`
            ....................
            .....222......22....
            ....22222....2222...
            ...221222...22122...
            ...2122222..212222..
            ...2222222..2222222.
            ..222222222.2222222.
            .222222222222222222.
            .222222222222222222.
            .2222222222222222222
            .2222222222222222222
            22222222222222222222
            22222222222222222222
            222222.22222..222222
            22222...2222..222222
            22222....22...22222.
            22222..........222..
            .222................
            ....................
            ....................
            ....................
            `
    } else if (letter == "n") {
    	
    } else if (letter == "o") {
        return img`
            ........22222.......
            .....222222222......
            ..2222122222222.....
            ..22112222222222....
            .2212222222222222...
            .2222222222222222...
            .22222222222222222..
            .22222222222222222..
            .222222.....2222222.
            .22222.......222222.
            ..2222.......222222.
            ..2222.......222222.
            ..22222.....2222222.
            ..22222222222222222.
            ..2222222222222222..
            ..2222222222222222..
            ...22222222222222...
            ...22222222222222...
            .....22222222222....
            ..........222.......
            ....................
            `
    } else if (letter == "p") {
        return img`
            ...222222222222.....
            ..22122222222222....
            .2212222222222222...
            .222222....222222...
            .22222.......2222...
            .22222.......2222...
            .22222.......2222...
            .22222.....222222...
            .222222222222222....
            .222222222222222....
            .222222222222222....
            .22222222222222.....
            .2222222222222......
            .2222222222.........
            .222222.............
            .222222.............
            .222222.............
            ..22222.............
            ..22222.............
            ..22222.............
            ...222..............
            `
    } else if (letter == "q") {
    	
    } else if (letter == "r") {
        return img`
            ...2222222..........
            ..221222222222......
            .2212222222222......
            .21222....22222.....
            .2222......2222.....
            .2222......2222.....
            .2222......222......
            .2222.....2222......
            .2222222222222......
            .222222222222.......
            .2222222222.........
            .222222222222.......
            .2222222222222......
            .222222222222222....
            .2222222222222222...
            .222222.222222222...
            .22222...22222222...
            222222....2222222...
            222222.....22222....
            .22222.......22.....
            ..222...............
            `
    } else if (letter == "s") {
        return img`
            ....................
            .......22222222.....
            ....2222112222222...
            ...22211222222222...
            ...221222222222222..
            ..22222222...2222...
            ..2222222.....222...
            ..22222222..........
            ..22222222222.......
            ..22222222222222....
            ...222222222222222..
            ....22222222222222..
            ......222..22222222.
            ............2222222.
            ............2222222.
            ....2222....2222222.
            ...22222....2222222.
            ...222222..2222222..
            ...222222222222222..
            ....22222222222222..
            .......222222222....
            `
    } else if (letter == "t") {
        return img`
            ....................
            ..22222.........22..
            .22122222.....22222.
            22122222222222222222
            21222222222222222222
            22222222222222222222
            .2222222222222222222
            ..22222222222222222.
            ......222222222222..
            ........222222......
            ........22222.......
            ........222222......
            .........22222......
            .........22222......
            .........22222......
            .........22222......
            .........22222......
            ........222222......
            ........222222......
            .........22222......
            ..........222.......
            `
    } else if (letter == "u") {
    	
    } else if (letter == "v") {
        return img`
            ....................
            .2222...............
            .2222...........222.
            221222.........22122
            212222........221222
            222222........222222
            2222222.......222222
            2222222.......22222.
            .222222......222222.
            .222222......222222.
            .2222222.....222222.
            ..222222....2222222.
            ..2222222...2222222.
            ...2222222.2222222..
            ....22222222222222..
            .....222222222222...
            .....222222222222...
            .....22222222222....
            ......222222222.....
            .......2222222......
            ........22222.......
            `
    } else if (letter == "w") {
    	
    } else if (letter == "x") {
    	
    } else if (letter == "y") {
        return img`
            ....................
            ...22222......2222..
            ..222122.....221222.
            ..2212222....212222.
            ..2122222....222222.
            ..2222222....222222.
            ..2222222...2222222.
            ..22222222..2222222.
            ..22222222..222222..
            ...2222222.222222...
            ...2222222222222....
            ....222222222222....
            ......222222222.....
            .......2222222......
            .......222222.......
            ........22222.......
            ........22222.......
            ........22222.......
            ........22222.......
            .........222........
            ....................
            `
    } else if (letter == "z") {
    	
    } else if (letter == ".") {
        return img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ...22....22....22...
            ..2122..2122..2122..
            ..2222..2222..2222..
            ...22....22....22...
            ....................
            `
    } else if (letter == "!") {
        return img`
            ..22222.............
            .221222.............
            .212222.............
            .222222.............
            .222222.............
            .22222..............
            .22222..............
            ..2222..............
            ..2222..............
            ..2222..............
            ..2222..............
            ...22...............
            ...2................
            ....................
            ....................
            ....................
            ...22...............
            ..2122..............
            ..2222..............
            ...22...............
            ....................
            `
    } else if (letter == "0") {
        return img`
            . a a a a a a a . . 
            a a 1 a a a a a a . 
            a 1 a a a a a a a a 
            a a a a . . a a a a 
            a a a . . . a a a a 
            a a a . . . a a a a 
            a a a . . a a a a a 
            a a a a a a a a a a 
            a a a a a a a a a . 
            . a a a a a a a . . 
            `
    } else if (letter == "1") {
        return img`
            . . . a a a . . . . 
            . . a a 1 a a . . . 
            . a a 1 a a a . . . 
            a a a a a a a . . . 
            a a a a a a a . . . 
            . a a . a a a . . . 
            . . . . a a a . . . 
            . . . . a a a . . . 
            . . a a a a a a . . 
            . a a a a a a a a . 
            `
    } else if (letter == "2") {
        return img`
            . a a a a a a . . . 
            . a a 1 a a a a . . 
            a a 1 a a a a a a . 
            a a a a . a a a a . 
            . a a . . a a a a . 
            . . . . a a a a a . 
            . . . a a a a a . . 
            . . a a a a . . . . 
            . a a a a a a a a . 
            a a a a a a a a a . 
            `
    } else if (letter == "3") {
        return img`
            . . a a a a . . . . 
            . a a 1 a a a a . . 
            a a 1 a a a a a . . 
            a a a a a a a a . . 
            a a . . a a a a . . 
            . . . a a a a . . . 
            . . . a a a a . . . 
            a a . . a a a a . . 
            a a a a a a a a . . 
            . a a a a a a . . . 
            `
    } else if (letter == "4") {
        return img`
            . a a a . . . a a . 
            a a 1 a a . a a a a 
            a 1 a a a . a a a a 
            a a a a a a a a a a 
            . a a a a a a a a a 
            . a a a a a a a a a 
            . . a a a a a a a a 
            . . . . . a a a a a 
            . . . . . a a a a a 
            . . . . . . a a a . 
            `
    } else if (letter == "5") {
        return img`
            . . a a a a a a . . 
            . a a 1 a a a a a . 
            . a 1 a a a a a a . 
            . a a a a a a a . . 
            . a a a . . . . . . 
            . a a a a a a . . . 
            . . . . a a a a . . 
            . a a . . a a a . . 
            . a a a a a a a . . 
            . . a a a a a . . . 
            `
    } else if (letter == "6") {
        return img`
            . . . . . a a a . . 
            . . . . a a 1 a a . 
            . . . a a 1 a a . . 
            . . a a a a a . . . 
            . a a a a a . . . . 
            a a a a a a a a . . 
            a a a a . . a a a . 
            a a a . . . a a a . 
            a a a a a a a a a . 
            . a a a a a a a . . 
            `
    } else if (letter == "7") {
        return img`
            . a a a a a a a a . 
            a a a 1 a a a a a a 
            a a 1 a a a a a a a 
            . a a a a a a a a a 
            . . . . . a a a a . 
            . . . . a a a a a . 
            . . . a a a a a . . 
            . . . a a a a . . . 
            . . a a a a . . . . 
            . . a a a . . . . . 
            `
    } else if (letter == "8") {
        return img`
            . . a a a a a a . . 
            . a a 1 a a a a a . 
            . a 1 a a a a a a . 
            . a a a . . a a a . 
            . a a a . . a a a . 
            a a a a a a a a a . 
            a a a . . . . . a a 
            a a a . . . . a a a 
            a a a a a a a a a a 
            . a a a a a a a . . 
            `
    } else if (letter == "9") {
        return img`
            . . a a a a a a . . 
            . a a 1 a a a a a . 
            . a 1 a a . . a a . 
            . a a a . . . a a . 
            . a a a a . a a a . 
            . . a a a a a a a . 
            . . . a a a a a a . 
            . . . . . . a a a . 
            . . . . . a a a a . 
            . . . . . a a a . . 
            `
    } else if (letter == ":") {
        return img`
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . a a . . 
            . a 1 a a . 
            . a a a a . 
            . . a a . . 
            `
    } else if (letter == " ") {
        return img`
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            . . . . . . 
            `
    } else {
    	
    }
    return img`
        ....................
        ........2222........
        ......22222222......
        .....2222222222.....
        .....22222222222....
        .....222...22222....
        .....222....2222....
        ............2222....
        ...........22222....
        ...........2222.....
        ..........22222.....
        ........222222......
        .......222222.......
        .......22222........
        .......2222.........
        .......222..........
        ....................
        ........222.........
        ........222.........
        ........222.........
        ....................
        `
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Plane, function (sprite, otherSprite) {
    thePlayer.destroy()
    pressAToLaunch.setFlag(SpriteFlag.Invisible, false)
    animation.runImageAnimation(
    otherSprite,
    [img`
        . . . c c . . . 
        . . . c 1 4 . . 
        2 . . c c . . c 
        2 2 2 6 6 2 2 c 
        2 2 2 2 2 2 2 d 
        . 2 2 c 2 2 . d 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        `,img`
        . . . c c . . . 
        . . . c 1 4 . . 
        2 . . c c . . d 
        2 2 2 6 6 2 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        `],
    50,
    true
    )
    if (sprites.readDataNumber(otherSprite, "direction") == 0 || sprites.readDataNumber(otherSprite, "direction") == 2) {
        if (thePlayer.vx < 0) {
            animation.runMovementAnimation(
            otherSprite,
            "c -55 0 55 0 0 0",
            2000,
            true
            )
        } else {
            animation.runMovementAnimation(
            otherSprite,
            "c 55 0 -55 0 0 0",
            2000,
            true
            )
        }
    } else {
        if (thePlayer.vy < 0) {
            animation.runMovementAnimation(
            otherSprite,
            "c 0 -55 0 55 0 0",
            2000,
            true
            )
        } else {
            animation.runMovementAnimation(
            otherSprite,
            "c 0 55 0 -55 0 0",
            2000,
            true
            )
        }
    }
    activePlane = otherSprite
    inPlane = true
    if (sprites.readDataNumber(otherSprite, "direction") == 0) {
        sprites.setDataSprite(activePlane, "arrow", sprites.create(img`
            . . . c c . . . 
            . . c 4 4 c . . 
            . c 4 4 4 4 c . 
            c 4 4 4 4 4 4 c 
            . c c 4 4 c c . 
            . . c 4 4 c . . 
            . . c 4 4 c . . 
            . . . c c . . . 
            `, SpriteKind.Decoration))
    } else if (sprites.readDataNumber(otherSprite, "direction") == 1) {
        sprites.setDataSprite(activePlane, "arrow", sprites.create(img`
            . . . . c . . . 
            . . . c 4 c . . 
            . c c c 4 4 c . 
            c 4 4 4 4 4 4 c 
            c 4 4 4 4 4 4 c 
            . c c c 4 4 c . 
            . . . c 4 c . . 
            . . . . c . . . 
            `, SpriteKind.Decoration))
    } else if (sprites.readDataNumber(otherSprite, "direction") == 2) {
        sprites.setDataSprite(activePlane, "arrow", sprites.create(img`
            . . . c c . . . 
            . . c 4 4 c . . 
            . . c 4 4 c . . 
            . c c 4 4 c c . 
            c 4 4 4 4 4 4 c 
            . c 4 4 4 4 c . 
            . . c 4 4 c . . 
            . . . c c . . . 
            `, SpriteKind.Decoration))
    } else {
        sprites.setDataSprite(activePlane, "arrow", sprites.create(img`
            . . . c . . . . 
            . . c 4 c . . . 
            . c 4 4 c c c . 
            c 4 4 4 4 4 4 c 
            c 4 4 4 4 4 4 c 
            . c 4 4 c c c . 
            . . c 4 c . . . 
            . . . c . . . . 
            `, SpriteKind.Decoration))
    }
})
function moveTo (sprite: Sprite, x: number, y: number, speed: number, thenStop: boolean) {
    angle = Math.atan2(y - sprite.y, x - sprite.x)
    distance = Math.sqrt((sprite.y - y) ** 2 + (sprite.x - x) ** 2)
    spriteutils.setVelocityAtAngle(sprite, angle, speed)
    pause(distance / speed * 1000)
    if (thenStop) {
        sprite.setPosition(x, y)
        sprite.setVelocity(0, 0)
    }
}
function doPlaneLaunch () {
    inPlane = false
    createPlayer()
    thePlayer.ay = 0
    controller.moveSprite(thePlayer, 0, 0)
    thePlayer.setPosition(activePlane.x, activePlane.y)
    sprites.readDataSprite(activePlane, "arrow").destroy()
    pressAToLaunch.setFlag(SpriteFlag.Invisible, true)
    returnPlaneHome(activePlane)
    if (sprites.readDataNumber(activePlane, "direction") == 0) {
        moveTo(thePlayer, activePlane.x, activePlane.y - 32, 200, false)
    } else if (sprites.readDataNumber(activePlane, "direction") == 1) {
        moveTo(thePlayer, activePlane.x + 32, activePlane.y, 300, false)
    } else if (sprites.readDataNumber(activePlane, "direction") == 2) {
        moveTo(thePlayer, activePlane.x, activePlane.y + 32, 200, false)
    } else {
        moveTo(thePlayer, activePlane.x - 32, activePlane.y, 300, false)
    }
    thePlayer.ay = gravity
    controller.moveSprite(thePlayer, moveSpeed, 0)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    if (Math.abs(tiles.locationXY(location, tiles.XY.column) - tiles.locationXY(currentCheckpoint, tiles.XY.column)) > 1 || Math.abs(tiles.locationXY(location, tiles.XY.row) - tiles.locationXY(currentCheckpoint, tiles.XY.row)) > 1) {
        currentCheckpoint = location
        checkpointAlert = sprites.create(img`
            ..........................................
            ..........................................
            ..b..b.b.bbb..b..b.b.bb...b..bbb.b..b.bbb.
            .b.b.b.b.b...b.b.b.b.b.b.b.b..b..bb.b..b..
            .b...bbb.bb..b...bb..bb..b.b..b..b.bb..b..
            .b.b.b.b.b...b.b.b.b.b...b.b..b..b..b..b..
            ..b..b.b.bbb..b..b.b.b....b..bbb.b..b..b..
            ..........................................
            ...............bb.bbb.bbb.b...............
            ..............b...b....b..b...............
            ...............b..bb...b..b...............
            ................b.b....b..................
            ..............bb..bbb..b..b...............
            ..........................................
            ..........................................
            ...................44.....................
            ..................4444....................
            ..................4444....................
            ..................4444....................
            ................44444444..................
            .................444444...................
            ..................4444....................
            ...................44.....................
            ..........................................
            `, SpriteKind.Decoration)
        animation.runImageAnimation(
        checkpointAlert,
        [img`
            .1111111111111111111111111111111111111111.
            111111111111111111111111111111111111111111
            11b11b1b1bbb11b11b1b1bb111b11bbb1b11b1bbb1
            1b1b1b1b1b111b1b1b1b1b1b1b1b11b11bb1b11b11
            1b111bbb1bb11b111bb11bb11b1b11b11b1bb11b11
            1b1b1b1b1b111b1b1b1b1b111b1b11b11b11b11b11
            11b11b1b1bbb11b11b1b1b1111b11bbb1b11b11b11
            111111111111111111111111111111111111111111
            111111111111111bb1bbb1bbb1b111111111111111
            11111111111111b111b1111b11b111111111111111
            111111111111111b11bb111b11b111111111111111
            1111111111111111b1b1111b111111111111111111
            11111111111111bb11bbb11b11b111111111111111
            .111111111111111111111111111111111111111..
            ..........................................
            ...................44.....................
            ..................4444....................
            ..................4444....................
            ..................4444....................
            ................44444444..................
            .................444444...................
            ..................4444....................
            ...................44.....................
            ..........................................
            `,img`
            .1111111111111111111111111111111111111111.
            111111111111111111111111111111111111111111
            11b11b1b1bbb11b11b1b1bb111b11bbb1b11b1bbb1
            1b1b1b1b1b111b1b1b1b1b1b1b1b11b11bb1b11b11
            1b111bbb1bb11b111bb11bb11b1b11b11b1bb11b11
            1b1b1b1b1b111b1b1b1b1b111b1b11b11b11b11b11
            11b11b1b1bbb11b11b1b1b1111b11bbb1b11b11b11
            111111111111111111111111111111111111111111
            111111111111111bb1bbb1bbb1b111111111111111
            11111111111111b111b1111b11b111111111111111
            111111111111111b11bb111b11b111111111111111
            1111111111111111b1b1111b111111111111111111
            11111111111111bb11bbb11b11b111111111111111
            .111111111111111111111111111111111111111..
            ..........................................
            ..........................................
            ...................44.....................
            ..................4444....................
            ..................4444....................
            ..................4444....................
            ................44444444..................
            .................444444...................
            ..................4444....................
            ...................44.....................
            `,img`
            .1111111111111111111111111111111111111111.
            111111111111111111111111111111111111111111
            11b11b1b1bbb11b11b1b1bb111b11bbb1b11b1bbb1
            1b1b1b1b1b111b1b1b1b1b1b1b1b11b11bb1b11b11
            1b111bbb1bb11b111bb11bb11b1b11b11b1bb11b11
            1b1b1b1b1b111b1b1b1b1b111b1b11b11b11b11b11
            11b11b1b1bbb11b11b1b1b1111b11bbb1b11b11b11
            111111111111111111111111111111111111111111
            111111111111111bb1bbb1bbb1b111111111111111
            11111111111111b111b1111b11b111111111111111
            111111111111111b11bb111b11b111111111111111
            1111111111111111b1b1111b111111111111111111
            11111111111111bb11bbb11b11b111111111111111
            .111111111111111111111111111111111111111..
            ..........................................
            ...................44.....................
            ..................4444....................
            ..................4444....................
            ..................4444....................
            ................44444444..................
            .................444444...................
            ..................4444....................
            ...................44.....................
            ..........................................
            `,img`
            .1111111111111111111111111111111111111111.
            111111111111111111111111111111111111111111
            11b11b1b1bbb11b11b1b1bb111b11bbb1b11b1bbb1
            1b1b1b1b1b111b1b1b1b1b1b1b1b11b11bb1b11b11
            1b111bbb1bb11b111bb11bb11b1b11b11b1bb11b11
            1b1b1b1b1b111b1b1b1b1b111b1b11b11b11b11b11
            11b11b1b1bbb11b11b1b1b1111b11bbb1b11b11b11
            111111111111111111111111111111111111111111
            111111111111111bb1bbb1bbb1b111111111111111
            11111111111111b111b1111b11b111111111111111
            111111111111111b11bb111b11b111111111111111
            1111111111111111b1b1111b111111111111111111
            11111111111111bb11bbb11b11b111111111111111
            .111111111111111111111111111111111111111..
            ...................44.....................
            ..................4444....................
            ..................4444....................
            ..................4444....................
            ................44444444..................
            .................444444...................
            ..................4444....................
            ...................44.....................
            ..........................................
            ..........................................
            `],
        200,
        true
        )
        checkpointAlert.lifespan = 2800
        checkpointAlert.x = tiles.locationXY(location, tiles.XY.x)
        checkpointAlert.bottom = tiles.locationXY(location, tiles.XY.top) - 4
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (onStartScreen) {
        if (game.ask("Clear all high scores?")) {
            blockSettings.clear()
            game.reset()
        }
    }
})
function setup () {
    gravity = 500
    jumpHeight = 36
    jumpVelocity = 0 - Math.sqrt(2 * (gravity * jumpHeight))
    moveSpeed = 75
    positionSamplingInterval = 100
    if (darkMode) {
        scene.setBackgroundImage(img`
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            f5ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffff55ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffff55fffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            ffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbffffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5fffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            fffffffffffffffffffffffffffffffffffffbbbbbbbbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            fffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbfffff5fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbffffffff55fff
            ffffff5ffffffffffffffffffffffffffffbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbffffffff55fff
            fffff555fffffffffffffffffffffffffffbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffff5ffffffffffffffffffffffffffffbbbbbbbbbbbbbbffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbffffffffffffffffffffffff111fffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffffffffffffffffffffff1fffffbbbbbbbbbbbbbbbbfffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffff1fffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffbbbbbbbbbbbbbbbfffffffffffbbbbbbbbbbbbbbbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffbbbbbbbbbbbbbbbfffffffffffbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffbbbbbbbbbbbbbbbffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbfffffffffffff
            ffffffffbbbbbbbbbbbbbbbfffffffffffbbbbbbbbbbbbbbbbffffff11fffffffffffffffffffffbbbbbbbbbbbbbbbffffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            ffffffffbbbbbbbbbbbbbbbfffffffffffbbbbbbbbbbbbbbbbffffff11fffffffffffffffffffbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            ffffffffbbbbbbbbbbbbbbbfffffffffffbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbfffff5fffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            ffffffffbbbbbbbbbbbbbbbfffffffffffbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbfffffffffffffffffffffffffffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            ffffffffbbbbbbbbbbbbbbbfffffffffffbbbbbbbb55bbbbbbfffffffffffffffffffffffffffb55bbbbbbbbbbbbbbbfffffffffffffffffffffbbffffffffffbbbbbbbbbbb5b5bbbbbbbbbbbbbbbbbb
            ffffffffbbbbbbbbbbbbbbbfffffffffffbbbbbbbbbbbbbb5bfffffffffbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbbbbffffffffffffffffffffbbbbfffffffffbbbbbbbbbbbbbbb55bbbbbbbbbbbbbbb
            ffffffffbbbbbbbbbbbbbbbfffffffffffbbbbbbbbbbbbbbbbfffffffffbbbbbbbbbbbbbbbfffb5bbbbbbbbbbbbbbbbffffffffffffffffffbbbbbbfffffffffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            ffffffffbbbbbbbbbbb55bbfffffbfffffbbbbbbbbbbbbbbbbfffffffffbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbbbbffffffffffffffffffbbb5bffffffbbffbbbbbbbbbbbbb5bbbbbbbbbbbbbbbbbb
            ffffffffbbbbbbbbbbbbbbbfffffbfffffbbbbbbbbbbbbbb5bfffffffffbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbbbbffffffffffffffffffbbbbbbfffffbbffbbbbbbbbbbbbbbbbbbbbb55bbbbbbbbb
            ffffffffbb55bbbbbbb55bbffffbbbffffbbbbbbbbbbbbbbbbffbbbbbbfbbbbbbbbbbbbbbbfffbbbbbbbbbbbbbbbbbbffffffffffbbffffffbbb5bfffffbbbffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bfbbffffbbbbbbbbbbb5bbbfffbbbbbfffbbbbbbbbbbbbbb5bffb55bbbfbbbbbbbbbbbbb5bbffbbbbbbbbbbbbbbbbbbbbbbbffffbbbbbbbbbbbbbbbffffbbbbfbbbbbbbbbbbbbbb5bbbbb55bbbbbbbbb
            bbbbffffbb55bbbbbbbbbbbfffbbbbbfffbbbbbbbbbbbbbbbbffbbbb5bfbbbbbbbbbbbbbbbbffbb5bbbbbbbbbbbbbbbbbbbbffffbb5bbbbbbbbbbbbffffbbbbfbbbbbbbbbbbbbbbbbbbbbbbb5bbbbbbb
            bb5bffffbbbbbbbbbbbbbbbfffbbbbbfffbbbbbbbbbbbbbbbbffbbbb5bbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbbbffffbbbb5b55bbbbbbbffffbbbbfbbbbbbbbbbbbbbbbbbb5bbbb5bbbbbbb
            bbbbffffbbbbbbbbbbbbbbbbffbbbbbbffbbbbbbbbbbbbbbbbbfb55bbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbbbffffbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbbbbb5b55bbbbbbbbb
            bb5bffffbbbbbbbbbbbbbbbbffbbbbbbffbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbb5bffffbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbb55bbbbbbbbbbbbffbbbbbbbfbbbb55bbbbbbbbbbbbb55bbbbbbbbbbbbbbbbb5bbffbbbbbbbbbbbbbbbbbbbbbbbbbfbbb5bbbbbbbbbbbbbffbbbbbbbbbbbb5bbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbffbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbb555bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb55b
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb555bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb55b
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb5bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
            `)
    } else {
        scene.setBackgroundImage(img`
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111119999999999999999911111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111111999999999911111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111199999999999999111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111199999999999999111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111199999999999999111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111199999999999999111111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111999999999999999911111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111999999999999999911111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111999999999999999911111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111999999999999999911111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111111111111111111111111111111999999999999999911111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111199999999999999911111111111999999999999999911111111111111111111111111111111111111111111111111111111111111111111111111111199999999999999999991111111111111
            1111111199999999999999911111111111999999999999999911111111111111111111111111111999999999999999111111111111111111111111111111111199999999999999999991111111111111
            1111111199999999999999911111111111999999999999999911111111111111111111111111111999999999999999111111111111111111111111111111111199999999999999999999999999999999
            1111111199999999999999911111111111999999999999999911111111111111111111111111199999999999999999911111111111111111111111111111111199999999999999999999999999999999
            1111111199999999999999911111111111999999999999999911111111111111111111111111199999999999999999911111111111111111111111111111111199999999999999999999999999999999
            1111111199999999999999911111111111999999999999999911111111111111111111111111199999999999999999911111111111111111111111111111111199999999999999999999999999999999
            1111111199999999999999911111111111999999991199999911111111111111111111111111191199999999999999911111111111111111111199111111111199999999999191999999999999999999
            1111111199999999999999911111111111999999999999991911111111199999999999999911199999999999999999911111111111111111111999911111111199999999999999911999999999999999
            1111111199999999999999911111111111999999999999999911111111199999999999999911191999999999999999911111111111111111199999911111111199999999999999999999999999999999
            1111111199999999999119911111911111999999999999999911111111199999999999999911199999999999999999911111111111111111199919111111991199999999999991999999999999999999
            1111111199999999999999911111911111999999999999991911111111199999999999999911199999999999999999911111111111111111199999911111991199999999999999999999911999999999
            1111111199119999999119911119991111999999999999999911999999199999999999999911199999999999999999911111111119911111199919111119991199999999999999999999999999999999
            9199111199999999999199911199999111999999999999991911911999199999999999991991199999999999999999999999111199999999999999911119999199999999999999919999911999999999
            9999111199119999999999911199999111999999999999999911999919199999999999999991199199999999999999999999111199199999999999911119999199999999999999999999999919999999
            9919111199999999999999911199999111999999999999999911999919999999999999999991199999999999999999999999111199991911999999911119999199999999999999999991999919999999
            9999111199999999999999991199999911999999999999999991911999999999999999999991199999999999999999999999111199999999999999991199999999999999999999999991911999999999
            9919111199999999999999991199999911999999999999999991999999999999999999999991199999999999999999999919111199999999999999991199999999999999999999999999999999999999
            9999999999119999999999991199999991999911999999999999911999999999999999991991199999999999999999999999991999199999999999991199999999999919999999999999999999999999
            9999999999999999999999999999999991999999999999999999999999999999999999999991199999999999999999999999991999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999991999999999999999999999999999999999999999999999999999999999999999999991999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999991999999999999999999999999999999999999999999999999999999999999999999991999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999991999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999991999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999991999999999999999999999999999911199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999119
            9999999999999999999999999999999991999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999919999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999911199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999119
            9999999999999999999999999999999999999999999999999999999999999999999999919999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
            `)
    }
    scroller.setCameraScrollingMultipliers(0.25, 0)
    pressAToLaunch = sprites.create(img`
        .111111111111111111111111111111111111111.
        1111111ccc1ccc1ccc11cc11cc11111c111111111
        1111111c1c1c1c1c111c111c111111c1c11111111
        1111111ccc1ccc1cc111c111c11111ccc11111111
        1111111c111cc11c11111c111c1111c1c11111111
        1111111c111c1c1ccc1cc11cc11111c1c11111111
        11111111111111111111111111111111111111111
        11111111111111111111111111111111111111111
        11ccc1ccc1111c1111c11c1c1c111c11cc1c1c111
        111c11c1c1111c111c1c1c1c1cc11c1c111c1c111
        111c11c1c1111c111ccc1c1c1c1c1c1c111ccc111
        111c11c1c1111c111c1c1c1c1c11cc1c111c1c111
        111c11ccc1111ccc1c1c1ccc1c111c11cc1c1c111
        .111111111111111111111111111111111111111.
        `, SpriteKind.Decoration)
    animation.runImageAnimation(
    pressAToLaunch,
    [img`
        .ddddddddddddddddddddddddddddddddddddddd.
        dddddddcccdcccdcccddccddccdddddcddddddddd
        dddddddcdcdcdcdcdddcdddcddddddcdcdddddddd
        dddddddcccdcccdccdddcdddcdddddcccdddddddd
        dddddddcdddccddcdddddcdddcddddcdcdddddddd
        dddddddcdddcdcdcccdccddccdddddcdcdddddddd
        ddddddddddddddddddddddddddddddddddddddddd
        ddddddddddddddddddddddddddddddddddddddddd
        ddcccdcccddddcddddcddcdcdcdddcddccdcdcddd
        dddcddcdcddddcdddcdcdcdcdccddcdcdddcdcddd
        dddcddcdcddddcdddcccdcdcdcdcdcdcdddcccddd
        dddcddcdcddddcdddcdcdcdcdcddccdcdddcdcddd
        dddcddcccddddcccdcdcdcccdcdddcddccdcdcddd
        .ddddddddddddddddddddddddddddddddddddddd.
        `,img`
        .ddddddddddddddddddddddddddddddddddddddd.
        dddddddaaadaaadaaaddaaddaadddddaddddddddd
        dddddddadadadadadddadddaddddddadadddddddd
        dddddddaaadaaadaadddadddadddddaaadddddddd
        dddddddadddaaddadddddadddaddddadadddddddd
        dddddddadddadadaaadaaddaadddddadadddddddd
        ddddddddddddddddddddddddddddddddddddddddd
        ddddddddddddddddddddddddddddddddddddddddd
        ddaaadaaaddddaddddaddadadadddaddaadadaddd
        dddaddadaddddadddadadadadaaddadadddadaddd
        dddaddadaddddadddaaadadadadadadadddaaaddd
        dddaddadaddddadddadadadadaddaadadddadaddd
        dddaddaaaddddaaadadadaaadadddaddaadadaddd
        .ddddddddddddddddddddddddddddddddddddddd.
        `],
    500,
    true
    )
    pressAToLaunch.setFlag(SpriteFlag.Invisible, true)
    pressAToLaunch.setFlag(SpriteFlag.RelativeToCamera, true)
    pressAToLaunch.left = 2
    pressAToLaunch.top = 2
}
function createLevels () {
    levels = [
    tiles.createSmallMap(tilemap`level9`),
    tiles.createSmallMap(tilemap`level3`)
    ]
}
function timerText (text: string) {
    tiles.destroySpritesOfKind(SpriteKind.Timer)
    for (let index = 0; index <= text.length - 1; index++) {
        letterSprite = sprites.create(getBubbleLetter(text.charAt(index)), SpriteKind.Timer)
        letterSprite.setFlag(SpriteFlag.RelativeToCamera, true)
        letterSprite.top = 2
        letterSprite.left = 158 - 11 * text.length + index * 11
        letterSprite.lifespan = 2000
    }
}
function createPlayer () {
    thePlayer = sprites.create(img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `, SpriteKind.Player)
    characterAnimations.loopFrames(
    thePlayer,
    [img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . c c 
        . b c b b b c 1 
        c b c b b 6 c 4 
        . . b b c c . . 
        . . . c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . b c . . . . . 
        c b b b . . . . 
        . c b b b c c c 
        . c c b c 6 1 c 
        . . c c c . 4 . 
        . . . 4 . . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . c c 
        . b c b b b c 1 
        c b c b b 6 c 4 
        . . b b c c . . 
        . . . c c . . . 
        . . . 4 . . . . 
        `],
    100,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    thePlayer,
    [img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        c c . . . . . . 
        1 c b b b c b . 
        4 c 6 b b c b c 
        . . c c b b . . 
        . . . c c . . . 
        . . . . 4 . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . c b . 
        . . . . b b b c 
        c c c b b b c . 
        c 1 6 c b c c . 
        . 4 . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        c c . . . . . . 
        1 c b b b c b . 
        4 c 6 b b c b c 
        . . c c b b . . 
        . . . c c . . . 
        . . . . 4 . . . 
        `],
    100,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    thePlayer,
    [img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . c c . . . 
        . . . c 1 4 . . 
        . . . c c . . . 
        . . b b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . 4 . 4 . . . 
        `,img`
        . . . . c c . . 
        . . . . c 1 4 . 
        . . . . c c . . 
        . . . b b 6 . . 
        c b c b b c . . 
        . c b b c c . . 
        . . c c c . . . 
        . . . 4 . . . . 
        `,img`
        . . . . . c c . 
        . . . . . c 1 4 
        . . . . . c c . 
        . c b b b b 6 . 
        . c b b b b c . 
        . . c b b c . . 
        . . 4 c c . . . 
        . . 4 . 4 . . . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    thePlayer,
    [img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . . . c c . . . 
        . . 4 1 c . . . 
        . . . c c . . . 
        . . 6 b b b . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . 4 . 4 . . 
        `,img`
        . . c c . . . . 
        . 4 1 c . . . . 
        . . c c . . . . 
        . . 6 b b . . . 
        . . c b b c b c 
        . . c c b b c . 
        . . . c c c . . 
        . . . . 4 . . . 
        `,img`
        . c c . . . . . 
        4 1 c . . . . . 
        . c c . . . . . 
        . 6 b b b b c . 
        . c b b b b c . 
        . . c b b c . . 
        . . . c c 4 . . 
        . . . 4 . 4 . . 
        `],
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    thePlayer.ay = gravity
    thePlayer.z = 10
    scene.cameraFollowSprite(thePlayer)
    controller.moveSprite(thePlayer, moveSpeed, 0)
    thePlayer.fx = 500
}
sprites.onCreated(SpriteKind.Decoration, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile27`, function (sprite, location) {
    if (sprite.right > tiles.locationXY(location, tiles.XY.left) + 2) {
        reloadCheckpoint()
    }
})
function formatTime (time: number) {
    milliChunk = "" + Math.idiv(time % 1000, 10)
    while (milliChunk.length < 2) {
        milliChunk = "0" + milliChunk
    }
    return "" + Math.idiv(time, 1000) + ":" + milliChunk
}
function introBubbleText (text: string, entranceAnimation: boolean) {
    for (let index = 0; index <= text.length - 1; index++) {
        letterSprite = sprites.create(getBubbleLetter(text.charAt(index)), SpriteKind.Decoration)
        letterSprite.setFlag(SpriteFlag.RelativeToCamera, true)
        letterSprite.bottom = 0
        letterSprite.left = 80 - letterSprite.width * text.length / 2 + index * letterSprite.width
        letterSprite.lifespan = 2000
        if (entranceAnimation) {
            animation.runMovementAnimation(
            letterSprite,
            "c 0 247 0 -157 0 140",
            2000,
            false
            )
            pause(100)
        } else {
            letterSprite.y = 60
        }
    }
    if (entranceAnimation) {
        pause(1500)
    }
}
function createHighScoreEntry (entryIndex: number, text: string) {
    if (entryIndex == -1) {
        renderText = text
        for (let index = 0; index <= renderText.length - 1; index++) {
            letterSprite = sprites.create(getBubbleLetter(renderText.charAt(index)), SpriteKind.Timer)
            letterSprite.setFlag(SpriteFlag.RelativeToCamera, true)
            letterSprite.top = 5
            if (index < 4) {
                letterSprite.left = 2 + index * 19
            } else {
                letterSprite.left = -13 + index * 19
            }
        }
    } else {
        renderText = "" + (entryIndex + 1) + ": " + text
        for (let index = 0; index <= renderText.length - 1; index++) {
            letterSprite = sprites.create(getBubbleLetter(renderText.charAt(index)), SpriteKind.Timer)
            letterSprite.setFlag(SpriteFlag.RelativeToCamera, true)
            letterSprite.top = 55 + entryIndex * 20
            letterSprite.left = 30 + index * 11
        }
    }
}
function startLevel (levelIndex: number) {
    currentLevelIndex = levelIndex
    if (blockSettings.exists("level" + levelIndex + "x")) {
        ghostXPositions = blockSettings.readPositionBuffer("level" + levelIndex + "x")
        ghostYPositions = blockSettings.readPositionBuffer("level" + levelIndex + "y")
    } else {
        ghostXPositions = []
        ghostYPositions = []
    }
    recordedXPositions = []
    recordedYPositions = []
    loadMap()
    createPlayer()
    tiles.placeOnRandomTile(thePlayer, assets.tile`myTile1`)
    tiles.setTileAt(tiles.locationOfSprite(thePlayer), assets.tile`transparency8`)
    currentCheckpoint = tiles.locationOfSprite(thePlayer)
    controller.moveSprite(thePlayer, 0, 0)
    introBubbleText("ready.", true)
    introBubbleText("set.", true)
    pause(200)
    introBubbleText("go!", false)
    inGameLevel = true
    controller.moveSprite(thePlayer, moveSpeed, 0)
    if (darkMode) {
        playerGhost = sprites.create(img`
            . . . . d d . . 
            . . . . d b d . 
            . . . . d d . . 
            . . . d d d . . 
            d d d d d d . . 
            . d d d d d . . 
            . . d d d . . . 
            . . . . . . . . 
            `, SpriteKind.GhostTarget)
    } else {
        playerGhost = sprites.create(img`
            . . . . b b . . 
            . . . . b 1 b . 
            . . . . b b . . 
            . . . b b b . . 
            b b b b b b . . 
            . b b b b b . . 
            . . b b b . . . 
            . . . . . . . . 
            `, SpriteKind.GhostTarget)
    }
    playerGhost.setFlag(SpriteFlag.Ghost, true)
    playerGhost.setPosition(thePlayer.x, thePlayer.y)
    ghostTarget = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.GhostTarget)
    ghostTarget.setFlag(SpriteFlag.Ghost, true)
    ghostTarget.setPosition(thePlayer.x, thePlayer.y)
    ghostIndex = 0
    startTime = game.runtime()
    timer.background(function () {
        while (inGameLevel) {
            if (ghostIndex < ghostXPositions.length) {
                playerGhost.setPosition(ghostTarget.x, ghostTarget.y)
                ghostTarget.setPosition(ghostXPositions[ghostIndex], ghostYPositions[ghostIndex])
                spriteutils.setVelocityAtAngle(playerGhost, spriteutils.angleFrom(playerGhost, ghostTarget), spriteutils.distanceBetween(playerGhost, ghostTarget) / positionSamplingInterval * 1000)
                ghostIndex += 1
            } else {
                playerGhost.destroy()
            }
            recordedXPositions.push(thePlayer.x)
            recordedYPositions.push(thePlayer.y)
            pause(positionSamplingInterval)
        }
    })
}
function createPlane (direction: number, x: number, y: number) {
    newPlane = sprites.create(img`
        . . . . . . . . 
        . . . . . . . . 
        2 . . b b d . d 
        2 2 2 b b b 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        `, SpriteKind.Plane)
    sprites.setDataNumber(newPlane, "direction", direction)
    newPlane.setPosition(x, y)
    sprites.setDataNumber(newPlane, "homex", x)
    sprites.setDataNumber(newPlane, "homey", y)
    animation.runImageAnimation(
    newPlane,
    [img`
        . . . . . . . . 
        2 . . b b d . d 
        2 2 2 b b b 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        `,img`
        . . . . . . . . 
        2 . . b b d . c 
        2 2 2 b b b 2 c 
        2 2 2 2 2 2 2 d 
        . 2 2 c 2 2 . d 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        2 . . b b d . d 
        2 2 2 b b b 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        `,img`
        . . . . . . . . 
        . . . . . . . . 
        2 . . b b d . c 
        2 2 2 b b b 2 c 
        2 2 2 2 2 2 2 d 
        . 2 2 c 2 2 . d 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        `,img`
        . . . . . . . . 
        2 . . b b d . d 
        2 2 2 b b b 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        `,img`
        . . . . . . . . 
        2 . . b b d . c 
        2 2 2 b b b 2 c 
        2 2 2 2 2 2 2 d 
        . 2 2 c 2 2 . d 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        `,img`
        2 . . b b d . d 
        2 2 2 b b b 2 d 
        2 2 2 2 2 2 2 c 
        . 2 2 c 2 2 . c 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        . . . . . . . . 
        `,img`
        2 . . b b d . c 
        2 2 2 b b b 2 c 
        2 2 2 2 2 2 2 d 
        . 2 2 c 2 2 . d 
        . . c 2 2 . . . 
        . . 2 2 . . . . 
        . . . . . . . . 
        . . . . . . . . 
        `],
    50,
    true
    )
    tiles.setTileAt(tiles.locationOfSprite(newPlane), assets.tile`transparency8`)
}
function reloadCheckpoint () {
    if (!(spriteutils.isDestroyed(thePlayer))) {
        thePlayer.destroy()
        timer.background(function () {
            fakePlayer = sprites.create(thePlayer.image, SpriteKind.Decoration)
            fakePlayer.setPosition(thePlayer.x, thePlayer.y)
            fakePlayer.ay = gravity
            fakePlayer.vy = jumpVelocity
            fakePlayer.lifespan = 2000
            pause(2000)
            createPlayer()
            tiles.placeOnTile(thePlayer, currentCheckpoint)
            loadMap()
            tiles.replaceAllTiles(assets.tile`myTile1`, assets.tile`transparency8`)
        })
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile26`, function (sprite, location) {
    if (sprite.top < tiles.locationXY(location, tiles.XY.bottom) - 2) {
        reloadCheckpoint()
    }
})
let newPlane: Sprite = null
let ghostIndex = 0
let ghostYPositions: number[] = []
let ghostXPositions: number[] = []
let renderText = ""
let milliChunk = ""
let letterSprite: Sprite = null
let positionSamplingInterval = 0
let jumpHeight = 0
let checkpointAlert: Sprite = null
let currentCheckpoint: tiles.Location = null
let distance = 0
let angle = 0
let activePlane: Sprite = null
let pressAToLaunch: Sprite = null
let last_x = 0
let next_x = 0
let projectile: Sprite = null
let jumpVelocity = 0
let inPlane = false
let onStartScreen = false
let levels: tiles.WorldMap[] = []
let moveSpeed = 0
let gravity = 0
let brickParticle: Sprite = null
let waitingForA = false
let pressAForNext: Sprite = null
let scoreBG: Sprite = null
let mySprite: Sprite = null
let fakePlayer: Sprite = null
let thePlayer: Sprite = null
let playerGhost: Sprite = null
let ghostTarget: Sprite = null
let recordedYPositions: number[] = []
let recordedXPositions: number[] = []
let didInsert = false
let times: number[] = []
let currentLevelIndex = 0
let startTime = 0
let clearTime = 0
let inGameLevel = false
let darkMode = false
darkMode = true
showTitleScreen()
game.onUpdate(function () {
    if (activePlane) {
        if (sprites.readDataNumber(activePlane, "direction") == 0) {
            sprites.readDataSprite(activePlane, "arrow").setPosition(activePlane.x + 0, activePlane.y - 9)
        } else if (sprites.readDataNumber(activePlane, "direction") == 1) {
            sprites.readDataSprite(activePlane, "arrow").setPosition(activePlane.x + 9, activePlane.y + 0)
        } else if (sprites.readDataNumber(activePlane, "direction") == 2) {
            sprites.readDataSprite(activePlane, "arrow").setPosition(activePlane.x + 0, activePlane.y + 9)
        } else {
            sprites.readDataSprite(activePlane, "arrow").setPosition(activePlane.x - 9, activePlane.y + 0)
        }
    }
})
game.onUpdate(function () {
    if (inGameLevel) {
        timerText(formatTime(game.runtime() - startTime))
    }
})
game.onUpdate(function () {
    if (darkMode) {
        if (thePlayer && !(spriteutils.isDestroyed(thePlayer))) {
            thePlayer.image.replace(11, 12)
        } else if (fakePlayer && !(spriteutils.isDestroyed(fakePlayer))) {
            fakePlayer.image.replace(11, 12)
        }
    }
})
