let mapWidth = 200;
let mapHeight = 200;
const map = new Map(200, 200);
const tileSize = 10;
const player = new Player();
function loadGame() {

}
function printTiles() {
    map.draw(ctx, tileSize, camera);
}
function animate() {
    //refresh screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lctx.clearRect(0, 0, lHUD.width, lHUD.height);

    player.update();

    camera.moveTo(player.x, player.y)

    printTiles();

    player.draw(ctx, camera);

    gameFrame++;

    lctx.fillStyle = 'white';
    lctx.fillText('Camera: ' + Math.floor(camera.x) + " " + Math.floor(camera.y), 10, 50);
    lctx.fillText('Player: ' + Math.floor(player.x) + " " + Math.floor(player.y), 10, 100);
    requestAnimationFrame(animate);

}
loadGame();
animate();

