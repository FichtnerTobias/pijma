radio.setGroup(1)

//---------servo--------- 

// PCAmotor.StopServo(PCAmotor.Servos.S1)

// input.onButtonPressed(Button.A, function () {
//     PCAmotor.Servospeed(PCAmotor.Servos.S1, 0, -180, 1)

// })


// input.onButtonPressed(Button.B, function () {
//     PCAmotor.Servospeed(PCAmotor.Servos.S1, 0, 180, 1)
// })


//---------světla---------  
const strip = neopixel.create(DigitalPin.P0, 9, NeoPixelMode.RGB)

// input.onButtonPressed(Button.A, function () {
//     strip.clear()
//     for (let i = 6; i < 10; i++) { // poslední 4 LEDky: 8, 9, 10, 11
//         strip.setPixelColor(i, neopixel.rgb(255, 0, 0)) // červená
//     }
//     strip.show()
// })

// input.onButtonPressed(Button.B, function () {
//     strip.clear()
//     for (let i = 0; i < 3; i++) { // první 4 LEDky: 0, 1, 2, 3
//         strip.setPixelColor(i, neopixel.rgb(0, 0, 255)) // modrá
//     }
//     strip.show()
// })

// input.onButtonPressed(Button.AB, function () {
//     strip.clear()
//     for (let i = 3; i < 6; i++) { // první 4 LEDky: 0, 1, 2, 3
//         strip.setPixelColor(i, neopixel.rgb(0, 0, 255)) // modrá
//     }
//     strip.show()
// })



// ------------ovládání auta--------------

let command = ""

radio.onReceivedString(function (receivedString: string) {
    command = receivedString
})

let x = 0
let y = 0

// x = 500; y = 200

radio.onReceivedValue(function (axis, value) {
    if (axis === "x") {
        x = value * 0.5

    } else if (axis === "y") {
        y = value * 0.5
        
    }

})


function go(speed1: number, speed2: number) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, speed1)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, speed2)
}


basic.forever(function () {
    if (x > 255) { x = 255 }
    if (y > 255) {y = 255}
    if (x < -255) { x = -255 }
    if (y < -255) {y = -255}


    go(y - x, y + x)

    if ( x < -200){

        strip.clear()
        for (let i = 6; i < 10; i++) { // poslední 3 LEDky: 7, 8, 9
            strip.setPixelColor(i, neopixel.rgb(255, 0, 0)) // červená
        }
        strip.show()
        basic.pause(100)
    }

    if(x > 200){

        strip.clear()
        for (let i = 0; i < 3; i++) { // první 3 LEDky: 1, 2, 3
            strip.setPixelColor(i, neopixel.rgb(255, 0, 0)) // červená
        }
        strip.show()
        basic.pause(100)
    }

    if(x < 200 && x > -200){

        strip.clear()
        for (let i = 3; i < 6; i++) { // prostřední 3 LEDky: 4, 5, 16
            strip.setPixelColor(i, neopixel.rgb(255, 0, 0)) // červená
        }
        strip.show()
        basic.pause(100)
    }
})

basic.forever(function() {
    
})