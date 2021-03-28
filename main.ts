music.startMelody(music.builtInMelody(Melodies.Nyan))
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    hero.turn(Direction.Right, 90)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    hero.move(1)
})
function get_pos() {
    return {
        "x" : hero.get(LedSpriteProperty.X),
        "y" : hero.get(LedSpriteProperty.Y),
    }
}

function get_mines() {
    let mine_list = [ {
        "x" : 2,
        "y" : 0,
    }
    , {
        "x" : 3,
        "y" : 3,
    }
    , {
        "x" : 0,
        "y" : 4,
    }
    ]
    return mine_list
}

function is_goal(): boolean {
    let current = get_pos()
    if (current["x"] == 4 && current["y"] == 4) {
        return true
    }
    
    return false
}

function is_hit_mine(): boolean {
    let current = get_pos()
    let mines = get_mines()
    for (let mine of mines) {
        if (current["x"] == mine["x"] && current["y"] == mine["y"]) {
            return true
        }
        
    }
    return false
}

function reset() {
    hero.set(LedSpriteProperty.X, 0)
    hero.set(LedSpriteProperty.Y, 0)
    music.startMelody(music.builtInMelody(Melodies.Nyan))
}

let hero : game.LedSprite = null
let current_pos : number[] = []
hero = game.createSprite(0, 0)
basic.forever(function on_forever() {
    if (is_hit_mine()) {
        basic.showAnimation(`
        . . . # #
        . . # . .
        . # # # .
        # # # # #
        . # # # .
        `)
        music.startMelody(music.builtInMelody(Melodies.Wawawawaa))
        basic.showString("GAME OVER")
        music.startMelody(music.builtInMelody(Melodies.Punchline))
        reset()
    } else if (is_goal()) {
        basic.showIcon(IconNames.Heart)
        music.startMelody(music.builtInMelody(Melodies.Wedding))
        basic.showString("GOAL!!")
        reset()
    }
    
})
