let ctx, j1_y, j2_y, j1_pontos, j2_pontos
let bola_y_orientation, bola_x_orientation, bola_x, bola_y
let j1_key, j2_key
const h=500, w=800, p_w=20, p_h=200, j1_x = 10, j2_x = w - p_w - 10
function config(){
    const canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    
    // inicializa as posições y do p1 e do p2 para metade da tela
    j1_y = j2_y = (h / 2) - (p_h/2)
    
    // inicializa os pontos dos jogadores como 0
    j1_pontos = 0
    j2_pontos = 0

    //define um intervalo de 60 fps para o loop
    setInterval(loop,1000/60)

    initBall()
}

function loop(){
    //Verifica se a bola está colidindo com o barra do player 1
    if(bola_x >= j1_x && bola_x <= j1_x + 10 && bola_y >= j1_y && bola_y <= j1_y + p_h){
        bola_x_orientation = 1
    }
    //Verifica se a bola está colidindo com o barra do player 2
    else if(bola_x >= j2_x && bola_x <= j2_x + 10 && bola_y >= j2_y && bola_y <= j2_y + p_h){
        bola_x_orientation = -1
    }

    // verifica se a bola passou bateu no chão ou no teto
    if(bola_y + 10 >= h || bola_y <= 0) bola_y_orientation *= -1

    //move a bola no eixo X e Y
    bola_x += 5 * bola_x_orientation
    bola_y += 5 * bola_y_orientation

    if(bola_x+10 > w) {
        j1_pontos++
        initBall()
    }
    else if(bola_x < 0){
        j2_pontos++
        initBall()
    }

    if(j1_key == 87 && j1_y > 0){
        j1_y -= 10
    }else if(j1_key == 83 && j1_y + p_h < h){
        j1_y += 10
    }

    if(j2_key == 38 && j2_y > 0){
        j2_y -= 10
    }else if(j2_key == 40 && j2_y + p_h < h){
        j2_y += 10
    }
    draw()
}

function initBall(){
    console.log(`${j1_pontos} VS ${j2_pontos}`)
    bola_y_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3 
    bola_x_orientation = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3 
    bola_x = w / 2 -10
    bola_y = h / 2 -10
}

function draw(){
    // fundo
    drawRect(0,0,w,h,"#000")
    // primeiro jogador
    drawRect(j1_x, j1_y, p_w, p_h)
    // segundo jogador
    drawRect(j2_x, j2_y, p_w, p_h)
    // barra do centro
    drawRect(w/2 -5,0,5,h)
    // bola
    drawRect(bola_x, bola_y, 10, 10)
    //pontos
    writePoints()
}

function drawRect(x,y,w,h,color="#fff"){
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
    ctx.fillStyle = "#000"
}

function writePoints(){
    ctx.font = "50px consolas";
    ctx.fillStyle = "#fff";
    // w/4 = 1/4 da tela = metade da tela do player 1
    ctx.fillText(j1_pontos, w/4, 50);
    // 3*(w/4) = 3/4 da tela = metade da tela do player 2
    ctx.fillText(j2_pontos, 3*(w/4), 50);
}

document.addEventListener("keydown",function(ev){
    // keyCode 87 = w, keycode 83 = s
    if(ev.keyCode == 87 || ev.keyCode == 83){
        j1_key = ev.keyCode
    }
    // keycode 38 = arrowUp, keycode 40 = arrowDown
    else if(ev.keyCode== 38 || ev.keyCode==40)
        j2_key = ev.keyCode
})

config()




