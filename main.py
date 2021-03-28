music.start_melody(music.built_in_melody(Melodies.NYAN))

def on_button_pressed_a():
    hero.turn(Direction.RIGHT, 90)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    hero.move(1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def get_pos():
    return {
        "x": hero.get(LedSpriteProperty.X),
        "y": hero.get(LedSpriteProperty.Y),
    }

def get_mines():
    mine_list = [
        {"x": 2, "y":0},
        {"x": 3, "y":3},
        {"x": 0, "y":4},
    ]

    return mine_list

def is_goal():
    current = get_pos()
    if current["x"] == 4 and current["y"] == 4:
        return True
    return False

def is_hit_mine():
    current = get_pos()
    mines = get_mines()
    for mine in mines:
        if current["x"] == mine["x"] and current["y"] == mine["y"]:
            return True
    return False

def reset():
    hero.set(LedSpriteProperty.X, 0)
    hero.set(LedSpriteProperty.Y, 0)
    music.start_melody(music.built_in_melody(Melodies.NYAN))

hero: game.LedSprite = None
current_pos: List[number] = []
hero = game.create_sprite(0, 0)

def on_forever():
    if is_hit_mine():
        basic.show_animation("""
        . . . # #
        . . # . .
        . # # # .
        # # # # #
        . # # # .
        """)
        music.start_melody(music.built_in_melody(Melodies.WAWAWAWAA))
        basic.show_string("GAME OVER")
        music.start_melody(music.built_in_melody(Melodies.PUNCHLINE))
        reset()
    elif is_goal():
        basic.show_icon(IconNames.HEART)
        music.start_melody(music.built_in_melody(Melodies.WEDDING))
        basic.show_string("GOAL!!")
        reset()

basic.forever(on_forever)
