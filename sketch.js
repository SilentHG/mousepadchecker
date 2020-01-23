function setup() {
    createCanvas(400, 400);
}

var pts = [];
var grid = []
function mousePressed()
{
    if (pts.length == 2) {
        pts = [];
    }
    pts.push([mouseX, mouseY])

    if (pts.length==2) { 
        grid = []
        let x0 = min(pts[0][0], pts[1][0]);
        let x1 = max(pts[0][0], pts[1][0]);
        let y0 = min(pts[0][1], pts[1][1]);
        let y1 = max(pts[0][1], pts[1][1])  
        for (let y = y0; y < y1; y +=5) {
            let row = []
            for (let x = x0; x < x1; x += 5) {    
                row.push( [x, y, false] );
            }
            grid.push(row);
        }
    }
}

function mouseMoved()
{
    if (pts.length==2) {
        let x0 = grid[0][0][0];
        let y0 = grid[0][0][1];
        let row = Math.trunc((mouseY-y0) / 5);
        let col = Math.trunc((mouseX-x0) / 5);
        if (row < grid.length && col < grid[row].length) {
            grid[row][col][2] = true;
        }
    } 
}

function draw() {  
    background(220);

    // setup r ectangle points
    let rpts;
    if (pts.length == 2) {
        rpts = [pts[0], [pts[1][0], pts[0][1]], pts[1], [pts[0][0], pts[1][1]]];
    }
    else if (pts.length > 0) {
        rpts = [pts[0], [mouseX, pts[0][1]], [mouseX, mouseY], [pts[0][0], mouseY]];
    }
    // draw rectangles
    if (rpts) {
        for (var i=0; i < rpts.length; ++i) {
            line(rpts[i][0], rpts[i][1], rpts[(i+1) % rpts.length][0], rpts[(i+1) % rpts.length][1]);
        }
    }
      
    let c1 = color(255, 204, 0);
    let c2 = color(0, 0, 255);
    if (pts.length==2) { 
        for (var row = 0; row < grid.length; ++row ) {
            for (var col = 0; col < grid[row].length; ++col ) {
                fill(grid[row][col][2] ? c2 : c1);
                square(grid[row][col][0], grid[row][col][1], 4);
            }
        }
    }
}