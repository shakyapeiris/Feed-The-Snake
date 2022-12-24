const isValidMove = (newHead, body) => {
    for (let i = 1; i < body.length; i++) {
        if (body[i][0] == newHead[0] && body[i][1] == newHead[1]) return false;
    }
    return true;
}

const moveSnake = (newHead, body) => {
    const newBody = [newHead];
    for (let i = 0; i < body.length - 1; i++) {
        newBody.push(body[i]);
    }

    return newBody;
}

export const getBestPath = (currCoordinates, targetCoordinates, dirn) => {
    console.log("Current coordinates: ", currCoordinates);
    console.log("Target coordinates: ", targetCoordinates);
    console.log("Direction ", dirn);
    let grid: any = new Array(20)
        .fill(null)
        .map(() => new Array(20).fill(-1));

    grid = grid.map((row) => {
        return row.map((i) => {
            return {
                paths: null,
                dirn: dirn,
                snake: null
            }
        })
    })

    let x = currCoordinates[0], y = currCoordinates[1];
    let i = y, j = x;

    let tempCurr = { ...grid[y][x] };
    tempCurr.paths = [];
    tempCurr.snake = [[currCoordinates[0], currCoordinates[1]]];

    grid[y][x] = tempCurr;
    let yVisited = false;

    while (!yVisited) {
        j = x;
        let xVisited = false;
        while (!xVisited) {

            if (grid[i][j].paths != null && grid[i][j].snake != null) {
                // Up
                if (grid[i][j].dirn != "YD") {
                    let tempY

                    if (i == 0) {
                        tempY = 19;
                    }
                    else {
                        tempY = i - 1;
                    }



                    if (grid[tempY][j].paths == null || (grid[tempY][j].paths.length > (grid[i][j].paths.length + 1) && isValidMove([j, tempY], grid[i][j].snake))) {
                        grid[tempY][j] = {
                            paths: [...grid[i][j].paths, [j, tempY]],
                            dirn: 'YU',
                            snake: moveSnake([j, tempY], grid[i][j].snake)
                        }
                    }

                }

                // Down
                if (grid[i][j].dirn != "YU") {
                    let tempY

                    if (i == 19) {
                        tempY = 0;
                    }
                    else {
                        tempY = i + 1;
                    }

                    if (grid[tempY][j].paths == null || (grid[tempY][j].paths.length > (grid[i][j].paths.length + 1) && isValidMove([j, tempY], grid[i][j].snake))) {
                        grid[tempY][j] = {
                            paths: [...grid[i][j].paths, [j, tempY]],
                            dirn: 'YD',
                            snake: moveSnake([j, tempY], grid[i][j].snake)
                        }
                    }
                }

                // Left
                if (grid[i][j].dirn != "XR") {
                    let tempX

                    if (j == 0) {
                        tempX = 19;
                    }
                    else {
                        tempX = j - 1;
                    }

                    if (grid[i][tempX].paths == null || (grid[i][tempX].paths.length > (grid[i][j].paths.length + 1) && isValidMove([tempX, i], grid[i][j].snake))) {
                        grid[i][tempX] = {
                            paths: [...grid[i][j].paths, [tempX, i]],
                            dirn: 'XL',
                            snake: moveSnake([tempX, i], grid[i][j].snake)
                        }
                    }
                }

                // Right
                if (grid[i][j].dirn != "XL") {
                    let tempX

                    if (j == 19) {
                        tempX = 0;
                    }
                    else {
                        tempX = j + 1;
                    }

                    if (grid[i][tempX].paths == null || (grid[i][tempX].paths.length > (grid[i][j].paths.length + 1) && isValidMove([tempX, i], grid[i][j].snake))) {
                        grid[i][tempX] = {
                            paths: [...grid[i][j].paths, [tempX, i]],
                            dirn: 'XR',
                            snake: moveSnake([tempX, i], grid[i][j].snake)
                        }
                    }
                }
            }
            // Down


            j++;
            if (j == 20) j = 0;
            xVisited = (x == j);
        }

        i++;
        if (i == 20) i = 0;
        yVisited = (i == y);
    }
    console.log('Done...')
    return grid[targetCoordinates[1]][targetCoordinates[0]].paths;
}